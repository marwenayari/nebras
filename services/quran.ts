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

export async function getVerseAudio(verseKey: string, recitationId: number): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.quran.com/api/v4/verses/by_key/${verseKey}?recitation=${recitationId}&fields=audio`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const audioUrl = data.verse.audio.url;
    return audioUrl;
  } catch (error) {
    console.error('There was a problem fetching the verse audio:', error);
    return null;
  }
}


export async function getVerse(surah: number, verse: number): Promise<any> {
  try {
    const response = await fetch(
      `https://api.quran.com/api/v4/quran/verses/uthmani?surah=${surah}&verse_key=${surah}:${verse}`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}
