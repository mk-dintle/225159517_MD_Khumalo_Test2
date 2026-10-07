import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { alerts } from './data/alerts';
import AlertCard from './components/AlertCard';

export default function App() {
  const [saved, setSaved] = useState([]);

  // 4.2: never changes the old array, always returns a new one
  const toggleSaved = useCallback((id) => {
    setSaved((prev) => {
      if (prev.includes(id)) {
        return prev.filter((savedId) => savedId !== id);
      }

      return [...prev, id];
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>UJ Campus Alert Centre</Text>

      {/* 4.5: saved-alert count above the list */}
      <Text style={styles.count}>
        Saved alerts: {saved.length}
      </Text>

      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AlertCard
            item={item}
            saved={saved.includes(item.id)}
            toggleSaved={toggleSaved}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  count: {
    fontSize: 16,
    marginBottom: 15,
  },
});