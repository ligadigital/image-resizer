'use strict';

const Promise = require('bluebird');
const fs = require('fs');
const readFile = Promise.promisify(fs.readFile);
const mime = require('mime');
const AWS = require('aws-sdk');

const bucket = process.env.S3_BUCKET;
const s3Path = process.env.S3_PATH;

// For dev purposes only
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
});

module.exports = function pushToS3(imgPath, urlPath) {

  var s3 = new AWS.S3();

  return readFile(imgPath)
    .then((data) => {

      if (!bucket || !s3Path) {
        throw new Error('S3 configurations missing: S3_BUCKET, S3_PATH');
      }

      return new Promise((resolve, reject) => {
        return s3.putObject({
          Bucket: bucket,
          Key: `${s3Path}/${urlPath}`.replace(/\/+/g, '/'),
          ContentType: mime.getType(imgPath),
          Body: data
        }, (err) => {
          if (err) { return reject(err); }
          resolve();
        });
      });
    });
};
