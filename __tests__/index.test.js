import { join } from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => (
  join(__dirname, '..', '__fixtures__', filename)
);

let expected;

beforeAll(() => {
  expected = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';
});

test.each([
  [getFixturePath('before.json'), getFixturePath('after.json')],
  [getFixturePath('before.yml'), getFixturePath('after.yml')],
  [getFixturePath('before.ini'), getFixturePath('after.ini')],
])('genDiff', (firstFixturePath, secondFixturePath) => {
  expect(genDiff(firstFixturePath, secondFixturePath)).toBe(expected);
});
