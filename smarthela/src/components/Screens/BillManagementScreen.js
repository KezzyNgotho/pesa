import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image
} from 'react-native';
import { Card, ListItem, Icon, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'; 

const BillManagementScreen = () => {
  const [bills, setBills] = useState([]);
  const [newBill, setNewBill] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [editingBillIndex, setEditingBillIndex] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showAddBillForm, setShowAddBillForm] = useState(false);

  const navigation = useNavigation(); // Get the navigation object

  const addBill = () => {
    if (newBill.trim() === '' || dueDate.trim() === '') return;

    if (editingBillIndex !== null) {
      // Update existing bill
      const updatedBills = [...bills];
      updatedBills[editingBillIndex] = {
        name: newBill,
        dueDate,
        isRecurring,
        paid: bills[editingBillIndex].paid,
      };
      setBills(updatedBills);
      setEditingBillIndex(null);
    } else {
      // Add a new bill
      setBills([
        ...bills,
        {
          name: newBill,
          dueDate,
          isRecurring,
          paid: false,
        },
      ]);
    }

    setNewBill('');
    setDueDate('');
    setIsRecurring(false);
    setShowAddBillForm(false);
  };

  const editBill = (index) => {
    const billToEdit = bills[index];
    setNewBill(billToEdit.name);
    setDueDate(billToEdit.dueDate);
    setIsRecurring(billToEdit.isRecurring);
    setEditingBillIndex(index);
    setShowAddBillForm(true);
  };

  const deleteBill = (index) => {
    const updatedBills = [...bills];
    updatedBills.splice(index, 1);
    setBills(updatedBills);
  };

  const makePayment = (index) => {
    setShowPaymentForm(true);
    setPaymentAmount('');
  };

  const confirmPayment = (index) => {
    const updatedBills = [...bills];
    updatedBills[index].paid = true;
    setBills(updatedBills);
    setShowPaymentForm(false);
  };

  return (
    <View style={styles.container}>
  <View style={styles.headerContainer}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Image
      source={require('../assets/icons8-back-50.png')}
      style={styles.backButton}
    />
  </TouchableOpacity>
  <Text style={styles.header}>My Bills</Text>
</View>


<FlatList
  data={bills}
  renderItem={({ item, index }) => (
    <Card containerStyle={styles.cardContainer}>
      <Card.Title style={styles.billName}>{item.name}</Card.Title>
      <Text style={styles.label}>Due Date</Text>
      <Text style={styles.dueDate}>Due Date: {item.dueDate}</Text>
      <Text style={styles.recurringText}>
        {item.isRecurring ? 'Recurring' : 'One-time'}
      </Text>
      <Text style={item.paid ? styles.paidText : styles.unpaidText}>
        {item.paid ? 'Paid' : 'Unpaid'}
      </Text>
      <Divider style={styles.divider} />
      <View style={styles.actionsContainer}>
        {!item.paid && (
          <Button
            title="Make Payment"
            onPress={() => makePayment(index)}
            buttonStyle={styles.paymentButton}
            titleStyle={styles.paymentButtonText}
          />
        )}
        {showPaymentForm && (
          <Card containerStyle={styles.paymentCard}>
            <Text style={styles.label}>Payment Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the payment amount"
              value={paymentAmount}
              onChangeText={(text) => setPaymentAmount(text)}
            />
            <Button
              title="Confirm Payment"
              onPress={() => confirmPayment(index)}
              buttonStyle={styles.confirmPaymentButton}
              titleStyle={styles.confirmPaymentButtonText}
            />
          </Card>
        )}
       <TouchableOpacity onPress={() => editBill(index)}>
  <Image source={require('../assets/icons8-pencil-30.png')} style={styles.editImage} />
</TouchableOpacity>
<TouchableOpacity onPress={() => deleteBill(index)}>
  <Image source={require('../assets/icons8-trash-32.png')} style={styles.deleteImage} />
</TouchableOpacity>
      </View>
    </Card>
  )}
  keyExtractor={(item, index) => index.toString()}
/>
 {!showAddBillForm ? (
       <Card containerStyle={styles.addButtonCard}>
       <Button
         title="Add a new bill"
         onPress={() => setShowAddBillForm(true)}
         buttonStyle={styles.addButton}
         titleStyle={styles.addButtonTitle}
       />
     </Card>
     
      ) : (
        <Card containerStyle={styles.cardContainer}>
        
        <Text style={styles.label}>Bill Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the bill name"
          value={newBill}
          onChangeText={(text) => setNewBill(text)}
        />
        <Text style={styles.label}>Due Date</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the due date (e.g., MM/DD/YYYY)"
          value={dueDate}
          onChangeText={(text) => setDueDate(text)}
        />
        <View style={styles.switchContainer}>
          <Text style={styles.recurringText}>Recurring Bill</Text>
          <Switch
            value={isRecurring}
            onValueChange={(value) => setIsRecurring(value)}
          />
          
        </View>
        <View style={styles.buttonRow}>
  <TouchableOpacity
    style={editingBillIndex !== null ? styles.saveButton : styles.addButton}
    onPress={addBill}
    underlayColor={editingBillIndex !== null ? '#4CAF50' : '#007AFF'}
  >
    <Text style={styles.addButtonText}>
      {editingBillIndex !== null ? 'Save' : 'Add'}
    </Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={styles.closeButton}
    onPress={() => setShowAddBillForm(false)}
    underlayColor="red"
  >
    <Text style={styles.addButtonText}>Close</Text>
  </TouchableOpacity>
</View>
      </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    marginRight: 76, // Adjust the margin as needed
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    flex: 1,
    padding: 16,
  },
 
  cardContainer: {
    borderRadius: 10,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color:'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentCard: {
    marginTop: 10,
    padding: 10,
  },
  addButton: {
    backgroundColor: '#007AFF', // Blue color, you can change it to your desired color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  closeButton: {
    backgroundColor: 'red', // Red color, you can change it to your desired color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  saveButton: {
    backgroundColor: '#4CAF50', // Green color, you can change it to your desired color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  makePaymentButton: {
    backgroundColor: '#FFD700', // Gold color, you can change it to your desired color
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  makePaymentButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },

  confirmPaymentButton: {
    backgroundColor: '#4CAF50', // Green color, you can change it to your desired color
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  confirmPaymentButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  recurringText:{
    fontSize:16,
    fontWeight:'bold',
    color:"black"
  }
  ,addButtonCard: {
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#fff', // Change the background color as needed
    marginBottom: 16,
  },

  addButton: {
    backgroundColor: '#007BFF', // Change the button's background color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },

  addButtonTitle: {
    color: '#fff', // Change the button's text color
  },
});


export default BillManagementScreen;
