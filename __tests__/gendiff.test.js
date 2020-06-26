import { test, expect } from '@jest/globals';
import { join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const getFixturePath = (filename) => (
  join(process.cwd(), '__fixtures__', filename)
);

const readFile = (filename) => (
  readFileSync(getFixturePath(filename), 'utf-8')
);

const table = [
  ['json', 'stylish'],
  ['json', 'plain'],
  ['yml', 'stylish'],
  ['yml', 'plain'],
  ['ini', 'stylish'],
  ['ini', 'plain'],
];

test.each(table)('genDiff (files: %s, output: %s)', (ext, format) => {
  const firstFixturePath = getFixturePath(`before.${ext}`);
  const secondFixturePath = getFixturePath(`after.${ext}`);
  const expected = readFile(`result_${format}.txt`).trim();

  expect(genDiff(firstFixturePath, secondFixturePath, format)).toBe(expected);
});
