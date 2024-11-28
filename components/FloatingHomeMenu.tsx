import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';

export default function FloatingHomeMenu({testStarted, onPress}: any) {
  const iconSize = 20;
  const active = 1;

  return (
    <View style={styles.buttonsContainer}>
      {['eye-slash', 'microphone', 'question-circle'].map((icon, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={onPress}
        >
          <FontAwesome5
            name={index === 0 && testStarted ? 'stop' : icon}
            style={active === index && styles.active}
            size={iconSize}
            color="#666"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    gap: 10,
  },
  menuItem: {width: 50, height: 50, justifyContent: 'center', alignItems: 'center'},
  active: {color: '#a1d4d1'},
});
