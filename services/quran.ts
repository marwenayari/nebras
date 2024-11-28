export async function getSurah(surah: string | number): Promise<any> {
  try {
    const response = await fetch(
      `https://api.quran.com/api/v4/quran/verses/uthmani?surah=${surah}`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

export async function getSurahInfo(surah: number): Promise<any> {
  try {
    const response = await fetch(
      `https://api.quran.com/api/v4/chapters/${surah}?language=ar`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

export async function getVerseAudio(surahNumber: number, verseNum: number): Promise<string | null> {
  try {
    // Ensure surahNumber and verseNum are properly formatted
    const formattedSurah = surahNumber.toString().padStart(3, '0'); // Surah as 3 digits
    const formattedVerse = verseNum.toString().padStart(3, '0');   // Verse as 3 digits

    // Construct the URL
    const audioUrl = `https://mirrors.quranicaudio.com/everyayah/Abu_Bakr_Ash-Shaatree_128kbps/${formattedSurah}${formattedVerse}.mp3`;

    return audioUrl;
  } catch (error) {
    console.error('There was a problem constructing the verse audio URL:', error);
    return null;
  }
}

export async function getVerse(surah: number, verse: number): Promise<any> {
  try {
    const response = await fetch(
      `https://quranapi.pages.dev/api/${surah}/${verse}.json`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}
