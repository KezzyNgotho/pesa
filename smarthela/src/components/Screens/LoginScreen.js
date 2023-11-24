import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // User logged in successfully, you can navigate to the dashboard or any other screen here
      navigation.navigate('Main');
    } catch (error) {
      console.error('Login Error:', error);
      // Handle login error, you can implement error messages here
    }
  };

  const handleForgotPassword = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      // Password reset email sent successfully, you can show a confirmation message
    } catch (error) {
      console.error('Password Reset Error:', error);
      // Handle password reset error, you can implement error messages here
    }
  };

  const handleRegister = () => {
    // You can navigate to the registration screen or any other screen for user registration
    navigation.navigate('Registration');
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.header}>Login</Text>
      <Input
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        labelStyle={styles.label}
      />
      <Input
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        labelStyle={styles.label}
      />
      <Button title="Login" onPress={handleLogin} buttonStyle={styles.button} />
      <Button
        title="Forgot Password"
        onPress={handleForgotPassword}
        type="clear"
        titleStyle={styles.forgotPasswordButton}
      />
      <Button
        title="Don't have an account? Register"
        onPress={handleRegister}
        type="clear"
        titleStyle={styles.registerButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#007bff', // Customize label text color
  },
  button: {
    backgroundColor: '#007bff', // Customize button background color
    marginTop: 10,
  },
  forgotPasswordButton: {
    color: '#007bff', // Customize button text color
    fontWeight: 'bold',
  },
  registerButton: {
    color: '#007bff', // Customize button text color
    fontWeight: 'bold',
  },
});

export default LoginScreen;
