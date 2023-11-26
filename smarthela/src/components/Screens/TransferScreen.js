import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Card, Title, TextInput as PaperInput, Button, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import firebase from '../firebase';

const theme = {
  ...DefaultTheme,
  fonts: {
    regular: 'System',
    medium: 'System',
    light: 'System',
    thin: 'System',
  },
};

const TransferScreen = () => {
  const [isFromChecking, setIsFromChecking] = useState(true);
  const [amount, setAmount] = useState('');
  const [checkingBalance, setCheckingBalance] = useState(0);
  const [savingsBalance, setSavingsBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
  
    // Fetch checking account balance
    const unsubscribeChecking = db.collection('totals')
      .doc('checking')
      .onSnapshot((doc) => {
        if (doc.exists) {
          const checkingAccountData = doc.data();
          setCheckingBalance(checkingAccountData.amount || 0);
        } else {
          console.error('Checking account document does not exist.');
        }
      });
  
    // Fetch savings account balance
    const unsubscribeSavings = db.collection('totals')
      .doc('savings')
      .onSnapshot((doc) => {
        if (doc.exists) {
          const savingsAccountData = doc.data();
          setSavingsBalance(savingsAccountData.amount || 0);
        } else {
          console.error('Savings account document does not exist.');
        }
      });
  
    return () => {
      unsubscribeChecking();
      unsubscribeSavings();
    };
  }, []);
  

  const handleTransfer = async () => {
    const transferAmount = parseFloat(amount);

    if (isNaN(transferAmount) || transferAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid transfer amount.');
      return;
    }

    const fromAccount = isFromChecking ? 'checking' : 'savings';
    const toAccount = isFromChecking ? 'savings' : 'checking';

    if (transferAmount > (isFromChecking ? checkingBalance : savingsBalance)) {
      Alert.alert('Insufficient Balance', 'Transfer amount exceeds available balance.');
      return;
    }

    try {
      setLoading(true);

      // Simulate a network request delay
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay of 2 seconds

      // Update balances
      const userId = firebase.auth().currentUser.uid;
      const db = firebase.firestore();

      const fromAccountRef = db.collection('totals').doc(fromAccount);
      const toAccountRef = db.collection('totals').doc(toAccount);

      const fromAccountData = await fromAccountRef.get();
      const toAccountData = await toAccountRef.get();

      const newFromAccountBalance = fromAccountData.data().amount - transferAmount;
      const newToAccountBalance = toAccountData.data().amount + transferAmount;

      await fromAccountRef.update({ amount: newFromAccountBalance });
      await toAccountRef.update({ amount: newToAccountBalance });

      // Display success message
      Alert.alert(
        'Transfer Successful',
        `You have successfully transferred $${transferAmount.toFixed(2)} from ${fromAccount} to ${toAccount}.`
      );

      // Clear the input field
      setAmount('');
    } catch (error) {
      console.error('Error during transfer:', error);
      Alert.alert('Error', 'An error occurred during the transfer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.header}>Transfer Money</Title>
            <View style={styles.selectionContainer}>
              <Text style={styles.selectionLabel}>Transfer From:</Text>
              <View style={styles.radioButtons}>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => setIsFromChecking(true)}
                >
                  <Text style={isFromChecking ? styles.radioButtonTextActive : styles.radioButtonText}>
                    Checking
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => setIsFromChecking(false)}
                >
                  <Text style={!isFromChecking ? styles.radioButtonTextActive : styles.radioButtonText}>
                    Savings
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.balanceLabel}>
              Balance: Ksh
              
              
              
              {isFromChecking ? checkingBalance.toFixed(2) : savingsBalance.toFixed(2)}
            </Text>
            <PaperInput
              style={styles.input}
              label="Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
            <Button mode="contained" style={styles.button} onPress={handleTransfer} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : 'Transfer'}
            </Button>
          </Card.Content>
        </Card>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    margin: 10,
    elevation: 5,
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    alignSelf: 'center',
  },
  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectionLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  radioButtons: {
    flexDirection: 'row',
  },
  radioButton: {
    marginRight: 20,
  },
  radioButtonText: {
    fontSize: 18,
    color: '#333',
  },
  radioButtonTextActive: {
    fontSize: 18,
    color: '#071952',
    fontWeight: 'bold',
  },
  balanceLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#00a86b',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
  },
});

export default TransferScreen;
