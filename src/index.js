/* eslint-env node */
/* eslint-disable no-sync */

import fs from 'fs';
import path from 'path';
import 'babel-polyfill';
import analyzeFiles from './analyze-files';

function generateReport(coverage, {
  environment = {},
  thresholds = {}
}) {
  return {
    files: analyzeFiles(coverage),
    timestamp: Date.now(),
    environment,
    thresholds
  };
}

export default function htmlReporter(coverage, options = {}) {
  const report = generateReport(coverage, options);
  return fs
    .readFileSync(path.join(__dirname, 'report.html'), 'utf8')
    .replace(/['"]%REPORT%['"]/, JSON.stringify(report));
}
