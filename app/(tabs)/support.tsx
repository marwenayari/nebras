import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {useRouter} from "expo-router";
import {FontAwesome5} from "@expo/vector-icons";
import {useFocusEffect} from "@react-navigation/native";

export default function Support() {
  const router = useRouter();
  const translateX = useSharedValue<number>(-100);

  const translate = useAnimatedStyle(() => ({
    transform: [{translateX: withSpring(translateX.value * 2)}],
  }));

  useFocusEffect(
    React.useCallback(() => {
      translateX.value = -100;
      setTimeout(() => {
        translateX.value += 100;
      }, 50);
    }, [])
  );

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          translateX.value = -100;
          router.navigate("/settings");
        }}
        style={styles.backButton}
      >
        <FontAwesome5 name="chevron-right" color="#333" size={25}/>
      </TouchableOpacity>
      <Animated.View style={[styles.animatedContainer, translate]}>
        <FontAwesome5 name="coffee" color="brown" size={25}/>
        <ThemedText type="subtitle">صفحة الدعم قريبا</ThemedText>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 80,
    right: 20,
  },
  animatedContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});
