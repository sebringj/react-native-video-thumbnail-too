import React, {useState} from 'react';

import { StyleSheet, View, Text, Image } from 'react-native';
import { extractThumbnail } from 'react-native-video-thumbnail-too';
import RNFS from 'react-native-fs'

export default function App() {
  const [thumbnail, setThumbnail] = useState({ width: 0, height: 0, uri: '' })

  React.useEffect(() => {
    async function getThumbnail() {
      try {
        const result = (await RNFS.readDir(RNFS.MainBundlePath)).find(o => o.path.endsWith('movie.mp4'))
        const response = await extractThumbnail(result!.path, 0)
        setThumbnail(response);
      } catch (err) {
        console.log(err)
      }
    }
    getThumbnail()
  }, []);

  return (
    <View style={styles.container}>
      {thumbnail.width? <Image source={{ uri: thumbnail.uri }} style={{ width: thumbnail.width, height: thumbnail.height }} /> : <Text>Loading thumbnail...</Text>}
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
