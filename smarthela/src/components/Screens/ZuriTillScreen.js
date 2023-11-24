import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Button, TextInput, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; 
import Modal from 'react-native-modal';
import firebase from '../firebase';

const ZuriTillScreen = () => {
  const [zuriTillNumber, setZuriTillNumber] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentReason, setPaymentReason] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [feedback, setFeedback] = useState('');
  const [checkingAmount, setCheckingAmount] = useState(null);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const navigation = useNavigation(); 
  // Initialize Firebase (ensure you've set up Firebase configuration)
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userRef = firebase.firestore().collection('users').doc(user.uid);
        userRef.get().then(doc => {
          if (doc.exists) {
            const userData = doc.data();
            setAccountNumber(userData.accountNumber);
          } else {
            console.error('User data not found');
          }
        });
      }
    });

    const checkingAccountRef = firebase.firestore().collection('totals').doc('checking');
    checkingAccountRef.get().then(doc => {
      if (doc.exists) {
        setCheckingAmount(doc.data().amount);
      } else {
        console.error('Checking account document not found in totals collection.');
      }
    });
  }, []);

  const handleBack = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };

  const handleCancel = () => {
    setPaymentAmount('');
    setPaymentReason('');
    setFeedback('');
  };

  const handlePay = async () => {
    const parsedPaymentAmount = parseInt(paymentAmount);

    if (isNaN(parsedPaymentAmount) || parsedPaymentAmount <= 0) {
      setFeedback('Payment amount should be a positive integer.');
      return;
    }

    if (checkingAmount !== null && parsedPaymentAmount <= checkingAmount) {
      const updatedTotal = checkingAmount - parsedPaymentAmount;

      const checkingAccountRef = firebase.firestore().collection('totals').doc('checking');
      checkingAccountRef.update({ amount: updatedTotal });

      const transactionsRef = firebase.firestore().collection('transactions');

      const transactionData = {
        type: 'Payment',
        tillNumber: zuriTillNumber,
        amount: parsedPaymentAmount,
        reason: paymentReason,
        date: new Date(),
      };

      transactionsRef.add(transactionData);

      setFeedback('');
      setIsSuccessModalVisible(true);
    } else {
      // Display a warning using an alert
      Alert.alert('Warning', 'Payment amount exceeds the available balance.');
    }
  };

  const clearInputFields = () => {
    setPaymentAmount('');
    setPaymentReason('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Image
            source={require('../assets/icons8-back-50.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.titlehead}>Zuri Till Payment</Text>
        <TouchableOpacity onPress={handleCancel}>
          <Image
            source={require('../assets/icons8-cancel-24.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Card elevation={1} style={styles.card}>
        <TextInput
          label="Zuri Till Number"
          placeholder="Enter Zuri Till Number"
          value={zuriTillNumber}
          onChangeText={text => setZuriTillNumber(text)}
          style={styles.textInput}
        />
        <TextInput
          label="Payment Amount"
          placeholder="Enter Payment Amount"
          value={paymentAmount}
          onChangeText={text => setPaymentAmount(text)}
          keyboardType="numeric"
          style={styles.textInput}
        />
        <TextInput
          label="Payment Reason (Optional)"
          placeholder="Enter Payment Reason"
          value={paymentReason}
          onChangeText={text => setPaymentReason(text)}
          style={styles.textInput}
        />
        <TextInput
          label="Account Number"
          placeholder="Account Number"
          value={accountNumber}
          style={styles.textInput}
          editable={false}
        />
        <Button
          mode="contained"
          onPress={handlePay}
          style={styles.payButton}
          labelStyle={styles.buttonTitle}
        >
          Pay
        </Button>
        {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

        {/* Success Modal */}
        <Modal isVisible={isSuccessModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Payment Successful</Text>
            <Button
              mode="contained"
              onPress={() => {
                setIsSuccessModalVisible(false);
                clearInputFields();
              }}
            >
              OK
            </Button>
          </View>
        </Modal>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  titlehead:{
color:"green",
fontSize:18,
fontWeight:'bold'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
  },
  card: {
    padding: 29,
    borderRadius: 1,
    marginTop: 20,
    backgroundColor: 'white',
  },
  textInput: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
  payButton: {
    marginTop: 20,
    borderRadius: 10,
  },
  buttonTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  feedback: {
    marginTop: 10,
    color: 'red',
    fontSize: 16,
  },
});

export default ZuriTillScreen;
