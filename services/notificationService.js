import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermissions() {
  if (Platform.OS === 'web') {
    return true;
  }

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('[NotificationService] Permission not granted for local notifications');
      return false;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('sinduwa-favorites', {
        name: 'Sinduwa Favorites',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#1DB954',
      });
    }

    return true;
  } catch (error) {
    console.log('[NotificationService] Error requesting notification permissions:', error);
    return false;
  }
}

export async function triggerLikeNotification(songTitle) {
  try {
    const bodyText = songTitle
      ? `"${songTitle}" added to your Liked Songs!`
      : 'Song added to your Liked Songs!';

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Sinduwa 🎵',
        body: bodyText,
        sound: true,
        data: { type: 'LIKE_NOTIFICATION' },
      },
      trigger: null,
    });
    console.log('[NotificationService] Local notification triggered successfully');
  } catch (error) {
    console.log('[NotificationService] Could not schedule local notification:', error);
  }
}
