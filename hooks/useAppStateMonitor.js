// hooks/useAppStateMonitor.js
// Monitors application state transitions between background and foreground using React Native AppState API
import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

export function useAppStateMonitor() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [foregroundNotice, setForegroundNotice] = useState(null);

  useEffect(() => {
    console.log(`[AppState] Initial state is: ${appState.current}`);

    // Subscribe to AppState changes
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      // Check if transitioning from inactive/background to active (foreground)
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('[AppState] 🚀 App has returned to the foreground (active)!');
        setForegroundNotice(`Welcome back to Sinduwa! (${new Date().toLocaleTimeString()})`);
        
        // Auto-dismiss the toast notice after 3 seconds
        setTimeout(() => {
          setForegroundNotice(null);
        }, 3000);
      } else if (nextAppState.match(/inactive|background/)) {
        console.log(`[AppState] ⏸️ App moved to background/inactive: ${nextAppState}`);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    // Cleanup subscription when component unmounts
    return () => {
      console.log('[AppState] Removing AppState change listener on unmount');
      subscription.remove();
    };
  }, []);

  return {
    appStateVisible,
    foregroundNotice,
  };
}
