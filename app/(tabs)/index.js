import React, { useState, useMemo } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { songs } from '../../data/songs';
import SongCard from '../../components/SongCard';
import LanguageFilterModal from '../../components/LanguageFilterModal';

export default function HomeScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const filteredSongs = useMemo(() => {
    if (selectedLanguage === 'All Languages') {
      return songs;
    }
    return songs.filter((song) => song.language === selectedLanguage);
  }, [selectedLanguage]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>Sinduwa</Text>

          <Pressable
            style={({ pressed }) => [
              styles.filterButton,
              pressed && styles.filterButtonPressed,
            ]}
            onPress={() => setFilterModalVisible(true)}
            accessibilityRole="button"
            accessibilityLabel={`Filter by language. Currently: ${selectedLanguage}`}
          >
            <Ionicons name="filter-outline" size={16} color="#333333" style={{ marginRight: 6 }} />
            <Text style={styles.filterButtonText} numberOfLines={1}>
              {selectedLanguage === 'All Languages' ? 'Filter' : selectedLanguage}
            </Text>
          </Pressable>
        </View>

        {selectedLanguage !== 'All Languages' && (
          <View style={styles.filterInfoBar}>
            <Text style={styles.filterInfoText}>
              Showing {filteredSongs.length} songs in {selectedLanguage}
            </Text>
            <Pressable
              onPress={() => setSelectedLanguage('All Languages')}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.clearFilterText}>Clear</Text>
            </Pressable>
          </View>
        )}

        <FlatList
          data={filteredSongs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SongCard song={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No songs found</Text>
              <Text style={styles.emptySubtitle}>
                No songs found for &ldquo;{selectedLanguage}&rdquo;.
              </Text>
              <Pressable
                style={styles.resetButton}
                onPress={() => setSelectedLanguage('All Languages')}
              >
                <Text style={styles.resetButtonText}>Show All Songs</Text>
              </Pressable>
            </View>
          }
        />

        <LanguageFilterModal
          visible={filterModalVisible}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
          onClose={() => setFilterModalVisible(false)}
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
  appTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111111',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  filterButtonPressed: {
    backgroundColor: '#EEEEEE',
  },
  filterButtonText: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '500',
  },
  filterInfoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F3F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  filterInfoText: {
    fontSize: 12,
    color: '#495057',
  },
  clearFilterText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
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
  resetButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
