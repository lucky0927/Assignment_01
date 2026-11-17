// app/(tabs)/_layout.js
// Bottom tab navigation layout for Home and Liked Songs
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useFavorites } from '../../context/FavoritesContext';

export default function TabLayout() {
  const { likedSongs } = useFavorites();
  const likedCount = likedSongs.length;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E0E0E0',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 84 : 60,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#888888',
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      {/* Home Screen Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'musical-notes' : 'musical-notes-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* Liked Songs Tab with Dynamic Badge */}
      <Tabs.Screen
        name="liked"
        options={{
          title: 'Liked Songs',
          tabBarBadge: likedCount > 0 ? likedCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#D32F2F',
            color: '#FFFFFF',
            fontSize: 10,
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
