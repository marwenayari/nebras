import {SurahsMapping} from './surahsMapping';

export function parseQuranReference(
  speechText: string,
): { surah: number; verse: number } | null {
  // Regular expression to find arabic words and numbers in the speech text
  const words = speechText.match(/[\u0600-\u06FF]+|\d+/g);

  if (!words) return null;

  let surah = 0;
  let verse = 0;

  words.forEach(word => {
    if (SurahsMapping[word]) {
      surah = SurahsMapping[word];
    }
    verse = 1;
  });

  if (surah && verse) {
    return {surah, verse};
  }

  return null;
}
