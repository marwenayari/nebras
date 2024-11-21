import {StyleSheet} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import React from "react";

export default function Support() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">صفحة الدعم قريبا</ThemedText>
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
