import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withTiming,} from 'react-native-reanimated';
import {usePathname, useRouter} from 'expo-router';
import {FontAwesome5} from "@expo/vector-icons";

export default function FloatingMenu({}) {
  const iconSize = 20;
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  const [menuOpen, setMenuOpen] = useState(false);

  const animationValues = [useSharedValue(0), useSharedValue(0), useSharedValue(0)];
  const menuItems = [
    {icon: "bookmark", screen: "/support"},
    {icon: "book-reader", screen: "/"},
    {icon: "user-circle", screen: "/settings"},
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    const newValue = menuOpen ? 0 : 1;
    console.log(`Toggling menu to ${newValue}`);
    console.log('pathname:', pathname);
    animationValues.forEach((value, index) => {
      value.value = withTiming(newValue, {duration: 300 + index * 100});
    });
  };

  const handlePress = (screen: any) => {
    console.log(`Navigating to ${screen}`);
    router.push(screen);
    if (menuOpen) toggleMenu();
  };

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          opacity: animationValues[index].value,
          transform: [
            {translateY: 20 - 20 * animationValues[index].value}, // Slide in effect
          ],
        }));

        return (
          <Animated.View key={index} style={[styles.menuItem, animatedStyle]}>
            <TouchableOpacity onPress={() => handlePress(item.screen)}>
              <FontAwesome5
                name={item.icon}
                style={pathname === item.screen && styles.active} // Highlight active menu item
                size={iconSize}
                color="#555"
              />
            </TouchableOpacity>
          </Animated.View>
        );
      })}

      {/* Bars Icon for toggling */}
      <TouchableOpacity style={styles.menuToggle} onPress={toggleMenu}>
        <FontAwesome5 name="bars" size={iconSize} color="#555"/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    position: "absolute",
    bottom: 20,
    right: 20,
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    gap: 10,
  },
  menuItem: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#333",
    //shadowOpacity: 0.3,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
  },
  active: {
    color: '#a1d4d1'
  },
  menuToggle: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#333",
    //shadowOpacity: 0.3,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
  },
});
