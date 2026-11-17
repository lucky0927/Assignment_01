// app/(tabs)/liked.js
// Liked Songs Screen for Sinduwa mobile application
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../../context/FavoritesContext';
import SongCard from '../../components/SongCard';

export default function LikedSongsScreen() {
  const router = useRouter();
  const { likedSongs } = useFavorites();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Liked Songs</Text>
          {likedSongs.length > 0 && (
            <Text style={styles.countText}>
              {likedSongs.length} {likedSongs.length === 1 ? 'song' : 'songs'}
            </Text>
          )}
        </View>

        {/* Liked Songs List */}
        <FlatList
          data={likedSongs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SongCard song={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="heart-outline" size={40} color="#888888" style={{ marginBottom: 12 }} />
              <Text style={styles.emptyTitle}>No Liked Songs Yet</Text>
              <Text style={styles.emptySubtitle}>
                Tap the heart icon next to any song to add it here.
              </Text>
              <Pressable
                style={({ pressed }) => [
                  styles.exploreButton,
                  pressed && styles.exploreButtonPressed,
                ]}
                onPress={() => router.push('/(tabs)')}
                accessibilityRole="button"
                accessibilityLabel="Explore songs on Home screen"
              >
                <Text style={styles.exploreButtonText}>Browse Songs</Text>
              </Pressable>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111111',
  },
  countText: {
    fontSize: 13,
    color: '#666666',
  },
  listContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#777777',
    textAlign: 'center',
    marginBottom: 16,
  },
  exploreButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  exploreButtonPressed: {
    opacity: 0.8,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
