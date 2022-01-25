"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractThumbnail = extractThumbnail;

var _reactNative = require("react-native");

const LINKING_ERROR = `The package 'react-native-video-thumbnail-too' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const VideoThumbnailToo = _reactNative.NativeModules.VideoThumbnailToo ? _reactNative.NativeModules.VideoThumbnailToo : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }

});
/**
 * 
 * @param videoFilePath 
 * @param timeInMilliseconds 
 * @returns
 */

function extractThumbnail(params) {
  const {
    videoFilePath,
    imageType = 'jpg',
    timeInMilliseconds = 0,
    quality = 100
  } = params;
  return new Promise(async (resolve, reject) => {
    try {
      const uri = await VideoThumbnailToo.extractThumbnail(videoFilePath, timeInMilliseconds, imageType, quality);

      _reactNative.Image.getSize(uri, (width, height) => {
        resolve({
          width,
          height,
          uri
        });
      }, err => {
        reject(err);
      });
    } catch (err) {
      reject(err);
    }
  });
}
//# sourceMappingURL=index.js.map