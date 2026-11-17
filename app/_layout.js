import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from '../context/FavoritesContext';
import { requestNotificationPermissions } from '../services/notificationService';
import { useAppStateMonitor } from '../hooks/useAppStateMonitor';

function RootContent() {
  const { foregroundNotice } = useAppStateMonitor();

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {foregroundNotice && (
        <View style={styles.appStateNotice}>
          <Text style={styles.appStateNoticeText}>{foregroundNotice}</Text>
        </View>
      )}

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="song/[id]"
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <RootContent />
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  appStateNotice: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 32,
    left: 16,
    right: 16,
    zIndex: 9999,
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#C8E6C9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  appStateNoticeText: {
    color: '#2E7D32',
    fontSize: 13,
    fontWeight: '500',
  },
});
