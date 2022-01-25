#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(VideoThumbnailToo, NSObject)

    RCT_EXTERN_METHOD(extractThumbnail:
    (nonnull NSString *)videoFilePath
    withFrameMilliseconds:(nonnull NSNumber)frameMilliseconds
    withImageType:(nonnull NSString *)imageType
    withQuality:(nonnull NSNumber)quality
    withResolve:(RCTPromiseResolveBlock)resolve
    withReject:(RCTPromiseRejectBlock)reject)

@end
