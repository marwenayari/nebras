import React from "react";
import {Button, StyleSheet, TouchableOpacity} from "react-native";
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
    transform: [{translateX: withSpring(translateX.value)}],
  }));


  useFocusEffect(
    React.useCallback(() => {
      translateX.value = -200;
      setTimeout(() => {
        translateX.value = 0;
      }, 50);
    }, [])
  );

  return (
    <ThemedView style={styles.container}>
      {/* Back button in the top right */}
      <TouchableOpacity
        onPress={() => router.navigate("/settings")}
        style={styles.backButton}
      >
        <FontAwesome5 name="chevron-right" color="#333" size={25}/>
      </TouchableOpacity>

      {/* Animated content */}
      <Animated.View style={[styles.animatedContainer, translate]}>
        <ThemedText type="subtitle">صفحة اللغة قريبا</ThemedText>
        <Button title="العربية" onPress={() => alert("اللغة العربية!")}/>
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
    top: 100,
    right: 20,
  },
  animatedContainer: {
    marginVertical: 10,
  },
});
