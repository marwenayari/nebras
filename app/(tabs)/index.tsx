import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from "react";
import Verse from "@/components/Verse";
import Video from 'react-native-video';

type VideoPlayer = any;

export default function HomeScreen() {

  const videoPlayer = useRef<VideoPlayer>(null);
  const [surah] = useState<number>(1);
  const [verseNumber] = useState<number>(1);

  const [videoSource, setVideoSource] = useState(
    require('../../assets/videos/male/normal.mov'),
  );

  const changeVideoSource = () => {
    const source = `../../assets/videos/male/speaking.mov`;
    setVideoSource(require(source));
  };

  const [content] = useState('');


  return (
    <View style={styles.container}>
      <View style={styles.bot}>
        <Video
          ref={videoPlayer}
          source={videoSource}
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode="contain" // Or 'cover'
          rate={1.0} // 0 is paused, 1 is normal.
          ignoreSilentSwitch="obey"
        />
        <View style={styles.verse}>
          <Verse surah={surah} verseNumber={verseNumber}/>
        </View>
      </View>
      <View style={styles.content}>
        <Text>{content || '...'}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  verse: {
    position: 'absolute',
    bottom: 35,
    fontSize: 28,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: -45},
    shadowOpacity: 0.3,
    shadowRadius: 45,
    fontSize: 18,
  },
});
