const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'))
const request = require('request');
const sprintf = require('sprintf-js').sprintf;

const imageDir = 'images';
const runs = 5;

const urlOptions = {
  baseUrl: 'https://loremflickr.com', 
  width: '1280',
  height: '853',
  topic: 'nature'
};
const timeoutInterval = 2000;
let timeout = 0;

const url = `${urlOptions.baseUrl}/${urlOptions.width}/${urlOptions.height}/${urlOptions.topic}`


for (let i = 1; i <= runs; i++) {
    let imageName = sprintf('%05s.jpg', i) // image format style is 00001.jpg
    let imagePath = path.join(imageDir, imageName)
    setTimeout(() => {
      let stream = request(url).pipe(fs.createWriteStream(imagePath))
      stream.on('finish', (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Image ${i} written to images/${imageName}`);
        }
      });
    }, timeout);
    timeout += timeoutInterval
};