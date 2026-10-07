import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';

function AlertCard({ item, saved, toggleSaved }) {
  // 4.4: created once with useRef, not recreated on every render
  const fade = useRef(new Animated.Value(0)).current;

  // 4.5: starts 20 units lower and moves up to 0
  const slide = useRef(new Animated.Value(20)).current;

  // 4.4: runs once when the card first appears
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 500,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
  }, [fade, slide]);

  return (
    <Animated.View
      style={[
        styles.card,
        saved && styles.cardSaved,
        {
          opacity: fade,
          transform: [{ translateY: slide }],
        },
      ]}
    >
      <Text style={styles.title}>{item.title}</Text>

      {/* 4.1: the function is only called when the user presses */}
      <Pressable
        style={[
          styles.button,
          saved && styles.buttonSaved,
        ]}
        onPress={() => toggleSaved(item.id)}
      >
        <Text style={styles.buttonText}>
          {saved ? 'Saved' : 'Save'}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

// 4.5: memo stops unrelated cards from re-rendering when one is saved
export default React.memo(AlertCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    borderWidth: 2,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  cardSaved: {
    backgroundColor: '#d9f7d9',
    borderColor: 'green',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'navy',
    padding: 10,
    borderRadius: 5,
  },
  buttonSaved: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});