
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          Customize your Plant Disease Detection app
        </Text>
      </View>

      <View style={styles.profile}>
        <Text style={styles.avatar}>🌿</Text>
        <View>
          <Text style={styles.profileTitle}>Plant Care User</Text>
          <Text style={styles.profileSubtitle}>
            Plant Disease Detection
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>PREFERENCES</Text>

      <View style={styles.settingRow}>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>Dark Mode</Text>
          <Text style={styles.description}>
            Enable the dark appearance preference
          </Text>
        </View>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: '#C8D5CA', true: '#246B45' }}
        />
      </View>

      <View style={styles.settingRow}>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>Notifications</Text>
          <Text style={styles.description}>
            Manage plant care reminders preference
          </Text>
        </View>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: '#C8D5CA', true: '#246B45' }}
        />
      </View>

      <Text style={styles.sectionTitle}>ABOUT</Text>

      <Pressable
        style={styles.aboutRow}
        onPress={() =>
          Alert.alert(
            'About',
            'Plant Disease Detection helps users explore possible plant diseases using AI predictions. Results are not a confirmed diagnosis.'
          )
        }
      >
        <Text style={styles.settingTitle}>About the App</Text>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable
        style={styles.aboutRow}
        onPress={() =>
          Alert.alert(
            'Important',
            'AI predictions may be incorrect. Consult a plant expert before treating your plant.'
          )
        }
      >
        <Text style={styles.settingTitle}>Disclaimer</Text>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Text style={styles.version}>Plant Disease Detection • Version 1.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8F1',
  },
  header: {
    backgroundColor: '#246B45',
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    color: '#E1F2E5',
    fontSize: 14,
    marginTop: 6,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 18,
    borderRadius: 16,
    gap: 14,
  },
  avatar: {
    fontSize: 36,
  },
  profileTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#24352A',
  },
  profileSubtitle: {
    fontSize: 13,
    color: '#667568',
    marginTop: 4,
  },
  sectionTitle: {
    marginTop: 12,
    marginHorizontal: 20,
    marginBottom: 8,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#58715F',
    letterSpacing: 1,
  },
  settingRow: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#24352A',
  },
  description: {
    fontSize: 12,
    color: '#667568',
    marginTop: 4,
  },
  aboutRow: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginHorizontal: 16,
    marginBottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 24,
    color: '#58715F',
  },
  version: {
    textAlign: 'center',
    color: '#7B887D',
    fontSize: 12,
    marginTop: 28,
    marginBottom: 35,
  },
});
