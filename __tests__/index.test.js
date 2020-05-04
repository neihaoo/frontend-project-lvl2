import { join } from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => (
  join(__dirname, '..', '__fixtures__', filename)
);

let expected;

beforeAll(() => {
  expected = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';
});

test('Test JSON diff', () => {
  const firstFixturePath = getFixturePath('before.json');
  const secondFixturePath = getFixturePath('after.json');
  const diff = genDiff(firstFixturePath, secondFixturePath);

  expect(diff).toEqual(expected);
});

test('Test YAML diff', () => {
  const firstFixturePath = getFixturePath('before.yml');
  const secondFixturePath = getFixturePath('after.yml');
  const diff = genDiff(firstFixturePath, secondFixturePath);

  expect(diff).toEqual(expected);
});
