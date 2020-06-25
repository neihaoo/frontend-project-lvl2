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

let expected;
let expectedNested;

beforeAll(() => {
  expected = readFile('result.txt').trim();
  expectedNested = readFile('result_nested.txt').trim();
});

test.each([
  [getFixturePath('before.json'), getFixturePath('after.json')],
  [getFixturePath('before.yml'), getFixturePath('after.yml')],
  [getFixturePath('before.ini'), getFixturePath('after.ini')],
])('genDiff', (firstFixturePath, secondFixturePath) => {
  expect(genDiff(firstFixturePath, secondFixturePath)).toBe(expected);
});

test.each([
  [getFixturePath('before_nested.json'), getFixturePath('after_nested.json')],
  [getFixturePath('before_nested.yml'), getFixturePath('after_nested.yml')],
  [getFixturePath('before_nested.ini'), getFixturePath('after_nested.ini')],
])('genDiff (Nested)', (firstFixturePath, secondFixturePath) => {
  expect(genDiff(firstFixturePath, secondFixturePath)).toBe(expectedNested);
});
