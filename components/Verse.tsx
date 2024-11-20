import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {getVerse} from '@/services/quran';

interface VerseProps {
  surah: number;
  verseNumber: number;
}

const Verse: React.FC<VerseProps> = ({surah, verseNumber}) => {
  const [verse, setVerse] = useState<string>('');
  const [displayText, setDisplayText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVerse = async () => {
      setLoading(true);
      const response = await getVerse(surah, verseNumber);

      if (response && response.verses[0]) {
        const fullVerse = response.verses[0].text_uthmani;
        setVerse(fullVerse);
        processVerse(fullVerse);
      } else {
        setVerse('الآية غير متوفرة');
        setDisplayText('الآية غير متوفرة');
      }
      setLoading(false);
    };

    fetchVerse();
  }, [surah, verseNumber]);

  const processVerse = (fullVerse: string) => {
    const words = fullVerse.trim().split(/\s+/);
    if (words.length < 12) {
      // Display the entire verse
      setDisplayText(fullVerse);
    } else {
      // Display only the first 5 words
      const partialVerse = words.slice(0, 5).join(' ') + '...';
      setDisplayText(partialVerse);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1E90FF"/>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.verse}>{displayText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  verse: {
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: -15,
    textAlign: 'center',
    color: '#fff',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Verse;
