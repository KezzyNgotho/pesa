import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,Modal,Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
/* import firebase from '../firebase'; */
import firebase  from '../firebase'
import backButtonImage from '../assets/icons8-back-50.png';
import cancelButtonImage from '../assets/icons8-cancel-24.png';
import registerButtonImage from '../assets/icons8-done-94.png'
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [registrationBranch, setRegistrationBranch] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const navigation = useNavigation(); // Initialize navigation
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const handleLogin  = () => {
    // You can navigate to the registration screen or any other screen for user registration
    navigation.navigate('Login');
  };

  const SuccessModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSuccessModalVisible}
        onRequestClose={() => {
          setSuccessModalVisible(false);
          // Navigate to the Login screen here
          // Example: navigation.navigate('Login');
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Registration Successful!</Text>
            <TouchableOpacity
              onPress={() => {
                setSuccessModalVisible(false);
                // Navigate to the Login screen here
                // Example: navigation.navigate('Login');
              }}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Go to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  
  const handleBack = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };

  const handleCancel = () => {
    // Clear form fields and navigate back to the previous screen
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setAccountNumber('');
    setRegistrationBranch('');
    setGender('');
    setDateOfBirth('');
    navigation.goBack(); // Navigate back
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (selectedDate) => {
    setDateOfBirth(selectedDate.toISOString().split('T')[0]);
    hideDatePicker();
  };

  const handleRegistration = async () => {
    try {
      // Create a new user with email and password
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Once the user is created, you can store additional user information in Firestore
      const user = firebase.auth().currentUser;

      await firebase.firestore().collection('users').doc(user.uid).set({
        name,
        email,
        phone,
        accountNumber,
        registrationBranch,
        gender,
        dateOfBirth,
      });

      // Registration successful
      Alert.alert(
        'Registration Successful',
        'Your registration was successful. You can now log in.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login'); // Navigate to the Login screen
            },
          },
        ]
      );
    } catch (error) {
      console.error('Registration Error:', error);
      // Handle registration error, you can implement error messages here
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBack}>
          <Image source={backButtonImage} style={styles.buttonImage} />
        </TouchableOpacity>
        <Text style={styles.header}>User Registration</Text>
        <TouchableOpacity onPress={handleCancel}>
          <Image source={cancelButtonImage} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
      <TextInput
        label="Full Name*"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
        theme={{
          colors: {
            text: 'red', // Text color
            primary: 'green', // Label color when focused
          },
        }}
      />
      <TextInput
        label="Email*"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        theme={{
          colors: {
            text: 'red', // Text color
            primary: 'green', // Label color when focused
          },
        }}
      />
      <TextInput
        label="Phone Number*"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        style={styles.input}
        keyboardType="phone-pad"
        theme={{
          colors: {
            text: 'red', // Text color
            primary: 'green', // Label color when focused
          },
        }}
      />
      <TextInput
        label="Password*"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        secureTextEntry
        theme={{
          colors: {
            text: 'red', // Text color
            primary: 'green', // Label color when focused
          },
        }}
      />
      <TextInput
        label="Account Number*"
        value={accountNumber}
        onChangeText={(text) => setAccountNumber(text)}
        style={styles.input}
        keyboardType="numeric"
        theme={{
          colors: {
            text: 'red', // Text color
            primary: 'green', // Label color when focused
          },
        }}
      />
      <TextInput
        label="Registration Branch*"
        value={registrationBranch}
        onChangeText={(text) => setRegistrationBranch(text)}
        style={styles.input}
        theme={{
          colors: {
            text: 'black', // Text color
            primary: 'green', // Label color when focused
          },
        }}
      />
      <TextInput
        label="Gender*"
        value={gender}
        onChangeText={(text) => setGender(text)}
        style={styles.input}
        theme={{
          colors: {
            text: 'red', // Text color
            primary: 'green', // Label color when focused
          },
        }}
      />
      <View style={styles.datePicker}>
        <TouchableOpacity onPress={showDatePicker}>
          <TextInput
            label="Select Date*"
            value={dateOfBirth}
            style={styles.dateInput}
            editable={false} // Prevent manual input
            theme={{
              colors: {
                text: 'red', // Text color
                primary: 'green', // Label color when focused
              },
            }}
          />
        </TouchableOpacity>
      </View>
      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegistration}>
        <Text style={styles.registerButtontext}>Register</Text>
        <Image source={registerButtonImage} style={styles.buttonImage} />
      </TouchableOpacity>
    
      <SuccessModal />
      <Button
        title="Already have an account? Login"
        onPress={handleLogin}
        type="clear"
        titleStyle={styles.registerButton1}
      />
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  successModal: {
    backgroundColor: 'pink',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  successModalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeModalText: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
  },
  
  dateInput: {
    marginBottom: 10, // Reduced margin for better spacing
    backgroundColor: 'transparent', // Remove background color
    borderBottomWidth: 0.7, // Add border bottom
    borderBottomColor: 'black', // Border color
    marginHorizontal: 5, // Horizontal margin
  },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff', // Set background color
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonImage: {
    width: 30, // Set the width of your image
    height: 30, // Set the height of your image
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderBottomWidth: 0.7,
    borderBottomColor: 'black',
    marginHorizontal: 5,
  },
  datePicker: {
    marginBottom: 10,
  },
  dateInput: {
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderBottomWidth: 0.7,
    borderBottomColor: 'black',
    marginHorizontal: 5,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  registerButtontext:
  {
    fontSize:20,
    fontWeight:"bold",
    color:'white',
    marginRight:20,
  },
  registerButton1: {
    color: '#007bff', // Customize button text color
    fontWeight: 'bold',
  },
});


export default RegistrationScreen;

