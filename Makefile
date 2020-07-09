install:
	npm ci

run:
	bin/gendiff.js

run-stylish:
	bin/gendiff.js ./__fixtures__/before.json ./__fixtures__/after.json

run-plain:
	bin/gendiff.js -f plain ./__fixtures__/before.json ./__fixtures__/after.json

run-json:
	bin/gendiff.js -f json ./__fixtures__/before.json ./__fixtures__/after.json

test: 
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test
