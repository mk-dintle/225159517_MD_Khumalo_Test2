import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <View style={[styles.card, task.completed && styles.done]}>
      <Text style={[styles.title, task.completed && styles.strike]}>{task.title}</Text>
      <Text>Module: {task.moduleCode}</Text>
      <Text>Priority: {task.priority}</Text>
      <Text>Status: {task.completed ? 'Completed' : 'Incomplete'}</Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={() => onToggle(task.id, task.completed)}>
          <Text>{task.completed ? 'Re-open' : 'Complete'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(task.id)}>
          <Text style={{ color: 'white' }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, 
    borderColor: 'gray', 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 5 },


  done: { backgroundColor: 'lightgreen' },
  
  title: { fontSize: 16, 
    fontWeight: 'bold' },

  strike: { textDecorationLine: 'line-through' },

  row: { flexDirection: 'row',
     marginTop: 8 },

  btn: { backgroundColor: 'lightgray',
     padding: 8, 
     marginRight: 8, 
     borderRadius: 5 },


  deleteBtn: { backgroundColor: 'red', 
    padding: 8, 
    borderRadius: 5 },
    
});
