import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {useColorScheme} from '@/hooks/useColorScheme';
import {getThemeColors} from "@/constants/themeConstants";
import Onboarding from "@/app/Onboarding";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const colors: any = getThemeColors(false, 'male');
  const [showOnboarding, setShowOnboarding] = useState(true); // Default to true


  const [loaded] = useFonts({
    Cairo: require("../assets/fonts/cairo/Cairo-Regular.ttf"),
  });

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem('onboarding');
        setShowOnboarding(onboardingCompleted !== 'true');
      } catch (error) {
        console.error('Error reading onboarding state:', error);
      }
      setLoading(false);
    };

    checkOnboarding();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      {showOnboarding ? (
        <Onboarding/>
      ) : (
        <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
          <Stack.Screen name="+not-found"/>
        </Stack>
      )}
      <StatusBar style="auto"/>
    </ThemeProvider>
  );
}
