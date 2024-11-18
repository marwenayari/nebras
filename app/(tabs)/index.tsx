import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useVideoPlayer, VideoView} from 'expo-video';
import Verse from '@/components/Verse';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';
import {getThemeColors} from "@/constants/themeConstants";

export default function HomeScreen() {
  const [surah] = useState<number>(1);
  const [verseNumber] = useState<number>(2);
  const [hasReplied, setHasReplied] = useState(false);
  const gender = 'male';
  const colors = getThemeColors(false, gender);
  const [videoSource, setVideoSource] = useState(
    require('../../assets/videos/male/normal.mov')
  );

  const player = useVideoPlayer(videoSource, (player) => {
    player.muted = true;
    player.loop = true;
    player.play();
  });

  const setModelSpeaking = () => {
    setVideoSource(require('../../assets/videos/male/speaking.mov'));
  };

  const setModelNormal = () => {
    setVideoSource(require('../../assets/videos/male/normal.mov'));
  };

  const [isListening, setIsListening] = useState(false);
  const [speechText, setSpeechText] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechError = onSpeechErrorHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = (e: any) => {
    console.log('Speech Start:', e);
    setHasReplied(false);
  };

  const onSpeechEndHandler = (e: any) => {
    console.log('Speech End:', e);
    setIsListening(false);
  };

  const onSpeechResultsHandler = (e: any) => {
    const text = e.value[0];
    setSpeechText(text);
    console.log('Speech Results:', text);
    if (text.includes('السلام عليكم')) {
      setModelSpeaking();
      replyGreeting();
      setHasReplied(true);
      setTimeout(() => {
        setModelNormal();
      }, 3500);
    }
  };

  const onSpeechErrorHandler = (e: any) => {
    console.error('Speech Recognition Error:', e);
    setIsListening(false);
    // Optionally, display an error message to the user
  };

  const startListening = async () => {
    try {
      setIsListening(true);
      await Voice.start('ar-EG'); // Arabic - Egypt locale
    } catch (error) {
      console.error('Error starting Voice recognition:', error);
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping Voice recognition:', error);
    }
  };

  const replyGreeting = () => {
    Speech.speak('وعليكم السلام ورحمة الله', {language: 'ar'});
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
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
        <TouchableOpacity
          onPress={isListening ? stopListening : startListening}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.recognizedText}>{speechText || '...'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingTop: 30,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 50,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  recognizedText: {
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
