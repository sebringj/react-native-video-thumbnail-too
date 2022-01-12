import AVFoundation
import UIKit

@objc(VideoThumbnailToo)
class VideoThumbnailToo: NSObject {
    @objc func extractVideoThumbnail(videoFilePath: String, frameMilliseconds: Int64 = 0) -> String {
        do {
            guard let url = URL(string: videoFilePath) else {
                print("*** Error generating thumbnail: bad videoFilePath")
                return ""
            }
            let asset = AVURLAsset(url: url, options: nil)
            let imgGenerator = AVAssetImageGenerator(asset: asset)
            imgGenerator.appliesPreferredTrackTransform = true
            let thumnailTime = CMTimeMake(value: frameMilliseconds, timescale: 1)
            let cgImage = try imgGenerator
                .copyCGImage(at:CMTime(milliseconds: frameMilliseconds), actualTime: nil)
            let thumbnail = UIImage(cgImage: cgImage)
            if let data = thumbnail.pngData() {
                let filepath = getDocumentsDirectory().appendingPathComponent(
                    "react-native-video-thumbnail-" + timeStamp() + ".png").standardizedFileURL
                try? data.write(to: filepath)
                if (data.isEmpty) {
                    print("*** Error generating thumbnail: no data")
                    return ""
                }
                return String(describing: filepath)
            }
            print("*** Error generated thumbnail: no data")
            return ""
        } catch let error {
            print("*** Error generating thumbnail: \(error.localizedDescription)")
            return ""
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


