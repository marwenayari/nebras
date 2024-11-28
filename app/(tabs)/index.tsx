import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useVideoPlayer, VideoPlayer, VideoView} from 'expo-video';
import {useAudioPlayer} from 'expo-audio';
import Verse from '@/components/Verse';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';
import {getThemeColors} from '@/constants/themeConstants';
import {parseSurahName, pickRandomVerse} from '@/utils/quranUtils';
import {getVerseAudio} from "@/services/quran";
import {FontAwesome5} from "@expo/vector-icons";
import {ThemedText} from "@/components/ThemedText";
import FloatingHomeMenu from "@/components/FloatingHomeMenu";

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

        setTestStarted(true);
        setIsModelSpeaking(true);

        // Stop listening before playing the instruction audio
        stopListening();

        Speech.speak('اقْرَأْ مِنْ قَوْلِهِ تَعَالَى', {
          language: 'ar',
          onDone: () => {
            setIsModelSpeaking(false);
            console.log("Surah number, verseNumber:", surahNumber, verse);

            if (surahNumber && verse) {
              setVerseNumber(verse);
              setSurah(surahNumber);
              playVerseAudio(surahNumber, verse).then(() => {
                // Start listening again after the verse audio finishes
                startListening();
              });
            }
          },
        });
      } else {
        setIsModelSpeaking(true);

        // Stop listening before playing the retry audio
        stopListening();

        Speech.speak('مِنْ فَضْلِكَ، اخْتَرْ سُورَةً لِبَدْءِ الِاخْتِبَار', {
          language: 'ar',
          onDone: () => {
            setIsModelSpeaking(false);
            startListening(); // Restart listening after the retry audio
          },
        });
      }
    } else {
      stopListening();
    }
  };


  const playVerseAudio = async (surahNumber: number, verseNum: number) => {
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

      // Gradually decrease the volume after 3 seconds
      setTimeout(() => {
        let volume = 1.0; // Start at full volume
        const interval = setInterval(() => {
          volume -= 0.1; // Decrease volume by 0.1 every 300ms
          if (volume <= 0) {
            volume = 0; // Ensure volume doesn't go below 0
            audioPlayer.volume = volume;
            audioPlayer.remove() // Stop the audio when the volume is 0
            clearInterval(interval); // Clear the interval
          } else {
            audioPlayer.volume = volume;
          }
        }, 400); // Adjust this value to change the speed of the fade-out
      }, 4000); // Wait for 3 seconds before starting to lower the volume
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


  const handleMenuPress = () => {
    console.log("handleMenuPress")
    console.log("handleMenuPress testStarted", testStarted)
    console.log("handleMenuPress isListening", isListening)

    if (testStarted) {
      if (isListening) {
        stopListening();
      } else {
        resetTest();
        startListening();
      }
    } else {
      if (isListening) {
        stopListening()
      } else {
        startListening()
      }
    }
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
            <ThemedText style={styles.instructionText}>
              {isListening
                ? ''
                : ''}
            </ThemedText>
          )}
        </View>
      </View>
      <View style={styles.content}>
        <ThemedText style={styles.recognizedText}>{speechText || ''}</ThemedText>
        <View style={styles.buttons}>
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
            style={[styles.button]}
          >
            <FontAwesome5
              name={isListening || testStarted ? 'stop' : 'eye-slash'}
              size={24}
              color="#555"
              style={styles.icon}
            />
            <ThemedText style={styles.buttonText}>
              {isListening || testStarted ? 'إيقاف' : 'اختبار حفظ'}
            </ThemedText>
          </TouchableOpacity>
        </View>
        <FloatingHomeMenu testStarted={testStarted} onPress={handleMenuPress}/>

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
    lineHeight: 35,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
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
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    borderRadius: 5,
    width: '50%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#555',
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  menuItem: {
    //backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#333",
    //shadowOpacity: 0.3,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
  },
  active: {
    color: '#a1d4d1'
  },
  recognizedText: {
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
