/* eslint-disable no-sync */
import fs from 'fs';
import path from 'path';
import {
  // lines,
  metrics,
  tags
} from 'adana-analyze';
import lines from './lines';

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
    lines: lines(fileCoverage.locations),
    metrics: computeMetrics(fileCoverage.locations)
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
