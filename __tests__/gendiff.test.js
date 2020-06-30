import { test, expect } from '@jest/globals';
import { join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const getFixturePath = (filename) => join(process.cwd(), '__fixtures__', filename);
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

test.each(table)('genDiff (files: %s, formatter: %s)', (ext, format) => {
  const firstFixturePath = getFixturePath(`before.${ext}`);
  const secondFixturePath = getFixturePath(`after.${ext}`);
  const expected = readFile(`result_${format}.txt`).trim();

  expect(genDiff(firstFixturePath, secondFixturePath, format)).toBe(expected);
});
