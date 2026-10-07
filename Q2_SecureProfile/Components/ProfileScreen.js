import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function ProfileScreen({ user }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  // read ONLY the signed-in user's own document (uid from Firebase, not typed in)
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'users', user.uid),
      (snapshot) => {
        if (snapshot.exists()) {
          setProfile(snapshot.data());
        }
        setError('');
      },
      (err) => {
        setError('Could not load your profile');
      }
    );

    return () => unsubscribe();
  }, [user.uid]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError('Could not sign out, please try again');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Profile</Text>

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {profile === null && error === '' ? (
        <ActivityIndicator size="large" />
      ) : profile !== null ? (
        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{profile.studentName}</Text>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{profile.email}</Text>
          <Text style={styles.label}>Member since</Text>
          <Text style={styles.value}>
            {profile.createdAt ? profile.createdAt.toDate().toLocaleString() : 'Just now'}
          </Text>
        </View>
      ) : null}

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, 
    padding: 20,
     paddingTop: 50 },

  heading: { fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 15 },

  card: { borderWidth: 1, 
    borderColor: 'gray', 
    padding: 15,
     borderRadius: 5,
      marginBottom: 20 },

  label: { color: 'gray', 
    marginTop: 8 },
  value: { fontSize: 18 },

  error: { color: 'red', 
    marginBottom: 10 },

  logoutBtn: { backgroundColor: 'red',
     padding: 12,
      borderRadius: 5, 
      alignItems: 'center' },

  logoutText: { color: 'white', 
    fontWeight: 'bold' },
});