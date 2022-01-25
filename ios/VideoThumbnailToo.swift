import AVFoundation
import UIKit

@objc(VideoThumbnailToo)
class VideoThumbnailToo: NSObject {
    @objc(extractThumbnail:withFrameMilliseconds:withImageType:withQuality:withResolve:withReject:)
    func extractThumbnail(_ videoFilePath:String,
                          nonnull frameMilliseconds: NSNumber,
                          nonnull imageType: String,
                          nonnull quality: NSNumber,
                          resolve:RCTPromiseResolveBlock,
                          reject:RCTPromiseRejectBlock) -> Void {
        let url = URL(fileURLWithPath: videoFilePath)
        do {
            let asset = AVURLAsset(url: url, options: nil)
            let imgGenerator = AVAssetImageGenerator(asset: asset)
            imgGenerator.appliesPreferredTrackTransform = true
            let thumbnailTime = CMTimeMake(value: frameMilliseconds.int64Value, timescale: 1000)
            let cgImage = try imgGenerator.copyCGImage(at: thumbnailTime, actualTime: nil)
            let thumbnail = UIImage(cgImage: cgImage)
            let data = imageType == "jpg" ? thumbnail.jpegData(compressionQuality: CGFloat(quality.floatValue / 100)) : thumbnail.pngData()
            let filepath = getDocumentsDirectory()
                .appendingPathComponent("react-native-video-thumbnail-" + timeStamp() + "." + imageType)
            try data.unsafelyUnwrapped.write(to: filepath, options: .atomic)
            resolve(String(describing: filepath))
        } catch {
            print("extractThumbnail \(error)")
            reject("extractThumbnail", "could not load url", error)
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
