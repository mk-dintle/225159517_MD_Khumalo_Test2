import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import ThemeToggle from '../components/ThemeToggle';

export default function HomeScreen({ navigation }) {
  const { savedServices, colors, loaded } = useApp();

  // wait for AsyncStorage before showing the count
  if (!loaded) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>UJ Campus Services</Text>
      <Text style={[styles.count, { color: colors.text }]}>
        Saved Services: {savedServices.length}
      </Text>

      <ThemeToggle />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Services')}>
        <Text style={styles.buttonText}>Browse Services</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SavedServices')}>
        <Text style={styles.buttonText}>View Saved Services</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  count: { fontSize: 18, marginBottom: 20 },
  button: { backgroundColor: 'navy', padding: 12, borderRadius: 5, marginBottom: 10 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});