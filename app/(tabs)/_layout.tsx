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
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarActiveTintColor: "#6193a5",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          marginLeft: 20,
          marginRight: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          elevation: 0,
          paddingBottom: 0,
          paddingTop: 0,
          backgroundColor: Colors[colorScheme ?? "light"].background,
          borderRadius: 15,
          height: 60,
          shadowColor: Colors[colorScheme ?? "light"].shadow,
          shadowOpacity: 0.1,
          shadowOffset: {
            width: 0,
            height: 0,
          },
        },
      }}
    >
      <Tabs.Screen
        name="support"
        options={{
          title: "ادعمني",
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="coffee" size={24} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "العب",
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon
              name={focused ? "keypad" : "keypad-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "اعرفني",
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
