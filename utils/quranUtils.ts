import {SurahsMapping} from './surahsMapping';
import {surahData} from "@/utils/surahData";

export function parseSurahName(speechText: string): number | null {
  const words = speechText.match(/[\u0600-\u06FF]+/g);

  if (!words) return null;

  for (const word of words) {
    if (SurahsMapping[word]) {
      return SurahsMapping[word];
    }
  }

  return null;
}

export const pickRandomVerse = async (surahNumber: number): Promise<number> => {
  const surahInfo = surahData.find((s) => s.number === surahNumber) || surahData[0];
  const totalVerses = surahInfo.totalVerses;
  const randomVerseNumber = Math.floor(Math.random() * totalVerses) + 1;
  return randomVerseNumber || 1;
};