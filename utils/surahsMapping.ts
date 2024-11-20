import {surahData} from './surahData';

export const SurahsMapping: Record<string, number> = surahData.reduce((acc, surah) => {
  acc[surah.name] = surah.number;
  return acc;
}, {} as Record<string, number>);
