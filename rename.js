const path = require("path");
const {readFile, writeFile} = require("fs");
const globby = require("globby");
const { paramCase } = require ("param-case");
const transliterate = require('@sindresorhus/transliterate');

(async () => {
	const paths = await globby(['./icons/optimized']);

	console.log(paths);
	paths.forEach(file => {
		const {base} = path.parse(file)
		const transliterated = transliterate(base)
		const paramCased = paramCase(transliterated)
		readFile(file, "utf-8", (error, content) => {
			if (error) {
				console.error(error)
			}
			console.log(`Writing: ./icons/out/${paramCased}`)
			writeFile(`./icons/out/${paramCased}`, content, (error) => {
				if (error) {
					console.error(error)
				}
			});
		} )

	})
})();
