import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const table = [
  ['json', 'stylish'],
  ['json', 'plain'],
  ['json', 'json'],
  ['yml', 'stylish'],
  ['yml', 'plain'],
  ['yml', 'json'],
  ['ini', 'stylish'],
  ['ini', 'plain'],
  ['ini', 'json'],
];

test.each(table)('genDiff (extension: %s, format: %s)', (extension, format) => {
  const firstFixturePath = getFixturePath(`before.${extension}`);
  const secondFixturePath = getFixturePath(`after.${extension}`);

  const actual = genDiff(firstFixturePath, secondFixturePath, format);
  const expected = readFile(`result_${format}.txt`).trim();

  expect(actual).toBe(expected);
});
