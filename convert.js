const path = require("path");
const pify = require("pify");
const globby = require("globby");
const { camelCase } = require("camel-case");
const transliterate = require("@sindresorhus/transliterate");
const mkdirp = require("mkdirp");
const SVGO = require("svgo");
const deindent = require('de-indent')
const svgoConfig = require("./svgo.json");

const svgo = new SVGO(svgoConfig);

const { readFile, writeFile } = pify(require("fs"));
const rimraf = pify(require("rimraf"));

// These files and directories are written and should be deleted
const writePaths = [
	"./icons/out",
	"./icons/path-d.json",
	"./icons/path-d.js",
	"./icons/path-d.d.ts",
];


const createTypeDeclarations = (names) => {
	const namesUnion = names.map(name=> `"${name}"`).join(" | ");
	const typeDeclarations = deindent(`
		export enum IconSize {
			s = "16",
			m = "24",
			l = "40",
		}
		export type IconName = ${namesUnion}
		export type IconCollection = {
			[key in IconName]: string;
		}
		export type Icons = {
			[key in IconSize]: IconCollection;
		}
		export declare const icons: Icons
		export default icons
	`);
	return typeDeclarations;
}



(async () => {
	// Delete all writePaths
	await Promise.all(writePaths.map(writePath => rimraf(writePath)));
	const paths = await globby(["./icons/in/*.svg"])
	const sortedPaths = paths.sort((a, b) => {
		if (a > b) {
			return 1
		}
		if (a < b) {
			return -1
		}
		return 0
	});
	// Provide objects that will be filled with data
	const names = new Set([]);
	const pathD = { 16: {}, 24: {}, 40: {} };
	const files = { 16: {}, 24: {}, 40: {} };
	// Fill the objects with the correct data
	await Promise.all(
		sortedPaths.map(async file => {
			const { name } = path.parse(file);
			const [, iconName, size] = /(.*) (\d+)px/.exec(name);
			// Names should be camelcased
			const camelCased = camelCase(transliterate(iconName));
			const rawSVG = await readFile(file, "utf-8");
			// SVGs should be optimized
			const { data: optimizedSVG } = await svgo
				.optimize(rawSVG, { path: file })
				.catch(err => {
					console.error(err);
				});
			try {
				// Extract the d attribute from the path
				const [, d] = / d="([\w\d\-\s.,]+)"/.exec(optimizedSVG);
				// Add data to objects
				names.add(camelCased);
				pathD[size][camelCased] = d;
				files[size][camelCased] = optimizedSVG;
			} catch (err) {
				console.error(err);
			}
		})
	);
	// Write all SVGs as optimized files
	// Files are sorted by their
	Object.entries(files).forEach(entry => {
		const [size, icons] = entry;
		Object.entries(icons).forEach(async icon => {
			const [name, svg] = icon;
			// Create the directory before we attempt to write the file
			await mkdirp(`./icons/out/${size}`).catch(err => {
				console.error("mkdirp", err);
			});
			writeFile(`./icons/out/${size}/${name}.svg`, svg).catch(err => {
				console.error(err);
			});
		});
	});

	// Create JSON
	writeFile(`./icons/path-d.json`, JSON.stringify(pathD, null, 4)).catch(err => {
		console.error(err);
	});

	// Create JavaScript
	writeFile(
		`./icons/path-d.js`,
		`'use strict';\nObject.defineProperty(exports, '__esModule', { value: true });\n\nconst icons = ${JSON.stringify(
			pathD,
			null,
			4
		)};\nexports.icons = icons\n`
	).catch(err => {
		console.error(err);
	});

	// Create Type definitions
	// replace quotes and commas for validity
	const typeDeclarations = createTypeDeclarations(Array.from(names));
	writeFile(
		`./icons/path-d.d.ts`,
		typeDeclarations).catch(err => {
		console.error(err);
	});
})();
