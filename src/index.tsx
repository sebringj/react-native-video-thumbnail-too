import { NativeModules, Platform } from 'react-native';

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

export function extractThumbnail(videoFilePath: string, timeInMilliseconds: number): Promise<string> {
  return VideoThumbnailToo.extractThumbnail(videoFilePath, timeInMilliseconds);
}
