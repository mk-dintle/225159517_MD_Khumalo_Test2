import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { services } from '../data/services';
import ThemeToggle from '../components/ThemeToggle';

export default function ServicesScreen() {
  const { savedServices, addSavedService, removeSavedService, colors } = useApp();

  const isSaved = (id) => savedServices.some((item) => item.id === id);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemeToggle />

      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
            <Text style={{ color: colors.text }}>{item.description}</Text>

            {isSaved(item.id) ? (
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeSavedService(item.id)}
              >
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.saveBtn} onPress={() => addSavedService(item)}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { padding: 12, borderRadius: 5, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  saveBtn: { backgroundColor: 'green', padding: 10, borderRadius: 5, marginTop: 10 },
  removeBtn: { backgroundColor: 'red', padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});