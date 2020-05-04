install:
	npm ci

run:
	bin/gendiff.js -h

test: 
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

publish:
	npm publish --dry-run
