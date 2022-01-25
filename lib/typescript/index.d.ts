/**
 *
 * @param videoFilePath
 * @param timeInMilliseconds
 * @returns
 */
export declare function extractThumbnail(params: {
    videoFilePath: string;
    imageType?: 'jpg' | 'png';
    timeInMilliseconds?: number;
    quality?: number;
}): Promise<{
    width: number;
    height: number;
    uri: string;
}>;
