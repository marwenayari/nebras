import {SurahsMapping} from './surahsMapping';

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