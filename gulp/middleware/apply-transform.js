/* eslint-env node */

import fs from 'fs';
import path from 'path';
import url from 'url';
import etag from 'etag';
import querystring from 'querystring';

const fixturesPath = path.resolve(__dirname, '../../fixtures');

export default function createMiddleware() {
  const adanaFormatHtml = require('../../lib').default;

  return function applyTransformMiddleware(req, res, next) {
    const {pathname, query} = url.parse(req.url);

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next();
    }

    if (pathname !== '/' && pathname !== '/report.html') {
      return next();
    }

    const {fixture} = querystring.parse(query);
    const fixtureFileName = `${fixture || 'default'}.json`;
    const fixtureFilePath = path.join(fixturesPath, fixtureFileName);

    fs.readFile(fixtureFilePath, 'utf8', (fixtureError, fixtureContents) => {
      if (fixtureError) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end(`Failed to read the requested fixture.\n${fixtureError}`);
      } else {
        try {
          const coverage = JSON.parse(fixtureContents);
          const html = adanaFormatHtml(coverage);
          res.writeHead(200, {
            'Content-Type': 'text/html',
            ETag: etag(html)
          });
          res.end(html);
        } catch (reportError) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end(`Failed to generate HTML report.\n${reportError}`);
        }
      }
    });

  };
}
