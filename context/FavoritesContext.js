import React, { createContext, useContext, useState } from 'react';
import { triggerLikeNotification } from '../services/notificationService';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [likedSongs, setLikedSongs] = useState([]);

  const isLiked = (songId) => {
    return likedSongs.some((song) => song.id === songId);
  };

  const toggleLike = async (song) => {
    if (!song || !song.id) return;

    if (isLiked(song.id)) {
      setLikedSongs((prev) => prev.filter((item) => item.id !== song.id));
      console.log(`[FavoritesContext] Unliked song: "${song.title}"`);
    } else {
      setLikedSongs((prev) => [song, ...prev]);
      console.log(`[FavoritesContext] Liked song: "${song.title}"`);

      await triggerLikeNotification(song.title);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        likedSongs,
        isLiked,
        toggleLike,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
