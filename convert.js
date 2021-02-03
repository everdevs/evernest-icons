const path = require("path");
const pify = require("pify");
const globby = require("globby");
const { camelCase } = require("camel-case");
const transliterate = require("@sindresorhus/transliterate");
const mkdirp = require("mkdirp");
const SVGO = require("svgo");
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
	console.log(sortedPaths)
	// Provide objects that will be filled with data
	const types = { 16: {}, 24: {}, 40: {} };
	const pathD = { 16: {}, 24: {}, 40: {} };
	const files = { 16: {}, 24: {}, 40: {} };
	// Fill the objects with the correct data
	await Promise.all(
		paths.map(async file => {
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
				types[size][camelCased] = "string";
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
	writeFile(
		`./icons/path-d.d.ts`,
		`interface Icons ${JSON.stringify(types, null, 4)
			.replace(/"string"(,)?/g, "string;")
			.replace(/}(,)?/g, "};")
			.replace(/^};$/gm, "}")}\ndeclare const icons: Icons;\nexport {icons};`
	).catch(err => {
		console.error(err);
	});
})();
