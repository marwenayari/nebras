import {Tabs} from 'expo-router';
import React from 'react';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {TabBarIcon} from "@/components/ui/TabBarIcon";
import {FontAwesome5} from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0f898cab",
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].gray,
        headerShown: false,
        tabBarShowLabel: true, // Enable label display
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          marginLeft: 20,
          marginRight: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          elevation: 5, // Add elevation for better visibility
          paddingBottom: 5, // Add padding for better spacing
          paddingTop: 5,
          backgroundColor: Colors[colorScheme ?? "light"].background,
          borderRadius: 15,
          height: 70, // Adjust height to accommodate labels
          shadowColor: Colors[colorScheme ?? "light"].shadow,
          shadowOpacity: 0.1,
          shadowOffset: {
            width: 0,
            height: 5,
          },
        },
        tabBarLabelStyle: {
          fontSize: 12, // Adjust font size for better appearance
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="support"
        options={{
          title: "ادعمنا",
          tabBarLabel: "ادعمنا", // Add a label for the tab
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="hand-holding-heart" size={24} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "تدرب",
          tabBarLabel: "تدرب", // Add a label for the tab
          tabBarIcon: ({color, focused}) => (
            <FontAwesome5 name="book-reader" size={24} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "اعرفنا",
          tabBarLabel: "اعرفنا", // Add a label for the tab
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon
              name={focused ? "people-circle" : "people-circle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
