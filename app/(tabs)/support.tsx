import {StyleSheet, TouchableOpacity} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import React, {useState} from "react";
import {IconSymbol} from "@/components/ui/IconSymbol";
import ParallaxScrollView from "@/components/ParallaxScrollView";
//import Purchases, {PurchasesOffering} from "react-native-purchases";
//import LottieView from "lottie-react-native";

//const APIKeys = {
//   apple: "your_revenuecat_apple_api_key",
// google: "your_revenuecat_google_api_key",
//};

export default function Support() {
//    const [currentOffering, setCurrentOffering] =
  //      useState<PurchasesOffering | null>(null);
  const [height, setHeight] = useState<number>(300);
  const [selected, setSelected] = useState<string>("M");
  const [price, setPrice] = useState<number>(2.99);

  const selectCoffee = (size: string) => {
    setSelected(size);

    if (size === "S") {
      setHeight(400);
      setPrice(2.99);
    } else if (size === "M") {
      setHeight(500);
      setPrice(3.99);
    } else if (size === "L") {
      setHeight(550);
      setPrice(5.99);
    } else {
      setHeight(600);
      setPrice(6.99);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{light: '#D0D0D0', dark: '#353636'}}
      headerImage={
        <IconSymbol
          size={110}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
        />
      }> <ThemedView style={styles.textContainer}>
      <ThemedText type="subtitle"></ThemedText>
      <ThemedText type="subtitle"></ThemedText>
      <ThemedText type="subtitle">قهوتنا اليوم عليك ❤️</ThemedText>
      <ThemedText type="subtitle"></ThemedText>
    </ThemedView>
      <ThemedView style={styles.paymentContainer}>
        <ThemedView style={styles.coffeeColumns}>
          <ThemedView
            className="bg-transparent"
            style={{backgroundColor: "transparent"}}
          >
            <TouchableOpacity
              onPress={() => selectCoffee("S")}
              style={[
                styles.coffeeSize,
                {backgroundColor: selected === "S" ? "#f48686" : "#fff"},
              ]}
            >
              <ThemedText type="subtitle">S</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => selectCoffee("M")}
              style={[
                styles.coffeeSize,
                {backgroundColor: selected === "M" ? "#f48686" : "#fff"},
              ]}
            >
              <ThemedText type="subtitle">M</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => selectCoffee("L")}
              style={[
                styles.coffeeSize,
                {backgroundColor: selected === "L" ? "#f48686" : "#fff"},
              ]}
            >
              <ThemedText type="subtitle">L</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => selectCoffee("XL")}
              style={[
                styles.coffeeSize,
                {backgroundColor: selected === "XL" ? "#f48686" : "#fff"},
              ]}
            >
              <ThemedText type="subtitle">XL</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
        <ThemedText type="subtitle"></ThemedText>
        <ThemedText type="subtitle"></ThemedText>
        <ThemedText type="subtitle"></ThemedText>

        <ThemedText type="subtitle">${price}</ThemedText>
        <TouchableOpacity style={styles.payNow}>
          <ThemedText type="subtitle">دفع</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  paymentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
    width: "100%",
    backgroundColor: "#d6e9e7",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    height: 700,
  },
  coffeeColumns: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: "100%",
    height: "50%",
  },
  coffeeSize: {
    backgroundColor: "#fff",
    padding: 5,
    margin: 5,
    width: 50,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    textAlign: "center",
    borderRadius: 100,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "85%",
  },
  textStyle: {
    fontSize: 14,
    lineHeight: 24,
  },
  image: {
    objectFit: "contain",
    width: "100%",
    height: 170,
  },
  payNow: {
    backgroundColor: "white",
    padding: 10,
    width: "80%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    textAlign: "center",
    borderRadius: 50,
  },
});
