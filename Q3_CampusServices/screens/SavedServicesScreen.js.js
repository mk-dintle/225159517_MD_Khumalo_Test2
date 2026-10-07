import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export default function SavedServicesScreen() {
  const { savedServices, removeSavedService, colors, loaded } = useApp();

  if (!loaded) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>
        Saved Services ({savedServices.length})
      </Text>

      <FlatList
        data={savedServices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
            <Text style={{ color: colors.text }}>{item.description}</Text>

            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => removeSavedService(item.id)}
            >
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: colors.text }}>
            No saved services yet. Go to Services to save one.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  card: { padding: 12, borderRadius: 5, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  removeBtn: { backgroundColor: 'red', padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});