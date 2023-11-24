import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';


const MpesaScreen = () => {
  const [isMyNumber, setIsMyNumber] = useState(true);
  const [recipientNumber, setRecipientNumber] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [reason, setReason] = useState('');

  const handleTransfer = () => {
    // Implement your transfer logic here
    // You can use the isMyNumber, recipientNumber, selectedAccount, amount, currency, and reason variables
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Airtel Money services</Text>
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
      {isMyNumber ? null : (
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
          <Picker.Item label="Account A" value="Account A" />
          <Picker.Item label="Account B" value="Account B" />
        </Picker>
      </View>

      
      <View style={styles.row}>
        <TextInput
          label="Currency*"
          value={currency}
          onChangeText={(text) => setCurrency(text)}
          style={[styles.input, styles.currencyInput]} // Apply the custom style
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
    alignSelf:'center'
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
    backgroundColor:'transparent',
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
    flex: 1, // Allow Currency input to expand and take available space
    marginRight: 10,
  },
});

export default MpesaScreen;
