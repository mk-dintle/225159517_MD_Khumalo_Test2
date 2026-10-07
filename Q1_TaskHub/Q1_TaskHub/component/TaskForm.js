import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [moduleCode, setModuleCode] = useState('');
  const [priority, setPriority] = useState('Low');
  const [message, setMessage] = useState('');

  const priorities = ['Low', 'Medium', 'High'];

  const handleAdd = async () => {
    // validation
    if (title.trim() === '' || moduleCode.trim() === '') {
      setMessage('Please enter a title and a module code');
      return;
    }
    setMessage('');

    const success = await onAdd(title.trim(), moduleCode.trim(), priority);

    //to only clear the fields if the write worked
    if (success) {
      setTitle('');
      setModuleCode('');
      setPriority('Low');
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Task title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Module code"
        value={moduleCode}
        onChangeText={setModuleCode}
      />

      <View style={styles.row}>
        {priorities.map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.priorityBtn, priority === p && styles.selected]}
            onPress={() => setPriority(p)}
          >
            <Text>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {message !== '' && <Text style={styles.error}>{message}</Text>}

      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <Text style={styles.addText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { marginBottom: 15 },

  input: { borderWidth: 1, 
        borderColor: 'gray',
        padding: 8, 
        marginBottom: 8, 
        borderRadius: 5 },

  row: { flexDirection: 'row',
         marginBottom: 8 },

  priorityBtn: { borderWidth: 1, 
    padding: 8, 
    marginRight: 8, 
    borderRadius: 5 },

  selected: { backgroundColor: 'lightblue' },

  error: { color: 'red',
         marginBottom: 8 },

  addBtn: { backgroundColor: 'navy',
            padding: 10, 
            borderRadius: 5, 
            alignItems: 'center' },
            
  addText: { color: 'white' },
});