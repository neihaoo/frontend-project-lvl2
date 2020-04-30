import path from 'path';
import genJSONDiff from '../src/index';

let firstFilePath;
let secondFilePath;
let expectedDiff;

beforeAll(() => {
  firstFilePath = path.join(__dirname, '/fixtures/before.json');
  secondFilePath = path.join(__dirname, '/fixtures/after.json');
  expectedDiff = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';
});

describe('Generating JSON diff', () => {
  test('Should pass', () => {
    const diff = genJSONDiff(firstFilePath, secondFilePath);

    expect(diff).toBe(expectedDiff);
  });

  test("Shouldn't pass", () => {
    const diff = genJSONDiff(secondFilePath, firstFilePath);

    expect(diff).not.toBe(expectedDiff);
  });
});
