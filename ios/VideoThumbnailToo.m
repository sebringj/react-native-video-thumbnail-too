#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(VideoThumbnailToo, NSObject)

    RCT_EXTERN_METHOD(extractThumbnail:
    (NSString *)videoFilePath
    withFrameMilliseconds:(NSNumber)frameMilliseconds
    withResolve:(RCTPromiseResolveBlock)resolve
    withReject:(RCTPromiseRejectBlock)reject)

@end
