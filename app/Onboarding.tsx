import {StatusBar} from 'expo-status-bar';
import React, {useCallback} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {AntDesign} from '@expo/vector-icons';
import OnboardingPage, {PAGE_WIDTH} from "@/components/OnboardingPage";
import {BACKGROUND_COLOR, PAGES} from "@/constants/Onboarding";
import Dot from "@/components/Dot";
import {ThemedText} from "@/components/ThemedText";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / PAGE_WIDTH);
  });

  const scrollRef = useAnimatedRef<ScrollView>();

  const onIconPress = useCallback(async () => {
    if (activeIndex.value === PAGES.length - 1) {
      try {
        await AsyncStorage.setItem('onboarding', 'true'); // Save onboarding state
      } catch (error) {
        console.error('Error saving onboarding state:', error);
      }
      // Navigate to main app or exit onboarding
    } else {
      scrollRef.current?.scrollTo({x: PAGE_WIDTH * (activeIndex.value + 1)});
    }
  }, [activeIndex, scrollRef]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <Animated.ScrollView
        ref={scrollRef as any}
        style={{flex: 1}}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {PAGES.map((page, index) => (
          <OnboardingPage
            key={index.toString()}
            page={page}
            translateX={translateX}
            index={index}
          />
        ))}
      </Animated.ScrollView>
      <View style={styles.footer}>
        {/* Paginator */}
        <View style={[styles.fillCenter, {flexDirection: 'row'}]}>
          {PAGES.map((_, index) => {
            return (
              <Dot
                key={index.toString()}
                index={index}
                activeDotIndex={activeIndex}
              />
            );
          })}
        </View>
        {/* Text Container */}
        <View style={styles.fillCenter}>
          <ThemedText style={styles.text}> عرض المساعد</ThemedText>
        </View>
        {/* iconContainer */}
        <View style={styles.fillCenter}>œ
          <AntDesign
            name="arrowright"
            size={24}
            color="black"
            onPress={onIconPress}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  footer: {
    height: 50,
    marginBottom: 50,
    flexDirection: 'row',
  },
  fillCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1.7,
    fontWeight: '500',
  },
});