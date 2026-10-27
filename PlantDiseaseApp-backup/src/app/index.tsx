
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDiseaseInfo } from '../diseaseInfo';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
  StatusBar,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';

const API_URL = 'http://192.168.137.1:8000';
const HISTORY_KEY = 'leafcare_scan_history';

type Prediction = {
  disease: string;
  confidence: number;
  needs_review: boolean;
  message: string;
};

type ScanHistoryItem = {
  id: string;
  disease: string;
  confidence: number;
  imageUri: string;
  date: string;
};

export default function Index() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const saved = await AsyncStorage.getItem(HISTORY_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      Alert.alert('Error', 'Could not load scan history.');
    }
  }

  async function saveHistory(items: ScanHistoryItem[]) {
    try {
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(items));
      setHistory(items);
    } catch {
      Alert.alert('Storage error', 'Could not save scan history.');
    }
  }

  async function chooseGallery() {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permission needed',
          'Please allow access to your photo gallery.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.8,
        base64: false,
      });

      if (!result.canceled && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
        setPrediction(null);
      }
    } catch {
      Alert.alert('Error', 'Could not open your photo gallery.');
    }
  }

  async function takePhoto() {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permission needed',
          'Please allow camera access to take a leaf photo.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.8,
        base64: false,
      });

      if (!result.canceled && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
        setPrediction(null);
      }
    } catch {
      Alert.alert('Camera error', 'Could not open the camera.');
    }
  }

  async function analyzeImage() {
    if (!imageUri) {
      Alert.alert('Choose a photo', 'Please select a leaf photo first.');
      return;
    }

    setLoading(true);

    try {
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Image analysis failed.');
      }

      if (
        typeof data.disease !== 'string' ||
        typeof data.confidence !== 'number'
      ) {
        throw new Error('Unexpected response from the prediction API.');
      }

      const result: Prediction = {
        disease: data.disease,
        confidence: data.confidence,
        needs_review: data.needs_review ?? true,
        message:
          data.message ||
          'This is an AI-generated prediction, not a confirmed diagnosis. Please verify the result.',
      };

      setPrediction(result);

      const newScan: ScanHistoryItem = {
        id: Date.now().toString(),
        disease: result.disease,
        confidence: result.confidence,
        imageUri,
        date: new Date().toISOString(),
      };

      await saveHistory([newScan, ...history]);

    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Could not analyze the photo.';

      Alert.alert(
        'Analysis failed',
        `${message}\n\nCheck that your computer's API is running and your phone is connected to the same Wi-Fi network.`
      );
    } finally {
      setLoading(false);
    }
  }

  async function clearHistory() {
    Alert.alert(
      'Clear scan history',
      'Are you sure you want to delete all saved scans?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await saveHistory([]);
          },
        },
      ]
    );
  }

  function showInfo() {
    Alert.alert(
      'About LeafCare',
      'LeafCare uses an AI model to predict possible plant diseases from leaf photos. Predictions can be wrong, so check the result before taking action.'
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7FAF7" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.brandIcon}>
            <Text style={styles.brandIconText}>✿</Text>
          </View>

          <View style={styles.brandDetails}>
            <Text style={styles.brandName}>
              Leaf<Text style={styles.brandGreen}>Care</Text>
            </Text>
            <Text style={styles.brandSubtitle}>
              Plant Disease Detection
            </Text>
          </View>

          <Pressable style={styles.infoButton} onPress={showInfo}>
            <Text style={styles.infoText}>i</Text>
          </Pressable>
        </View>

        <View style={styles.hero}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>✦ AI POWERED</Text>
          </View>

          <Text style={styles.heroTitle}>
            Healthy Plants,{'\n'}
            <Text style={styles.brandGreen}>Better Tomorrow</Text>
          </Text>

          <Text style={styles.heroDescription}>
            Identify possible plant diseases with a simple leaf photo. Fast,
            simple and convenient.
          </Text>
        </View>

        <View style={styles.card}>
          <Pressable
            style={[
              styles.uploadArea,
              imageUri ? styles.uploadAreaSelected : null,
            ]}
            onPress={chooseGallery}
            disabled={loading}
          >
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={styles.preview}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <View style={styles.uploadIconCircle}>
                  <Text style={styles.uploadIcon}>＋</Text>
                </View>

                <Text style={styles.uploadTitle}>
                  Choose a Leaf Photo
                </Text>

                <Text style={styles.uploadDescription}>
                  Select a clear photo of a plant leaf{'\n'}
                  to check for possible diseases.
                </Text>

                <View style={styles.galleryButton}>
                  <Text style={styles.galleryButtonText}>
                    ▧ Select from Gallery
                  </Text>
                </View>
              </View>
            )}
          </Pressable>

          {imageUri && (
            <View style={styles.selectedRow}>
              <Text style={styles.selectedLabel}>✓ Photo selected</Text>
              <Pressable onPress={chooseGallery}>
                <Text style={styles.changeText}>Change photo</Text>
              </Pressable>
            </View>
          )}

          <Pressable
            style={styles.cameraButton}
            onPress={takePhoto}
            disabled={loading}
          >
            <Text style={styles.cameraText}>◎ Take Photo</Text>
          </Pressable>

          <Pressable
            style={[
              styles.analyzeButton,
              (!imageUri || loading) && styles.analyzeDisabled,
            ]}
            onPress={analyzeImage}
            disabled={!imageUri || loading}
          >
            {loading ? (
              <>
                <ActivityIndicator color="#FFFFFF" />
                <Text style={styles.analyzeText}>Analyzing leaf...</Text>
              </>
            ) : (
              <Text style={styles.analyzeText}>⌕ Detect Disease  →</Text>
            )}
          </Pressable>
        </View>

        <View style={styles.resultCard}>
          <View style={styles.resultIcon}>
            <Text style={styles.resultIconText}>✿</Text>
          </View>

          <View style={styles.resultContent}>
            <Text style={styles.resultTitle}>
              {prediction ? 'Prediction Result' : 'Your result appears here'}
            </Text>

            {prediction ? (
              <>
                <Text style={styles.diseaseName}>
                  {prediction.disease
                    .replace(/___/g, ' — ')
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (letter) => letter.toUpperCase())}
                </Text>

                <View style={styles.confidenceRow}>
                  <Text style={styles.confidenceLabel}>
                    Model confidence
                  </Text>
                  <Text style={styles.confidenceValue}>
                    {Math.max(
                      0,
                      Math.min(100, prediction.confidence * 100)
                    ).toFixed(1)}%
                  </Text>
                </View>

                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.max(
                          0,
                          Math.min(100, prediction.confidence * 100)
                        )}%`,
                      },
                    ]}
                  />
                </View>

                <View style={styles.warningBox}>
                  <Text style={styles.warningTitle}>
                    ⚠️ Please verify this prediction
                  </Text>
                  <Text style={styles.warningText}>
                    {prediction.message}
                  </Text>
                </View>

                {(() => {
                  const info = getDiseaseInfo(prediction.disease);

                  if (!info) return null;

                  return (
                    <View style={styles.diseaseDetails}>
                      <Text style={styles.detailHeading}>
                        About this condition
                      </Text>
                      <Text style={styles.detailText}>
                        {info.description}
                      </Text>

                      <Text style={styles.detailHeading}>Symptoms</Text>
                      <Text style={styles.detailText}>{info.symptoms}</Text>

                      <Text style={styles.detailHeading}>Prevention</Text>
                      <Text style={styles.detailText}>{info.prevention}</Text>

                      <Text style={styles.detailHeading}>Treatment</Text>
                      <Text style={styles.detailText}>{info.treatment}</Text>
                    </View>
                  );
                })()}
              </>
            ) : (
              <Text style={styles.resultDescription}>
                Upload a leaf photo and tap Detect Disease to see the prediction.
              </Text>
            )}
          </View>
        </View>

        <View style={styles.benefits}>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>◉</Text>
            <Text style={styles.benefitTitle}>Easy to use</Text>
          </View>

          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>✿</Text>
            <Text style={styles.benefitTitle}>Plant focused</Text>
          </View>

          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>✓</Text>
            <Text style={styles.benefitTitle}>AI assisted</Text>
          </View>
        </View>

        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Recent Scan History</Text>

          {history.length === 0 ? (
            <Text style={styles.historyEmpty}>
              No scans yet. Your saved predictions will appear here.
            </Text>
          ) : (
            history.map((item) => (
              <Pressable
                key={item.id}
                style={styles.historyItem}
                onPress={() => {
                  setImageUri(item.imageUri);
                  setPrediction({
                    disease: item.disease,
                    confidence: item.confidence,
                    needs_review: true,
                    message:
                      'This is a previously saved AI prediction, not a confirmed diagnosis. Please verify the result.',
                  });
                }}
              >
                <Image
                  source={{ uri: item.imageUri }}
                  style={styles.historyImage}
                />

                <View style={styles.historyDetails}>
                  <Text style={styles.historyDisease} numberOfLines={2}>
                    {item.disease.replace(/_/g, ' ')}
                  </Text>
                  <Text style={styles.historyText}>
                    Confidence: {(item.confidence * 100).toFixed(1)}%
                  </Text>
                  <Text style={styles.historyText}>
                    {new Date(item.date).toLocaleString()}
                  </Text>
                </View>
              </Pressable>
            ))
          )}

          {history.length > 0 && (
            <Pressable
              style={styles.clearHistoryButton}
              onPress={clearHistory}
            >
              <Text style={styles.clearHistoryText}>
                Clear Scan History
              </Text>
            </Pressable>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLeaf}>✿</Text>
          <Text style={styles.footerTitle}>GROW HEALTHIER</Text>
          <Text style={styles.footerSubtitle}>
            AI predictions are for guidance only, not a confirmed diagnosis.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7FAF7',
  },
  scrollContent: {
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  brandIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: '#DDF1E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandIconText: {
    fontSize: 30,
    color: '#12804C',
  },
  brandDetails: {
    flex: 1,
    marginLeft: 11,
  },
  brandName: {
    color: '#123D2D',
    fontSize: 27,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  brandGreen: {
    color: '#168451',
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#718278',
    marginTop: 1,
  },
  infoButton: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#E2F2E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    color: '#12804C',
    fontSize: 20,
    fontWeight: '800',
  },
  hero: {
    marginBottom: 24,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#DDF1E7',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 16,
  },
  tagText: {
    color: '#08794B',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '800',
    color: '#123D2D',
    letterSpacing: -1,
  },
  heroDescription: {
    marginTop: 11,
    color: '#6C8176',
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 315,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8F0EA',
    marginBottom: 20,
    shadowColor: '#244B35',
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  uploadArea: {
    minHeight: 280,
    borderWidth: 1.5,
    borderColor: '#B9E2CC',
    borderStyle: 'dashed',
    borderRadius: 20,
    backgroundColor: '#FAFDFB',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadAreaSelected: {
    borderStyle: 'solid',
    backgroundColor: '#F0F8F3',
  },
  uploadPlaceholder: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 8,
    width: '100%',
  },
  uploadIconCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#DDF1E7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
  },
  uploadIcon: {
    fontSize: 39,
    color: '#08794B',
  },
  uploadTitle: {
    color: '#153E30',
    fontSize: 19,
    fontWeight: '800',
    textAlign: 'center',
  },
  uploadDescription: {
    color: '#72857B',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 18,
  },
  galleryButton: {
    minHeight: 51,
    width: '90%',
    borderRadius: 28,
    backgroundColor: '#138753',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  galleryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  preview: {
    width: '100%',
    height: 280,
  },
  selectedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingTop: 12,
  },
  selectedLabel: {
    color: '#168451',
    fontSize: 12,
    fontWeight: '700',
  },
  changeText: {
    color: '#168451',
    fontSize: 12,
    fontWeight: '800',
  },
  cameraButton: {
    minHeight: 53,
    marginTop: 12,
    borderRadius: 28,
    backgroundColor: '#EEF6F0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    color: '#17563A',
    fontSize: 15,
    fontWeight: '700',
  },
  analyzeButton: {
    minHeight: 57,
    marginTop: 12,
    borderRadius: 28,
    backgroundColor: '#138753',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  analyzeDisabled: {
    backgroundColor: '#AABCB1',
  },
  analyzeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 13,
    backgroundColor: '#EDF7F0',
    borderRadius: 23,
    padding: 17,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E0EFE4',
  },
  resultIcon: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#D7EDE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultIconText: {
    color: '#08794B',
    fontSize: 25,
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    color: '#173E30',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 21,
  },
  resultDescription: {
    color: '#72857B',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  diseaseName: {
    color: '#168451',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 5,
    lineHeight: 21,
  },
  confidenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 11,
  },
  confidenceLabel: {
    color: '#72857B',
    fontSize: 11,
  },
  confidenceValue: {
    color: '#08794B',
    fontSize: 12,
    fontWeight: '800',
  },
  progressTrack: {
    height: 7,
    borderRadius: 5,
    backgroundColor: '#D5E8DA',
    overflow: 'hidden',
    marginTop: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#168451',
    borderRadius: 5,
  },
  warningBox: {
    backgroundColor: '#FFF4E5',
    borderColor: '#E8B66A',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
  },
  warningTitle: {
    color: '#7A4B00',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 5,
  },
  warningText: {
    color: '#634D2A',
    fontSize: 13,
    lineHeight: 19,
  },
  diseaseDetails: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#D5E8DA',
  },
  detailHeading: {
    color: '#126B45',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 4,
  },
  detailText: {
    color: '#536E60',
    fontSize: 12,
    lineHeight: 19,
  },
  benefits: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 26,
  },
  benefitItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  benefitIcon: {
    color: '#13764A',
    fontSize: 23,
  },
  benefitTitle: {
    color: '#536E60',
    fontSize: 10,
    fontWeight: '700',
  },
  historyContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#183D2B',
    marginBottom: 14,
  },
  historyEmpty: {
    color: '#68756D',
    fontSize: 14,
    lineHeight: 21,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EEE9',
  },
  historyImage: {
    width: 76,
    height: 76,
    borderRadius: 10,
    backgroundColor: '#E7F0E9',
  },
  historyDetails: {
    flex: 1,
    marginLeft: 12,
  },
  historyDisease: {
    fontSize: 15,
    fontWeight: '700',
    color: '#183D2B',
    marginBottom: 5,
  },
  historyText: {
    fontSize: 12,
    color: '#68756D',
    marginTop: 3,
  },
  clearHistoryButton: {
    backgroundColor: '#FCE8E6',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  clearHistoryText: {
    color: '#B42318',
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 5,
  },
  footerLeaf: {
    color: '#168451',
    fontSize: 22,
  },
  footerTitle: {
    color: '#168451',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 3,
    marginTop: 7,
  },
  footerSubtitle: {
    color: '#8A9A90',
    fontSize: 10,
    lineHeight: 16,
    marginTop: 5,
    textAlign: 'center',
  },
});
