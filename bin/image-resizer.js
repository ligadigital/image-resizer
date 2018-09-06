#!/usr/bin/env node

"use strict";

const docopt = require('docopt').docopt;
const pkg = require('../package.json');
const server = require('../lib/server');

const doc = `
Usage: image-resizer [options]

Options:
  -p <port>, --port=<port>       Server port [Default: 3000]
  -d <path>, --data-dir=<path>   Specify data directory
  -c, --clear-tmp-files          Clear files on after every request

Enviroment Varaibles:
  S3_BUCKET                      e.g. images
  S3_PATH"                       e.g. image-resizer
  S3_URL                         e.g. http://example.s3-website.eu-central-1.amazonaws.com
  S3_ACCESS_KEY_ID
  S3_SECRET_ACCESS_KEY
`;
const opts = docopt(doc, { version: pkg.version });

const port = parseInt(opts['--port']);
const clearTmpFiles = opts['--clear-tmp-files'];
const dataDir = opts['--data-dir'];

server({ port, clearTmpFiles, dataDir })
  .then((listener) => console.log('Listening on *:' + listener.address().port))
  .catch(error => console.error(error.stack || error));
