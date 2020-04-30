install:
	npm ci

run:
	npx babel-node src/bin/gendiff.js -h

build:
	rm -rf dist
	npm run build

test: 
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

publish:
	npm publish --dry-run
