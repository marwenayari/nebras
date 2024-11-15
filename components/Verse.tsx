// src/components/Verse.tsx
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getVerse} from "@/services/quran";

interface VerseProps {
    surah: number;
    verseNumber: number;
}

const Verse: React.FC<VerseProps> = ({surah, verseNumber}) => {
    const [verse, setVerse] = useState<string>('');
    useEffect(() => {
        const fetchVerse = async () => {
            const response = await getVerse(surah, verseNumber);

            if (response && response.verses[0]) {
                setVerse(response.verses[0].text_uthmani);
            }
        };

        fetchVerse();
    }, [surah, verseNumber]);

    return (
        <View>
            <Text style={styles.verse}>{verse}</Text>
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
    },
});

export default Verse;
