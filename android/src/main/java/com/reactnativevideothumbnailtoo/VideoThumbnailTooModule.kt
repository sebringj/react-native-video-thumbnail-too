package com.reactnativevideothumbnailtoo

import android.graphics.Bitmap
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.io.File
import android.media.MediaMetadataRetriever
import java.io.FileOutputStream
import java.io.OutputStream
import java.time.LocalDateTime

class VideoThumbnailTooModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "VideoThumbnailToo"
    }

    @ReactMethod
    fun extractThumbnail(
      videoFilePath: String,
      frameMilliseconds: Long = 0,
      imageType: String = "jpg",
      quality: Int = 100,
      promise: Promise) {
      try {
        var cleanedVideoFilePath = videoFilePath.replace("file://", "")
        val retriever = MediaMetadataRetriever()
        retriever.setDataSource(cleanedVideoFilePath)
        val image = retriever.getFrameAtTime(frameMilliseconds)
        var externalDir = this.reactApplicationContext.getExternalFilesDir(null)
        var file = File(
          externalDir.toString(),
          "react-video-thumbnail-too" + LocalDateTime.now().toString() + "." + imageType
        )
        val stream: OutputStream = FileOutputStream(file)
        if (imageType == "jpg") {
          image.compress(Bitmap.CompressFormat.JPEG, quality, stream)
        } else {
          image.compress(Bitmap.CompressFormat.PNG, quality, stream)
        }
        stream.flush()
        stream.close()

        return promise.resolve(file.absoluteFile)
      } catch (e: Exception) {
        return promise.reject(e)
      }
    }
}
