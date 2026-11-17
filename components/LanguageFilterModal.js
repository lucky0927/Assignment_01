import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LANGUAGES } from '../data/songs';

export default function LanguageFilterModal({
  visible,
  selectedLanguage,
  onSelectLanguage,
  onClose,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.header}>
                <Text style={styles.title}>Filter by Language</Text>
                <Pressable
                  onPress={onClose}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  accessibilityRole="button"
                  accessibilityLabel="Close modal"
                >
                  <Ionicons name="close" size={22} color="#555555" />
                </Pressable>
              </View>

              <View style={styles.optionsList}>
                {LANGUAGES.map((language) => {
                  const isSelected = selectedLanguage === language;

                  return (
                    <Pressable
                      key={language}
                      style={({ pressed }) => [
                        styles.optionItem,
                        isSelected && styles.optionItemSelected,
                        pressed && styles.optionItemPressed,
                      ]}
                      onPress={() => {
                        onSelectLanguage(language);
                        onClose();
                      }}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isSelected }}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          isSelected && styles.optionTextSelected,
                        ]}
                      >
                        {language}
                      </Text>

                      {isSelected && (
                        <Ionicons name="checkmark" size={18} color="#007AFF" />
                      )}
                    </Pressable>
                  );
                })}
              </View>

              <Pressable
                style={styles.closeBtn}
                onPress={onClose}
              >
                <Text style={styles.closeBtnText}>Close</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111111',
  },
  optionsList: {
    marginVertical: 4,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  optionItemSelected: {
    backgroundColor: '#F0F7FF',
  },
  optionItemPressed: {
    backgroundColor: '#F5F5F5',
  },
  optionText: {
    fontSize: 15,
    color: '#333333',
  },
  optionTextSelected: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  closeBtn: {
    marginTop: 14,
    backgroundColor: '#F1F3F5',
    borderWidth: 1,
    borderColor: '#CED4DA',
    paddingVertical: 10,
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '600',
  },
});
