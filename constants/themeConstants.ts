import {Colors} from 'react-native/Libraries/NewAppScreen';

export const getThemeColors = (isDarkMode: boolean, gender: string) => {
  let backgroundColor;
  if (gender === 'female') {
    backgroundColor = '#f0d9d7';
  } else if (gender === 'male') {
    backgroundColor = '#0f898cab';
  } else {
    backgroundColor = '#0f898c';
  }

  return {
    backgroundColor,
    textBackgroundColor: isDarkMode ? Colors.black : Colors.white,
    textColor: isDarkMode ? Colors.white : Colors.black,
    content: isDarkMode ? 'light-content' : 'dark-content',
    bgStyle: {backgroundColor: backgroundColor},
  };
};
