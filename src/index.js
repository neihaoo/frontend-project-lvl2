import { has, union } from 'lodash';

const genJSONDiff = (firstJson, secondJson) => {
  const firstObj = JSON.parse(firstJson);
  const secondObj = JSON.parse(secondJson);
  const firstObjKeys = Object.keys(firstObj);
  const secondObjKeys = Object.keys(secondObj);
  const uniqKeys = union(firstObjKeys, secondObjKeys);
  const result = uniqKeys
    .reduce((acc, key) => {
      const addedItem = `+ ${key}: ${secondObj[key]}`;
      const deletedItem = `- ${key}: ${firstObj[key]}`;
      const noChangedItem = `  ${key}: ${secondObj[key]}`;

      if (has(firstObj, key) && has(secondObj, key)) {
        return (firstObj[key] === secondObj[key])
          ? [...acc, noChangedItem]
          : [...acc, addedItem, deletedItem];
      }

      return !has(firstObj, key)
        ? [...acc, addedItem]
        : [...acc, deletedItem];
    }, [])
    .join('\n  ');

  return `{\n  ${result}\n}`;
};

export default genJSONDiff;
