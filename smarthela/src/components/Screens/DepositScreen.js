import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity ,Image} from 'react-native';
import { TextInput, Button,  } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import firebase from '../firebase';

const DepositScreen = () => {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('savings'); // Default to savings

  /* const handleDeposit = () => {
    // You would implement the logic here to deposit money
    // to the selected bank account from M-Pesa using an API call.

    // For this example, we'll just display a message.
    alert(`Depositing ${amount} KES to the ${selectedAccount} account from ${phoneNumber}`);
  };
 */
  const handleDeposit = () => {
    const user = firebase.auth().currentUser;
  
    if (user) {
      const db = firebase.firestore();
      const depositsCollection = db.collection('accountOverview');
      const transactionsCollection = db.collection('transactions');
      const totalsCollection = db.collection('totals'); // Create a reference to the "totals" collection
  
      const depositData = {
        userId: user.uid,
        amount: parseFloat(amount),
        phoneNumber,
        accountType: selectedAccount,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
  
      depositsCollection
        .add(depositData)
        .then(() => {
          setAmount('');
          setPhoneNumber('');
          setSelectedAccount('savings');
  
          // Record the deposit in the transactions collection
          transactionsCollection
            .add({
              ...depositData,
              type: 'deposit',
            })
            .then(() => {
              alert(`Depositing ${amount} KES to the ${selectedAccount} account from ${phoneNumber}`);
            })
            .catch((error) => {
              console.error('Error recording deposit in transactions:', error);
            });
  
          // Retrieve the current total amount for the selected account type
          totalsCollection
            .doc(selectedAccount) // Use the account type as the document ID
            .get()
            .then((doc) => {
              const currentTotal = doc.exists ? doc.data().amount : 0;
              const newTotal = currentTotal + parseFloat(amount);
  
              // Update the total amount for the selected account type in Firestore
              totalsCollection
                .doc(selectedAccount)
                .set({ amount: newTotal })
                .then(() => {
                  console.log(`Total amount for ${selectedAccount} updated successfully.`);
                })
                .catch((error) => {
                  console.error(`Error updating total amount for ${selectedAccount}:`, error);
                });
            })
            .catch((error) => {
              console.error(`Error retrieving current total amount for ${selectedAccount}:`, error);
            });
        })
        .catch((error) => {
          console.error('Error saving deposit:', error);
        });
    } else {
      alert('User not authenticated. Please log in.');
    };
  };
  
  const handleBackPress = () => {
    // Implement your navigation logic to go back
    // For example, you can use navigation.goBack() if you are using React Navigation
    // This is just a placeholder
    alert('Go back');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.headerRow}>
    <TouchableOpacity onPress={handleBackPress}>
          <Image source={require('../assets/icons8-back-50.png')} style={styles.backButtonImage} />
        </TouchableOpacity>
        <Text style={styles.header}>Deposit Money</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Enter Amount (KES):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />

        <Text style={styles.label}>Enter M-Pesa Phone Number:</Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />

<View style={styles.inputContainer}>
  <Text style={styles.label}>Select Bank Account:</Text>
  <Picker
    selectedValue={selectedAccount}
    onValueChange={(itemValue) => setSelectedAccount(itemValue)}
    style={styles.picker}
  >
    <Picker.Item label="Savings Account" value="savings" />
    <Picker.Item label="Checking Account" value="checking" />
  </Picker>
</View>

<Button
  mode="contained"
  style={styles.button}
  onPress={handleDeposit}
>
  Deposit Money
</Button>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      backButtonImage: {
        width: 20, // Set the width of the image
        height: 20, // Set the height of the image
        marginRight: 70,
      },
      header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        fontFamily: 'Roboto',
      },

    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 16,
        paddingHorizontal: 8,
      },
      
      label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
      },
      
      picker: {
        height: 40,
        fontSize: 16,
      },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
 
  formContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    marginBottom: 16,
    backgroundColor:'transparent'
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff', // Background color of the button
    borderRadius: 5, // Border radius of the button
    height: 40, // Height of the button
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 16, // Font size of the text
  },
});

export default DepositScreen;