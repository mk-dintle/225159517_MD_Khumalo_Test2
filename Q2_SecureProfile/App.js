import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import AuthScreen from './Components/AuthScreen';
import ProfileScreen from './Components/ProfileScreen';

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  // react to Firebase's auth state (no manual loggedIn boolean)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  // show this while Firebase checks for a saved session
  if (checking) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Checking session...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user ? <ProfileScreen user={user} /> : <AuthScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});