import { parse, stringify } from 'query-string';
import { aggregationConfig } from '../constants';
import { SearchOptionProps } from '../types';

export const encodeFilter = (
  filterObject: SearchOptionProps['filters']
): string => {
  // Testing:
  // $ node
  // > const queryString = require('query-string');
  // // Part 1: Use the given function
  // > queryString.stringify({ foo: ['bar', 'baz'], bar: ['baz'], bar2: null }, { arrayFormat: 'comma', skipNull: true, skipEmptyString: true, strict: false });
  // # => ('bar=baz&foo=bar,baz');
  // // Part 1: Cleanup the string by replacing '=' and '&'
  // // We do this since we hold the whole object in one param "filter"
  // // and want a nice looking URL (no escaping) as well.
  // > queryString.stringify({ foo: ['bar', 'baz'], bar: ['baz'], bar2: null }, { arrayFormat: 'comma', skipNull: true, skipEmptyString: true, strict: false }).replace(/=/g, ':').replace(/&/g, '|');
  // # => ('bar:baz|foo:bar,baz');
  const string = stringify(filterObject, {
    arrayFormat: 'separator',
    arrayFormatSeparator: ',',
    skipNull: true,
    skipEmptyString: true,
  })
    .replace(/=/g, ':')
    .replace(/&/g, '|');
  return string;
};

export const decodeFilter = (
  filterString: string
): SearchOptionProps['filters'] => {
  // Guard: Make sure our input does at least have one key-value-pair
  if (filterString === undefined) return {};
  if (!filterString.includes(':')) return {};

  // Undo the custom replacement from encodeFilter
  const preparedString = filterString.replace(/:/g, '=').replace(/\|/g, '&');

  // Now lets create our result object
  const resultRaw = parse(preparedString, {
    arrayFormat: 'separator',
    arrayFormatSeparator: ',',
  });

  // For some reason, with this stringify->parse transformation we loose the array format for singleChoise values
  // which breaks the search. So here we check if the values is a string and wrap it in an array.
  const resultFiexd = Object.fromEntries(
    Object.keys(resultRaw).map((key) => [
      key,
      typeof resultRaw[key] === 'string' ? [resultRaw[key]] : resultRaw[key],
    ])
  ) as SearchOptionProps['filters'];

  // Guard: Before we go, we need to make sure only allowed values make it into ItemsJS.
  // Otherwise the app breaks…
  const safeKeys = Object.keys(aggregationConfig);
  const safeValues = Object.keys(aggregationConfig)
    .map((key) => Object.keys(aggregationConfig[key].buckets))
    .flat();
  const removedKeys = [];
  const removedValues = [];
  const resultSafe = Object.fromEntries(
    Object.entries(resultFiexd).map(([key, values]) => {
      const valuesClone = [...values];
      // If the key is unknown, remove it all.
      if (!safeKeys.includes(key)) {
        removedKeys.push(key);
        return [];
      }
      // Check all values, remove those that we don't know.
      values.forEach((value, index) => {
        if (!safeValues.includes(value)) {
          removedValues.push(value);
          delete valuesClone[index];
        }
      });
      // Now cleanup the values typeof undefined.
      const cleanValues = valuesClone.filter((v) => v !== undefined);
      // And if all values are gone, remove the whole key
      if (cleanValues.length === 0) {
        removedKeys.push(key);
        return [];
      }
      return [key, cleanValues];
    })
  );
  // This is still not enough…
  // We now have { undefined: undefined } object entries, which we now remove…
  Object.keys(resultSafe).forEach((key) => {
    if (key === undefined) {
      delete resultSafe[key];
    }
    if (resultSafe[key] === undefined) {
      delete resultSafe[key];
    }
  });

  if (removedKeys.length || removedValues.length) {
    // eslint-disable-next-line no-console
    console.log({
      INFO: 'decodeFilter() removed keys/values that where given by the URL but not recognized by the config:',
      removedKeys,
      removedValues,
      resultSafe,
    });
  }

  return resultSafe;
};
