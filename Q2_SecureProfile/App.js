import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import AuthScreen from '.../components/AuthScreen';
import ProfileScreen from '../components/ProfileScreen';

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Checking session...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {user ? <ProfileScreen user={user} /> : <AuthScreen />}
    </SafeAreaView>
  );
}