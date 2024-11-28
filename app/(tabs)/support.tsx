import {Button, StyleSheet} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import React, {useEffect} from "react";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {ThemedView} from "@/components/ThemedView";

export default function Support() {
  const translateX = useSharedValue<number>(-100);

  const translate = useAnimatedStyle(() => ({
    transform: [{translateX: withSpring(translateX.value * 2)}],
  }));

  useEffect(() => {
    translateX.value += 100;
  }, []);

  return (
    <ThemedView style={[styles.container, translate]}
    >
      <Animated.View
        style={translate}
      >
        <ThemedText type="title">صفحة الدعم قريبا</ThemedText>
      </Animated.View>
      <Animated.View
        style={translate}
      >
        <ThemedText type="subtitle">صفحة الدعم قريبا</ThemedText>
        <Button title="Click me"/>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
