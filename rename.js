const path = require("path");
const pify = require("pify");
const globby = require("globby");
const { paramCase } = require("param-case");
const { camelCase } = require("camel-case");
const transliterate = require("@sindresorhus/transliterate");
const mkdirp = require("mkdirp");
const { readFile, writeFile } = pify(require("fs"));

(async () => {
	const paths = await globby(["./icons/optimized"]);
	const types = { 16: {}, 24: {}, 40: {} };
	const pathD = { 16: {}, 24: {}, 40: {} };
	const files = { 16: {}, 24: {}, 40: {} };
	await Promise.all(
		paths.map(async file => {
			const { name } = path.parse(file);
			const [, iconName, size] = /(.*) (\d+)px/.exec(name);
			const camelCased = camelCase(transliterate(iconName));
			const content = await readFile(file, "utf-8");
			const [, d] = /d="([\w\d\-\s\.]+)"/.exec(content);
			types[size][camelCased] = "string";
			pathD[size][camelCased] = d;
			files[size][camelCased] = content;
			// console.log(`Writing: ./icons/out/${paramCased}.svg`);
			// return writeFile(`./icons/out/${paramCased}.svg`, content);
		})
	);
	Object.entries(files).forEach(entry => {
		const [size, icons] = entry;
		Object.entries(icons).forEach(async icon => {
			const [name, content] = icon;
			await mkdirp(`./icons/out/${size}`).catch(err => {
				console.error("mkdirp", err);
			});
			writeFile(`./icons/out/${size}/${name}.svg`, content).catch(err => {
				console.error(err);
			});
		});
	});
	console.log(`Writing: ./icons/path-d.json`);
	writeFile(`./icons/path-d.json`, JSON.stringify(pathD, null, 4));
	console.log(`Writing: ./icons/path-d.js`);
	writeFile(`./icons/path-d.js`, `module.exports = ${JSON.stringify(pathD, null, 4)}`);
	console.log(`Writing: ./icons/path-d.d.ts`);
	writeFile(
		`./icons/path-d.d.ts`,
		`interface Icons ${JSON.stringify(types, null, 4)
			.replace(/"string"(,)?/g, "string;")
			.replace(/}(,)?/g, "};")
			.replace(/^};$/gm, "}")}\nexport default Icons;`
	);
})();
