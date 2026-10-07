import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function AuthScreen() {
  const [isRegister, setIsRegister] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // turn Firebase errors into short messages
  const getErrorMessage = (code) => {
    if (code === 'auth/invalid-email') return 'That email address is not valid';
    if (code === 'auth/email-already-in-use') return 'An account with this email already exists';
    if (code === 'auth/weak-password') return 'Password must be at least 6 characters';
    if (code === 'auth/invalid-credential') return 'Incorrect email or password';
    if (code === 'auth/user-not-found') return 'No account found with this email';
    if (code === 'auth/wrong-password') return 'Incorrect email or password';
    if (code === 'auth/network-request-failed') return 'Network error, check your connection';
    if (code === 'auth/too-many-requests') return 'Too many attempts, try again later';
    return 'Something went wrong, please try again';
  };

  const handleSubmit = async () => {
    // validation before calling Firebase
    if (email.trim() === '' || password === '') {
      setMessage('Please enter your email and password');
      return;
    }
    if (isRegister && studentName.trim() === '') {
      setMessage('Please enter your display name');
      return;
    }
    if (isRegister && password.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }

    setMessage('');
    setLoading(true);

    try {
      if (isRegister) {
        const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
        // profile document ID is the Firebase UID
        await setDoc(doc(db, 'users', result.user.uid), {
          studentName: studentName.trim(),
          email: result.user.email,
          createdAt: serverTimestamp(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (err) {
      setMessage(getErrorMessage(err.code));
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{isRegister ? 'Register' : 'Login'}</Text>

      {isRegister && (
        <TextInput
          style={styles.input}
          placeholder="Display name"
          value={studentName}
          onChangeText={setStudentName}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      {message !== '' && <Text style={styles.error}>{message}</Text>}

      <TouchableOpacity
        style={[styles.button, loading && styles.disabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>{isRegister ? 'Register' : 'Login'}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { setIsRegister(!isRegister); setMessage(''); }}>
        <Text style={styles.link}>
          {isRegister ? 'Already have an account? Login' : 'No account? Register'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, 
    justifyContent: 'center',
    padding: 20 },

  heading: { fontSize: 24, 
    fontWeight: 'bold',
     marginBottom: 15 },

  input: { borderWidth: 1, 
    borderColor: 'gray',
     padding: 10, 
     marginBottom: 10,
     borderRadius: 5 },

  error: { color: 'red', 
    marginBottom: 10 },

  button: { backgroundColor: 'navy', 
    padding: 12, 
    borderRadius: 5,
     alignItems: 'center' },

  disabled: { backgroundColor: 'gray' },

  buttonText: { color: 'white', 
    fontWeight: 'bold' },

  link: { color: 'blue', 
    marginTop: 15, 
    textAlign: 'center' },
    
});