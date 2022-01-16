import AVFoundation
import UIKit

@objc(VideoThumbnailToo)
class VideoThumbnailToo: NSObject {
    @objc(extractThumbnail:withFrameMilliseconds:withResolve:withReject:)
    func extractThumbnail(_ videoFilePath:String, frameMilliseconds:Int64 = 0, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
        let url = URL(fileURLWithPath: videoFilePath)
        do {
            let asset = AVURLAsset(url: url, options: nil)
            let imgGenerator = AVAssetImageGenerator(asset: asset)
            imgGenerator.appliesPreferredTrackTransform = true
            let thumbnailTime = CMTimeMake(value: 0, timescale: 1000)
            let cgImage = try? imgGenerator.copyCGImage(at: thumbnailTime, actualTime: nil)
            let thumbnail = UIImage(cgImage: cgImage.unsafelyUnwrapped)
            let data = thumbnail.pngData()
            let filepath = getDocumentsDirectory()
                .appendingPathComponent("react-native-video-thumbnail-" + timeStamp() + ".png").standardizedFileURL
            try data.unsafelyUnwrapped.write(to: filepath)
            resolve(String(describing: filepath))
        } catch let error {
            reject("extractThumbnail", "cannot load url", error)
        }
    }
}

func getDocumentsDirectory() -> URL {
    let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
    return paths[0]
}

func timeStamp() -> String {
    return String(describing: NSDate().timeIntervalSince1970)
}


