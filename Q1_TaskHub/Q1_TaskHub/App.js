import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import TaskForm from './component/TaskForm';
import TaskList from './component/TaskList';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listenError, setListenError] = useState('');
  const [writeError, setWriteError] = useState('');

  // real-time listener
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'tasks'),
      (snapshot) => {
        const list = snapshot.docs.map((d) => {
          return {
            id: d.id,
            ...d.data(),
          };
        });

        setTasks(list);
        setListenError('');
        setLoading(false);
      },
      (err) => {
        setListenError('Could not load tasks: ' + err.message);
        setLoading(false);
      }
    );

    // stop listening when the component unmounts
    return () => unsubscribe();
  }, []);

  const addTask = async (title, moduleCode, priority) => {
    try {
      await addDoc(collection(db, 'tasks'), {
        title: title,
        moduleCode: moduleCode,
        priority: priority,
        completed: false,
        createdAt: serverTimestamp(),
      });

      setWriteError('');
      return true;
    } catch (err) {
      setWriteError('Could not add task: ' + err.message);
      return false;
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      await updateDoc(doc(db, 'tasks', id), {
        completed: !completed,
      });

      setWriteError('');
    } catch (err) {
      setWriteError('Could not update task: ' + err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));

      setWriteError('');
    } catch (err) {
      setWriteError('Could not delete task: ' + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>UJ Student Task Hub</Text>

      <TaskForm onAdd={addTask} />

      {writeError !== '' && (
        <Text style={styles.error}>{writeError}</Text>
      )}

      <TaskList
        tasks={tasks}
        loading={loading}
        error={listenError}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});