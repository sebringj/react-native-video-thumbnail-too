#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(VideoThumbnailToo, NSObject)

    RCT_EXTERN_METHOD(extractThumbnail:
    (NSString *)videoFilePath
    withFrameMilliseconds:(nonnull NSNumber)frameMilliseconds
    withQuality:(nonnull NSNumber)quality
    withResolve:(RCTPromiseResolveBlock)resolve
    withReject:(RCTPromiseRejectBlock)reject)

@end
