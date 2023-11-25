import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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

const RechargeScreen = () => {
  const [isMyNumber, setIsMyNumber] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [checkingBalance, setCheckingBalance] = useState(0);
  const [userAccounts, setUserAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');

  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    const db = firebase.firestore();

    // Fetch user's phone number
    db.collection('users')
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          if (userData && userData.phone) {
            setUserPhoneNumber(userData.phone);
          } else {
            console.error('User data does not contain "phone".');
          }
        } else {
          console.error('User document does not exist.');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });

    // Fetch checking account balance
    db.collection('totals')
      .doc('checking')
      .get()
      .then((doc) => {
        if (doc.exists) {
          const checkingAccountData = doc.data();
          setCheckingBalance(checkingAccountData.amount || 0);
        } else {
          console.error('Checking account document does not exist.');
        }
      })
      .catch((error) => {
        console.error('Error fetching checking account balance:', error);
      });

    // Fetch user's accounts
    db.collection('users')
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          if (userData && userData.accountNumber) {
            setUserAccounts((prevState) => [
              ...prevState,
              { value: userData.accountNumber, label: 'Account Number' },
            ]);
          } else {
            console.error('User data does not contain "accountNumber".');
          }
        } else {
          console.error('User document does not exist.');
        }
      })
      .catch((error) => {
        console.error('Error fetching user accounts:', error);
      });
  }, []);

  const handleRecharge = async () => {
    const rechargeAmount = parseFloat(amount);

    if (isNaN(rechargeAmount) || rechargeAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid recharge amount.');
      return;
    }

    if (rechargeAmount > checkingBalance) {
      Alert.alert('Insufficient Balance', 'Recharge amount exceeds available balance.');
      return;
    }

    try {
      // Simulate a network request delay
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay of 2 seconds

      // Record the transaction
      const userId = firebase.auth().currentUser.uid;
      const db = firebase.firestore();
      const transactionsCollectionRef = db.collection('transactions');
      const transactionData = {
        userId,
        recipientNumber: isMyNumber ? userPhoneNumber : phoneNumber,
        amount: rechargeAmount,
        currency: 'Airtime', // Change this based on your currency
        reason: 'Airtime Recharge',
        accountType: 'checking',
        type: 'recharge',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      await transactionsCollectionRef.add(transactionData);

      // Update checking account balance
      const newCheckingBalance = checkingBalance - rechargeAmount;
      const checkingAccountRef = db.collection('totals').doc('checking');
      await checkingAccountRef.update({ amount: newCheckingBalance });

      // Display success message
      const recipient = isMyNumber ? 'your number' : phoneNumber;
      Alert.alert('Recharge Successful', `You have successfully recharged ${amount} for ${recipient}.`);

      // Clear the input fields
      setPhoneNumber('');
      setAmount('');
    } catch (error) {
      console.error('Error during recharge:', error);
      Alert.alert('Error', 'An error occurred during the recharge.');
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.header}>Recharge Airtime</Title>
            <View style={styles.selectionContainer}>
              <Text style={styles.selectionLabel}>Select Recipient:</Text>
              <View style={styles.radioButtons}>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => setIsMyNumber(true)}
                >
                  <Text style={isMyNumber ? styles.radioButtonTextActive : styles.radioButtonText}>
                    My Number
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => setIsMyNumber(false)}
                >
                  <Text style={!isMyNumber ? styles.radioButtonTextActive : styles.radioButtonText}>
                    Others
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {isMyNumber ? (
              <Text style={styles.phoneNumber}>Your Phone Number: {userPhoneNumber}</Text>
            ) : (
              <PaperInput
                style={styles.input}
                label="Recipient's Number"
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
              />
            )}
            <View style={styles.pickerContainer}>
     {/*          <Text style={styles.pickerLabel}>Account to Debit*</Text> */}
              <Picker
                selectedValue={selectedAccount}
                onValueChange={(itemValue) => setSelectedAccount(itemValue)}
                style={styles.picker}
              >
                {userAccounts.map((account, index) => (
                  <Picker.Item label={account.label} value={account.value} key={index} />
                ))}
              </Picker>
            </View>
            <PaperInput
              style={styles.input}
              label="Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
            <Button mode="contained" style={styles.button} onPress={handleRecharge}>
              Recharge
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
    margin: 1,
    elevation: 1,
    borderRadius: 1,
    backgroundColor:'transparent'
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
  phoneNumber: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  picker: {
    height: 40,
    width: '100%',
    color: '#333',
  },
  button: {
    backgroundColor: '#00a86b',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
  },
});

export default RechargeScreen;
