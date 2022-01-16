import { NativeModules, Platform, Image } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-video-thumbnail-too' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const VideoThumbnailToo = NativeModules.VideoThumbnailToo
  ? NativeModules.VideoThumbnailToo
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

/**
 * 
 * @param videoFilePath 
 * @param timeInMilliseconds 
 * @returns
 */
export function extractThumbnail(videoFilePath: string, timeInMilliseconds: number): Promise<{
  width: number;
  height: number;
  uri: string;
}> {
  return new Promise(async (resolve, reject) => {
    try {
      const uri = await VideoThumbnailToo.extractThumbnail(videoFilePath, timeInMilliseconds)
      Image.getSize(uri, (width, height) => {
        resolve({
          width, height, uri
        })
      }, err => {
        reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}
