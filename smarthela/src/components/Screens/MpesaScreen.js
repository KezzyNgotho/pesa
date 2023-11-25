import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import firebase from '../firebase';

// ... (imports)

const MpesaScreen = () => {
  const [isMyNumber, setIsMyNumber] = useState(true);
  const [recipientNumber, setRecipientNumber] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [reason, setReason] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [userAccounts, setUserAccounts] = useState([]);

  useEffect(() => {
    // Fetch user's accounts and phone number from Firebase
    const userId = firebase.auth().currentUser.uid;
    const db = firebase.firestore();

    db.collection('users')
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          console.log('userData:', userData);

          if (userData && userData.phone) {
            const phone = userData.phone;
            setUserPhoneNumber(phone);
          } else {
            console.error('User data does not contain "phone".');
          }

          if (userData && userData.accountNumber) {
            const accountNumber = userData.accountNumber;
            setUserAccounts((prevState) => [...prevState, { value: accountNumber, label: 'Account Number' }]);
          } else {
            console.error('User data does not contain "accountNumber".');
          }
        } else {
          console.error('User document does not exist.');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleTransfer = async () => {
    const transferAmount = parseFloat(amount);
  
    if (isNaN(transferAmount) || transferAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid transfer amount.');
      return;
    }
  
    const userId = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
    const checkingAccountRef = db.collection('totals').doc('checking');
  
    try {
      await db.runTransaction(async (transaction) => {
        const checkingAccountDoc = await transaction.get(checkingAccountRef);
        if (!checkingAccountDoc.exists) {
          Alert.alert('Error', 'Checking account document not found in totals collection.');
          return;
        }
  
        const checkingAccountData = checkingAccountDoc.data();
        const currentBalance = checkingAccountData.amount;
  
        if (transferAmount > currentBalance) {
          Alert.alert('Insufficient Balance', 'Transfer amount exceeds available balance.');
          return;
        }
  
        // ...
  
        setTimeout(() => {
          Alert.alert('Success', 'Transfer completed successfully.', [
            {
              text: 'OK',
              onPress: () => {
                // Clear the form fields after success
                setRecipientNumber('');
                setSelectedAccount('');
                setAmount('');
                setCurrency('');
                setReason('');
              },
            },
          ]);
        }, 0); // Delayed to allow state updates to complete
      });
    } catch (error) {
      console.error('Error during transaction:', error);
      Alert.alert('Error', 'An error occurred during the transaction.');
    }
  };
  


  return (
    <View style={styles.container}>
      <Text style={styles.header}>M-Pesa Transfer</Text>
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
              Other Number
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {isMyNumber ? (
        <Text style={styles.phoneNumber}>Your Phone Number: {userPhoneNumber}</Text>
      ) : (
        <TextInput
          label="Recipient's Number*"
          value={recipientNumber}
          onChangeText={(text) => setRecipientNumber(text)}
          style={styles.input}
          keyboardType="phone-pad"
          theme={{
            colors: {
              text: '#00a86b',
              primary: '#00a86b',
            },
          }}
        />
      )}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Account to Debit*</Text>
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
      <View style={styles.row}>
        <TextInput
          label="Currency*"
          value={currency}
          onChangeText={(text) => setCurrency(text)}
          style={[styles.input, styles.currencyInput]}
          theme={{
            colors: {
              text: '#00a86b',
              primary: '#00a86b',
            },
          }}
        />
        <TextInput
          label="Amount*"
          value={amount}
          onChangeText={(text) => setAmount(text)}
          style={[styles.input, styles.reasonInput]}
          keyboardType="numeric"
          theme={{
            colors: {
              text: '#00a86b',
              primary: '#00a86b',
            },
          }}
        />
      </View>
      <TextInput
        label="Reason (Optional)"
        value={reason}
        onChangeText={(text) => setReason(text)}
        style={styles.input}
        theme={{
          colors: {
            text: '#00a86b',
            primary: '#26577C',
          },
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleTransfer}>
        <Text style={styles.buttonText}>Transfer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#071952',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  pickerLabel: {
    fontSize: 18,
    color: '#333',
    paddingLeft: 10,
  },
  picker: {
    height: 40,
    color: '#333',
  },

  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
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
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  reasonInput: {
    flex: 1,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00a86b',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  currencyInput: {
    flex: 1,
    marginRight: 10,
  },
});

export default MpesaScreen;
