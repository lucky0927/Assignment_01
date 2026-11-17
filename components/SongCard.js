import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

export default function SongCard({ song }) {
  const router = useRouter();
  const { isLiked, toggleLike } = useFavorites();
  const liked = isLiked(song.id);

  const handleCardPress = () => {
    router.push(`/song/${song.id}`);
  };

  const handleLikePress = () => {
    toggleLike(song);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={handleCardPress}
      accessibilityRole="button"
      accessibilityLabel={`View details for ${song.title} by ${song.singer}`}
    >
      <Image
        source={{ uri: song.coverImage }}
        style={styles.coverImage}
        resizeMode="cover"
      />

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {song.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {song.singer} • {song.language}
        </Text>
      </View>

      <Pressable
        onPress={handleLikePress}
        style={styles.likeButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel={liked ? 'Unlike song' : 'Like song'}
      >
        <Ionicons
          name={liked ? 'heart' : 'heart-outline'}
          size={24}
          color={liked ? '#D32F2F' : '#888888'}
        />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  cardPressed: {
    backgroundColor: '#F5F5F5',
  },
  coverImage: {
    width: 48,
    height: 48,
    backgroundColor: '#E0E0E0',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#666666',
  },
  likeButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
