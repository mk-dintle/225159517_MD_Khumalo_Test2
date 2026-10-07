import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

const SAVED_KEY = '@ujcampus:savedServices';
const THEME_KEY = '@ujcampus:theme';

export function AppProvider({ children }) {
  const [savedServices, setSavedServices] = useState([]);
  const [theme, setTheme] = useState('light');
  const [loaded, setLoaded] = useState(false);

  // restore saved data when the app starts
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedJson = await AsyncStorage.getItem(SAVED_KEY);
        if (savedJson !== null) {
          const parsed = JSON.parse(savedJson);
          if (Array.isArray(parsed)) {
            setSavedServices(parsed);
          }
        }

        const storedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (storedTheme !== null) {
          setTheme(storedTheme);
        }
      } catch (err) {
        console.log('Could not load saved data', err);
      }
      setLoaded(true);
    };

    loadData();
  }, []);

  // save services whenever they change (only after loading finished)
  useEffect(() => {
    if (!loaded) return;

    const saveServices = async () => {
      try {
        await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(savedServices));
      } catch (err) {
        console.log('Could not save services', err);
      }
    };

    saveServices();
  }, [savedServices, loaded]);

  // save theme whenever it changes
  useEffect(() => {
    if (!loaded) return;

    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem(THEME_KEY, theme);
      } catch (err) {
        console.log('Could not save theme', err);
      }
    };

    saveTheme();
  }, [theme, loaded]);

  // add a service (no duplicates, no mutation)
  const addSavedService = (service) => {
    setSavedServices((prev) => {
      const alreadySaved = prev.some((item) => item.id === service.id);
      if (alreadySaved) {
        return prev;
      }
      return [...prev, service];
    });
  };

  // remove the service with this id (no mutation)
  const removeSavedService = (id) => {
    setSavedServices((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors =
    theme === 'light'
      ? { background: '#ffffff', text: '#000000', card: '#f2f2f2' }
      : { background: '#121212', text: '#ffffff', card: '#2a2a2a' };

  return (
    <AppContext.Provider
      value={{
        savedServices,
        addSavedService,
        removeSavedService,
        theme,
        toggleTheme,
        colors,
        loaded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// custom hook so screens can use the shared state
export function useApp() {
  return useContext(AppContext);
}