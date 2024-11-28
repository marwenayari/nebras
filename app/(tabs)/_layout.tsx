import React from 'react';
import {Tabs} from 'expo-router';
import FloatingMenu from "@/components/FloatingMenu";

export default function TabLayout() {

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
        }}
      >
      </Tabs>
      <FloatingMenu/>
    </>
  );
}
