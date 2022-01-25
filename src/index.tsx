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
export function extractThumbnail(params: {
  videoFilePath: string,
  imageType?: 'jpg' | 'png'
  timeInMilliseconds?: number,
  quality?: number
}): Promise<{
  width: number;
  height: number;
  uri: string;
}> {
  const { videoFilePath, imageType = 'jpg', timeInMilliseconds = 0, quality = 100 } = params
  return new Promise(async (resolve, reject) => {
    try {
      const uri = await VideoThumbnailToo.extractThumbnail(videoFilePath, timeInMilliseconds, imageType, quality)
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
