
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function ChatbotScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<
    { id: number; text: string; sender: 'user' | 'bot' }[]
  >([
    {
      id: 1,
      text: 'Hello! 🌿 I am your Plant Care Assistant. Ask me about plant diseases, symptoms, or prevention.',
      sender: 'bot',
    },
  ]);

  function sendMessage() {
    const question = message.trim();
    if (!question) return;

    setMessages((previous) => [
      ...previous,
      { id: Date.now(), text: question, sender: 'user' },
      {
        id: Date.now() + 1,
        text: 'Thanks for your question! This chatbot interface is ready, but AI responses are not connected yet. Please consult a plant expert for disease diagnosis.',
        sender: 'bot',
      },
    ]);
    setMessage('');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.title}>🌱 AI Plant Assistant</Text>
        <Text style={styles.subtitle}>
          Ask questions about plant health
        </Text>
      </View>

      <ScrollView
        style={styles.chat}
        contentContainerStyle={styles.chatContent}
      >
        {messages.map((item) => (
          <View
            key={item.id}
            style={[
              styles.bubble,
              item.sender === 'user'
                ? styles.userBubble
                : styles.botBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                item.sender === 'user' && styles.userText,
              ]}
            >
              {item.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Ask about plant diseases..."
          placeholderTextColor="#888"
          multiline
        />
        <Pressable style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8F1',
  },
  header: {
    paddingTop: 55,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#246B45',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#E1F2E5',
    fontSize: 14,
    marginTop: 6,
  },
  chat: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    gap: 12,
  },
  bubble: {
    maxWidth: '88%',
    padding: 13,
    borderRadius: 16,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#246B45',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#24352A',
  },
  userText: {
    color: '#FFFFFF',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    gap: 8,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    maxHeight: 100,
    minHeight: 45,
    borderWidth: 1,
    borderColor: '#D5E0D5',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#24352A',
  },
  sendButton: {
    backgroundColor: '#246B45',
    borderRadius: 12,
    paddingHorizontal: 17,
    paddingVertical: 14,
  },
  sendText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
