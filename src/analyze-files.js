/* eslint-disable no-sync */
import fs from 'fs';
import path from 'path';
import {metrics, tags} from 'adana-analyze';
import {altLines, extendWithLines} from './alt-lines'; // FIXME temporary solution

const requiredTags = [
  'statement',
  'branch',
  'line',
  'function'
];

const separator = /\\|\//;
function normalizePath(pathString) {
  return pathString.replace(separator, '/');
}

function computeMetrics(coverageLocations) {
  const selectedTags = tags(coverageLocations, requiredTags);

  extendWithLines(selectedTags, coverageLocations); // FIXME temporary solution

  return Object
    .keys(selectedTags)
    .reduce((result, tagName) => {
      result[tagName] = metrics(selectedTags[tagName]);
      return result;
    }, {});
}

function analyzeFile(fileCoverage) {
  return {
    name: path.basename(fileCoverage.path),
    path: normalizePath(fileCoverage.path),
    contents: fs.readFileSync(fileCoverage.path, 'utf8'),
    lines: altLines(fileCoverage.locations), // FIXME temporary solution
    metrics: computeMetrics(fileCoverage.locations),
    branches: tags(fileCoverage.locations).branch
  };
}

function commonPathReducer(a, b) {
  const result = [];
  const minLength = Math.min(a.length, b.length);
  for (let i = 0; i < minLength; i += 1) {
    if (a[i] !== b[i]) { break; }
    result.push(a[i]);
  }
  return result;
}

function findCommonPath(splitFilePaths = []) {
  return splitFilePaths.length === 1 ?
    splitFilePaths[0].slice(0, -1) :
    splitFilePaths.reduce(commonPathReducer);
}

export default function analyzeFiles(filesCoverage) {
  const files = Object.keys(filesCoverage).map(filePath => {
    return analyzeFile(filesCoverage[filePath]);
  });
  const splitFullFilePaths = files.map(file => file.path.split('/'));
  const commonPath = findCommonPath(splitFullFilePaths).join('/');
  return files.map(file => {
    file.path = file.path.slice(commonPath.length + 1);
    return file;
  });
}
