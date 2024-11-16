import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useVideoPlayer, VideoView} from 'expo-video';
import Verse from '@/components/Verse';

export default function HomeScreen() {
  const [surah] = useState<number>(1);
  const [verseNumber] = useState<number>(1);

  const [videoSource, setVideoSource] = useState(
    require('../../assets/videos/male/normal.mov') // Static resource
  );

  const player = useVideoPlayer(videoSource, (player) => {
    player.muted = true;
    player.loop = true;
    player.play();
  });

  const changeVideoSource = () => {
    const newSource = require('../../assets/videos/male/speaking.mov');
    setVideoSource(newSource);
    player.play()
  };

  const [content] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.bot}>
        <VideoView
          player={player}
          style={styles.backgroundVideo}
          contentFit="contain"
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
