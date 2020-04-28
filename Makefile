install:
	npm install

run:
	npx babel-node src/bin/gendiff.js -h

publish:
	npm publish --dry-run

lint:
	npx eslint .
