import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useVideoPlayer, VideoPlayer, VideoView} from 'expo-video';
import {useAudioPlayer} from 'expo-audio';
import Verse from '@/components/Verse';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';
import {getThemeColors} from '@/constants/themeConstants';
import {parseSurahName, pickRandomVerse} from '@/utils/quranUtils';
import {getVerseAudio} from "@/services/quran";

export default function HomeScreen() {
  const [surah, setSurah] = useState<number | null>(null);
  const [verseNumber, setVerseNumber] = useState<number | null>(null);
  const gender = 'male';
  const colors: any = getThemeColors(false, gender);

  const normalVideoSource: any = require('../../assets/videos/male/normal.mov');
  const speakingVideoSource: any = require('../../assets/videos/male/speaking.mov');

  const normalPlayer: VideoPlayer = useVideoPlayer(normalVideoSource, (player) => {
    player.muted = true;
    player.loop = true;
    player.play();
  });

  const speakingPlayer: VideoPlayer = useVideoPlayer(speakingVideoSource, (player) => {
    player.muted = true;
    player.loop = true;
    player.play();
  });

  const [isModelSpeaking, setIsModelSpeaking] = useState(false);

  const [isListening, setIsListening] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const [testStarted, setTestStarted] = useState(false);

  const hasProcessedSpeech = useRef(false);
  const audioPlayer = useAudioPlayer('https://quranaudio.pages.dev/1/1_1.mp3');

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechError = onSpeechErrorHandler;

    audioPlayer.play();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    speakingPlayer.muted = true;
    normalPlayer.muted = true;
  }, [isModelSpeaking]);

  const onSpeechStartHandler = (e: any) => {
    hasProcessedSpeech.current = false;
  };

  const onSpeechEndHandler = (e: any) => {
    setIsListening(false);
  };

  const onSpeechErrorHandler = (e: any) => {
    setIsListening(false);
  };

  const onSpeechResultsHandler = async (e: any) => {
    const text = e.value[0];
    setSpeechText(text);

    if (hasProcessedSpeech.current) {
      return;
    }
    hasProcessedSpeech.current = true;

    if (!testStarted) {
      const surahNumber = parseSurahName(text);
      if (surahNumber) {
        const verse: number = await pickRandomVerse(surahNumber);
        setVerseNumber(verse);
        setSurah(surahNumber);
        setTestStarted(true);
        setIsModelSpeaking(true);
        Speech.speak('اقْرَأْ مِنْ قَوْلِهِ تَعَالَى', {
          language: 'ar',
          onDone: () => {
            setIsModelSpeaking(false);
            console.log("Surah number, verseNumber:", surahNumber, verse);
            if (surahNumber && verse) {
              playVerseAudio(surahNumber, verse);
            }
          },
        });
      } else {
        setIsModelSpeaking(true);
        Speech.speak('مِنْ فَضْلِكَ، اخْتَرْ سُورَةً لِبَدْءِ الِاخْتِبَار', {
          language: 'ar',
          onDone: () => {
            setIsModelSpeaking(false);
            startListening();
          },
        });
      }
    } else {
      stopListening();
    }
  };

  const playVerseAudio: any = async (surahNumber: number, verseNum: number) => {
    try {
      const audioUrl = await getVerseAudio(surahNumber, verseNum);
      if (!audioUrl) {
        console.error("Failed to fetch the audio URL.");
        return;
      }
      console.log("Playing audio:", audioUrl);
      audioPlayer.replace({uri: audioUrl});
      audioPlayer.play();
      audioPlayer.setPlaybackRate(1.5);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };


  const startListening = async () => {
    try {
      setIsListening(true);
      await Voice.start('ar-SA');
    } catch (error) {
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
    }
  };

  const resetTest = () => {
    setSurah(null);
    //setVerseNumber(null);
    setSpeechText('');
    setTestStarted(false);
    hasProcessedSpeech.current = false;
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <View style={styles.bot}>
        <VideoView
          player={normalPlayer}
          style={[
            styles.backgroundVideo,
            {opacity: isModelSpeaking ? 0 : 1},
          ]}
          contentFit="contain"

        />
        <VideoView
          player={speakingPlayer}
          style={[
            styles.backgroundVideo,
            {opacity: isModelSpeaking ? 1 : 0},
          ]}
          nativeControls={false}

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
