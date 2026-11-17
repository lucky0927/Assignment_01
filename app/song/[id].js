import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { songs } from '../../data/songs';
import { useFavorites } from '../../context/FavoritesContext';

export default function SongDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isLiked, toggleLike } = useFavorites();

  const song = songs.find((item) => item.id === String(id));
  const liked = song ? isLiked(song.id) : false;

  if (!song) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Song Not Found</Text>
          <Text style={styles.errorSubtitle}>
            The requested song could not be found.
          </Text>
          <Pressable
            style={styles.backButtonDefault}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.navBar}>
          <Pressable
            onPress={() => router.back()}
            style={styles.navButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={24} color="#111111" />
          </Pressable>

          <Text style={styles.navTitle} numberOfLines={1}>
            Song Details
          </Text>

          <Pressable
            onPress={() => toggleLike(song)}
            style={styles.navButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityRole="button"
            accessibilityLabel={liked ? 'Unlike song' : 'Like song'}
          >
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={24}
              color={liked ? '#D32F2F' : '#888888'}
            />
          </Pressable>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={{ uri: song.coverImage }}
            style={styles.coverImage}
            resizeMode="cover"
          />

          <View style={styles.metadataContainer}>
            <Text style={styles.songTitle}>{song.title}</Text>
            <Text style={styles.singerName}>{song.singer}</Text>
            <Text style={styles.songSubDetails}>
              Language: {song.language} {song.album ? `| Album: ${song.album}` : ''}
            </Text>
          </View>

          <Pressable
            onPress={() => toggleLike(song)}
            style={({ pressed }) => [
              styles.likeButton,
              liked ? styles.likeButtonActive : styles.likeButtonInactive,
              pressed && styles.likeButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={liked ? 'Remove from Liked Songs' : 'Add to Liked Songs'}
          >
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={18}
              color={liked ? '#FFFFFF' : '#333333'}
              style={{ marginRight: 8 }}
            />
            <Text
              style={[
                styles.likeButtonText,
                liked ? styles.likeButtonTextActive : styles.likeButtonTextInactive,
              ]}
            >
              {liked ? 'Liked in Favorites' : 'Add to Liked Songs'}
            </Text>
          </Pressable>

          <View style={styles.lyricsSection}>
            <Text style={styles.lyricsHeading}>Lyrics:</Text>
            <Text style={styles.lyricsText}>{song.lyrics}</Text>
          </View>
        </ScrollView>
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
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  navButton: {
    padding: 4,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111111',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    alignItems: 'center',
  },
  coverImage: {
    width: 200,
    height: 200,
    backgroundColor: '#EEEEEE',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  metadataContainer: {
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 14,
  },
  songTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111111',
    textAlign: 'center',
    marginBottom: 4,
  },
  singerName: {
    fontSize: 15,
    color: '#444444',
    marginBottom: 6,
  },
  songSubDetails: {
    fontSize: 13,
    color: '#777777',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    width: '100%',
    maxWidth: 260,
  },
  likeButtonInactive: {
    backgroundColor: '#F8F9FA',
    borderColor: '#CCCCCC',
  },
  likeButtonActive: {
    backgroundColor: '#D32F2F',
    borderColor: '#D32F2F',
  },
  likeButtonPressed: {
    opacity: 0.8,
  },
  likeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  likeButtonTextInactive: {
    color: '#333333',
  },
  likeButtonTextActive: {
    color: '#FFFFFF',
  },
  lyricsSection: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 16,
  },
  lyricsHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 10,
  },
  lyricsText: {
    fontSize: 15,
    color: '#333333',
    lineHeight: 24,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
    marginBottom: 16,
  },
  backButtonDefault: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
