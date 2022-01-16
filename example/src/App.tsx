import React, {useState} from 'react';

import { StyleSheet, View, Text, Image } from 'react-native';
import { extractThumbnail } from 'react-native-video-thumbnail-too';
import RNFS from 'react-native-fs'

export default function App() {
  const [thumbnail, setThumbnail] = useState('')

  React.useEffect(() => {
    async function getThumbnail() {
      try {
        const result = (await RNFS.readDir(RNFS.MainBundlePath)).find(o => o.path.endsWith('movie.mp4'))
        console.log(result)
        console.log(result!.path)
        const thumbnailPath = await extractThumbnail(result!.path, 0)
        console.log(thumbnailPath)
        setThumbnail(thumbnailPath);
      } catch (err) {
        console.log(err)
      }
    }
    getThumbnail()
  }, []);

  return (
    <View style={styles.container}>
      {thumbnail ? <Image source={{ uri: thumbnail }} width={100} height={100} /> : <Text>Loading thumbnail...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
