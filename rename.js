const path = require("path");
const pify = require("pify");
const globby = require("globby");
const { paramCase } = require("param-case");
const { camelCase } = require("camel-case");
const transliterate = require("@sindresorhus/transliterate");

const { readFile, writeFile } = pify(require("fs"));

(async () => {
	const paths = await globby(["./icons/optimized"]);
	const pathD = {};
	await Promise.all(
		paths.map(async file => {
			const { base } = path.parse(file);
			const transliterated = transliterate(base);
			const paramCased = paramCase(transliterated);
			const camelCased = camelCase(transliterated);
			const content = await readFile(file, "utf-8");
			const [, d] = /d="([\w\d\-\s\.]+)"/.exec(content);
			pathD[camelCased] = d;
			console.log(`Writing: ./icons/out/${paramCased}`);
			return writeFile(`./icons/out/${paramCased}`, content);
		})
	);
	console.log(`Writing: ./icons/path-d.json`);
	writeFile(`./icons/path-d.json`, JSON.stringify(pathD, null, 4));
	console.log(`Writing: ./icons/path-d.js`);
	writeFile(`./icons/path-d.js`, `module.exports = ${JSON.stringify(pathD, null, 4)}`);
})();
