import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import userImage from '../assets/icons8-user-24.png'; // Replace with your user image path
import botImage from '../assets/icons8-chipping-24.png';   // Replace with your bot image path


// Create a reusable Message component
// Create a reusable Message component
// Create a reusable Message component
const Message = ({ text, isUser, imageSource }) => (
  <View
    style={[
      styles.messageContainer,
      isUser ? styles.userMessage : styles.botMessage,
    ]}
  >
    {imageSource && <Image source={imageSource} style={styles.messageImage} />}
    <Text style={styles.messageText}>{text}</Text>
  </View>
);


// Create a reusable FAQItem component
const FAQItem = ({ item }) => (
  <View style={styles.faqItem}>
    <Image source={require('../assets/icons8-question-48.png')} style={styles.faqIcon} />
    <View>
      <Text style={styles.faqQuestion}>{item.question}</Text>
      <Text style={styles.faqAnswer}>{item.answer}</Text>
    </View>
  </View>
);

const CustomerSupportScreen = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showFAQs, setShowFAQs] = useState(false);
  const [faqList, setFaqList] = useState([]);

  useEffect(() => {
    // Simulate loading FAQs from a server
    setTimeout(() => {
      setFaqList([
        { id: '1', question: 'How do I reset my password?', answer: 'You can reset your password by visiting the "Forgot Password" page and following the instructions.' },
        { id: '2', question: 'What are the supported devices?', answer: 'Our app supports both iOS and Android devices.' },
        { id: '3', question: 'How can I update my email address?', answer: 'To update your email address, go to your profile settings and select the option to change your email.' },
      ]);
    }, 2000); // Simulated delay
  }, []);

  const handleSendMessage = () => {
    if (chatInput.trim() === '') {
      return;
    }

    // Simulate sending a message to a chatbot
    const newChat = [...chatHistory, { text: chatInput, isUser: true }];
    setChatHistory(newChat);
    setChatInput('');

    // In a real implementation, you would send the user's message to the chatbot API and handle the response.
    // You can use libraries like Dialogflow or Microsoft Bot Framework for chatbot integration.
    // For simplicity, we'll just simulate a chatbot response.
    setTimeout(() => {
      const botResponse = 'Thank you for your message. How can i help you.';
      const updatedChat = [...newChat, { text: botResponse, isUser: false }];
      setChatHistory(updatedChat);
    }, 1000); // Simulated delay for bot response
  };

  const toggleFAQs = () => {
    setShowFAQs(!showFAQs);
  };

  const handleContactSupport = () => {
    // In a real implementation, you would implement a way to contact customer support.
    // This could involve sending an email or using a customer support platform's API.
    // For simplicity, we'll just show a message here.
    alert('Contacting customer support...');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Customer Support</Text>

      {/* Chatbot interface */}
      <View style={styles.chatContainer}>
        {/* Chat messages */}
        <FlatList
  data={chatHistory}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <Message
      text={item.text}
      isUser={item.isUser}
      imageSource={item.isUser ? userImage : botImage}
    />
  )}
/>


        {/* Message input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={chatInput}
            onChangeText={(text) => setChatInput(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Image source={require('../assets/icons8-send-button-48.png')} style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Help Center */}
      {showFAQs && (
        <View style={styles.faqContainer}>
          <Text style={styles.faqTitle}>
            <Image source={require('../assets/icons8-info-48.png')} style={styles.faqIcon} /> Frequently Asked Questions
          </Text>
          <FlatList
            data={faqList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <FAQItem item={item} />}
          />
        </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.toggleFAQsButton} onPress={toggleFAQs}>
          <Text style={styles.buttonText}>
            {showFAQs ? 'Hide FAQs' : 'Show FAQs'}
          </Text>
          <Image source={require('../assets/icons8-chevron-100.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactSupportButton} onPress={handleContactSupport}>
          <Text style={styles.buttonText}>Contact Support</Text>
          <Image source={require('../assets/icons8-headset-48.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Colors = {
  primary: '#C5DFF8',       // Primary color for buttons and user messages
  secondary: '#EDE4FF',     // Secondary color for the send button and toggle button
  background: '#f0f0f0',    // Background color for the chat container
  text: '#333',             // Text color for messages and FAQ items
  white: '#fff',            // White background color for input container and FAQ container
  gray: '#ccc',             // Gray color for borders and dividers
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'black',
   
  },
  chatContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  messageContainer: {
    maxWidth: '70%',
    padding: 8,
    margin: 4,
    borderRadius: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.secondary,
  },
  messageText: {
    color:'black',
    fontWeight:'bold'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#F8E8EE',
    padding: 8,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
  sendButton: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 100,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  faqContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.text,
  },
  faqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  faqIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 8,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  faqAnswer: {
    fontSize: 14,
    marginTop: 4,
    color: Colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggleFAQsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    padding: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  buttonText: {
    color: Colors.text,
    marginRight: 8,
    fontWeight:"bold"
  },
  buttonIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  contactSupportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 8,
    flex: 1,
  },
});


export default CustomerSupportScreen;
