import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useApp();

  return (
    <TouchableOpacity style={styles.button} onPress={toggleTheme}>
      <Text style={styles.text}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: 'gray', padding: 10, borderRadius: 5, marginBottom: 15 },
  text: { color: 'white', textAlign: 'center' },
});