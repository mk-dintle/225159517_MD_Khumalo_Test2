import React from 'react';
import { FlatList, Text, ActivityIndicator } from 'react-native';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, loading, error, onToggle, onDelete }) {
  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error !== '') {
    return <Text style={{ color: 'red' }}>{error}</Text>;
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskCard task={item} onToggle={onToggle} onDelete={onDelete} />
      )}
      ListEmptyComponent={<Text>No tasks yet</Text>}
    />
  );
}