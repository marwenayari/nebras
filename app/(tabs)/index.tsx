import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useVideoPlayer, VideoView} from 'expo-video';
import Verse from '@/components/Verse';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';
import {getThemeColors} from '@/constants/themeConstants';
import {parseSurahName} from '@/utils/quranUtils';
import {surahData} from '@/utils/surahData';

export default function HomeScreen() {
  const [surah, setSurah] = useState<number | null>(null);
  const [verseNumber, setVerseNumber] = useState<number | null>(null);
  const gender = 'male';
  const colors = getThemeColors(false, gender);

  // Preload both videos
  const normalVideoSource = require('../../assets/videos/male/normal.mov');
  const speakingVideoSource = require('../../assets/videos/male/speaking.mov');

  const normalPlayer = useVideoPlayer(normalVideoSource, (player) => {
    player.muted = true;
    player.loop = true;
    player.play();
  });

  const speakingPlayer = useVideoPlayer(speakingVideoSource, (player) => {
    player.muted = true;
    player.loop = true;
    player.play();
  });

  const [isModelSpeaking, setIsModelSpeaking] = useState(false);

  const setModelSpeaking = () => {
    setIsModelSpeaking(true);
  };

  const setModelNormal = () => {
    setIsModelSpeaking(false);
  };

  const [isListening, setIsListening] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const [testStarted, setTestStarted] = useState(false);

  // Use a ref to track if we've already processed the speech result
  const hasProcessedSpeech = useRef(false);

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
    hasProcessedSpeech.current = false; // Reset the flag when speech starts
  };

  const onSpeechEndHandler = (e: any) => {
    console.log('Speech End:', e);
    setIsListening(false);
  };

  const onSpeechErrorHandler = (e: any) => {
    console.error('Speech Recognition Error:', e);
    setIsListening(false);
  };

  const onSpeechResultsHandler = async (e: any) => {
    const text = e.value[0];
    setSpeechText(text);
    console.log('Speech Results:', text);

    // Prevent multiple executions
    if (hasProcessedSpeech.current) {
      return;
    }
    hasProcessedSpeech.current = true;

    if (!testStarted) {
      const surahNumber = parseSurahName(text);
      if (surahNumber) {
        setSurah(surahNumber);
        await pickRandomVerse(surahNumber);
        setTestStarted(true);

        // Model says "اقرأ من قوله تعالى"
        setModelSpeaking();
        Speech.speak('اقرأ من قوله تعالى', {
          language: 'ar',
          onDone: () => {
            setModelNormal();
          },
        });
      } else {
        // Prompt the user to mention the Surah again
        setModelSpeaking();
        Speech.speak('من فضلك، اختر سورة لبدء الاختبار', {
          language: 'ar',
          onDone: () => {
            setModelNormal();
            startListening();
          },
        });
      }
    } else {
      // Handle user's recitation here
      stopListening();
    }
  };

  const pickRandomVerse = async (surahNumber: number) => {
    const surahInfo = surahData.find((s) => s.number === surahNumber);
    if (surahInfo) {
      const totalVerses = surahInfo.totalVerses;
      const randomVerseNumber = Math.floor(Math.random() * totalVerses) + 1;
      setVerseNumber(randomVerseNumber);
    }
  };

  const startListening = async () => {
    try {
      setIsListening(true);
      await Voice.start('ar-EG');
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

  const resetTest = () => {
    setSurah(null);
    setVerseNumber(null);
    setSpeechText('');
    setTestStarted(false);
    hasProcessedSpeech.current = false; // Reset the flag when test resets
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <View style={styles.bot}>
        {/* Normal Video */}
        <VideoView
          player={normalPlayer}
          style={[
            styles.backgroundVideo,
            {opacity: isModelSpeaking ? 0 : 1},
          ]}
          contentFit="contain"
        />
        {/* Speaking Video */}
        <VideoView
          player={speakingPlayer}
          style={[
            styles.backgroundVideo,
            {opacity: isModelSpeaking ? 1 : 0},
          ]}
          contentFit="contain"
        />
        <View style={styles.verse}>
          {surah && verseNumber ? (
            <Verse surah={surah} verseNumber={verseNumber}/>
          ) : (
            <Text style={styles.instructionText}>
              {isListening
                ? 'الرجاء ذكر اسم السورة'
                : 'اضغط على "بدء الاختبار" لاختيار السورة'}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={
            isListening
              ? stopListening
              : testStarted
                ? () => {
                  resetTest();
                  startListening();
                }
                : startListening
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {isListening ? 'إيقاف' : testStarted ? 'إعادة الاختبار' : 'بدء الاختبار'}
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
  instructionText: {
    fontSize: 22,
    textAlign: 'center',
    color: '#fff',
    paddingHorizontal: 20,
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
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  recognizedText: {
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
