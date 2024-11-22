import {Button, Platform, StyleSheet} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import React, {useEffect, useRef, useState} from 'react';
import {SchedulableTriggerInputTypes} from "expo-notifications/src/Notifications.types";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const {status} = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Permission not granted for push notifications!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    const token = (await Notifications.getExpoPushTokenAsync({projectId})).data;
    console.log(token);
    return token;
  } else {
    alert('Must use physical device for push notifications');
  }
}

export default function TabTwoScreen() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch(error => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const triggerNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'نبراس | المراجعة اليومية',
          body: '﴿وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾',
          data: {someData: 'test'},
        },
        trigger: {
          type: SchedulableTriggerInputTypes.TIME_INTERVAL,
          repeats: false,
          seconds: 3
        }, // Trigger after 3 seconds
      });
      console.log('Notification scheduled!');
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  return (

    <ThemedView style={styles.container}>
      <ThemedText style={styles.title} type="title">قريبا</ThemedText>
      <Button title="اشعار بعد ساعة" onPress={triggerNotification}/>
    </ThemedView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    lineHeight: 50,
  }
});

