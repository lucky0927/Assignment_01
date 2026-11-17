# Sinduwa – Music Lyrics App

Student Name: S.A.M.A.P.L.Senarathna  
Student ID: PE/2022/038

# 1. Introduction

Sinduwa is a simple mobile application developed using React Native and Expo. The main purpose of this application is to allow users to browse song information and read song lyrics in different languages.

Users can browse songs, filter songs by language, view song details, and save their favourite songs in a separate list.

# 2. Main Features

**Home Screen:** Displays a list of available songs.
**Language Filter:** Allows users to filter songs by Sinhala, Tamil, and English.
**Song Details:** Displays the song title, cover image, singer name, language, and lyrics.
**Like Songs:** Users can like or unlike their favourite songs.
**Liked Songs:** Displays all songs liked by the user.
**Local Notifications:** Displays a notification when a user likes a song.
**App State Monitoring:** Detects when the application moves from the background to the foreground.

# 3. Technologies Used

- React Native
- JavaScript
- Expo
- Expo Router
- React Hooks (`useState`)
- React Native AppState API
- Expo Notifications

# 4. Application Screens

# Home Screen
Displays the available songs in a list. Users can select a language to filter the songs.

# Song Details Screen
Displays the selected song's cover image, title, singer, language, and lyrics. Users can like or unlike the song.

# Liked Songs Screen
Displays the songs that the user has added to their favourites.

# 5. React Native Components Used

| Component | Usage |
| View      | Layout and screen structure |
| Text      | Display song information and lyrics |
| Image     | Display song cover images |
| Pressable | Handle user interactions |
| FlatList  | Display the song list |
| Modal     | Display the language filter |
| useState  | Manage application state |
| AppState  | Monitor application state changes |

# 6. Navigation

The application uses Expo Router for file-based navigation.

*Bottom Tab Navigation is used to switch between Home and Liked Songs.
*Stack Navigation is used to navigate to the Song Details screen.
*Users can return to the previous screen using back navigation.

# 7. State Management

React's `useState` and shared application state are used to manage liked songs.

When a user likes or unlikes a song, the changes are reflected in the Liked Songs screen.

# 8. App State Monitoring

The React Native AppState API is used to monitor the application lifecycle.

An event listener detects when the application changes from the background state to the active state. The event listener is cleaned up when the component is removed.

# 9. Local Notifications

The application uses `expo-notifications` to display local notifications.

When a user likes a song, the application triggers a local notification to inform the user.

# 10. Installation and Running the Project

# Prerequisites

 Node.js
 npm
 Expo
 Android Emulator or Expo Go

# Clone the Repository

```bash
git clone https://github.com/lucky0927/Assignment_01.git
```

# Navigate to the Project Folder

```bash
cd Sinduwa
```

# Install Dependencies

```bash
npm install
```

# Start the Application

```bash
npx expo start
```

Use an Android Emulator or Expo Go to run the application.

# 11. Demonstration Video

The demonstration video shows the main application features, including:

 Browsing songs.
 Filtering songs by language.
 Opening song details.
 Liking and unliking songs.
 Viewing the Liked Songs screen.
 Local notification functionality.
 AppState background and foreground detection.
 Navigation between screens.

Video Link: [Add Your Demonstration Video Link Here]

# 12. GitHub Repository

Repository Link: https://github.com/lucky0927/Assignment_01.git
# Assignment_01
