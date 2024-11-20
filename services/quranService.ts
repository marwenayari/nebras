import {Ayah, Surah} from "@/types/quranTypes";

const BASE_URL = 'https://api.quran.com/api/v4'; // Replace with the actual base URL of the Quran.com API

export const getSurah = async (
  identifier: number | string,
): Promise<Surah | null> => {
  try {
    const surahResponse = await fetch(`${BASE_URL}/chapters/${identifier}`);
    if (!surahResponse.ok) {
      throw new Error('Surah not found');
    }
    return await surahResponse.json(); // Adjust according to the actual API response structure
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAyah = async (
  surahNumber: number,
  ayahNumber: number,
): Promise<Ayah | null> => {
  try {
    const ayahResponse = await fetch(
      `${BASE_URL}/verses/${surahNumber}/${ayahNumber}`,
    );
    if (!ayahResponse.ok) {
      throw new Error('Ayah not found');
    }
    return await ayahResponse.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
