import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import ExpenseModal from '../ExpenseModal';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import { Card } from 'react-native-elements';

/* const ExpenseItem = ({ item }) => (
  <Card containerStyle={styles.expenseCard}>
    <Card.Title style={styles.title}>{item.description}</Card.Title>
    <Card.Divider />
    <Text style={styles.category}>Category: {item.category}</Text>
    <Text style={styles.amount}>Amount: ${item.amount.toFixed(2)}</Text>
    <Text style={styles.date}>Date: {new Date(item.date).toLocaleDateString()}</Text>
  </Card>
); */
const ExpenseItem = ({ item, onEdit, onDelete }) => (
  <Card containerStyle={styles.expenseCard}>
    <View style={styles.expenseContent}>
      <Text style={styles.title}>{item.description}</Text>
      <Text style={styles.category}>Category: {item.category}</Text>
      <Text style={styles.amount}>Amount: ${item.amount.toFixed(2)}</Text>
      <Text style={styles.date}>
        Date: {new Date(item.date).toLocaleDateString()}
      </Text>
    </View>
    <View style={styles.editDeleteButtons}>
      <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item)}>
        <Image
          source={require('../assets/icons8-pencil-30.png')} // Specify the correct path to your Edit button image
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item)}>
        <Image
          source={require('../assets/icons8-trash-32.png')} // Specify the correct path to your Delete button image
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
    </View>
  </Card>
);



/* 
const ExpenseList = ({ expenses, onEdit, onDelete }) => ( */
const ExpenseList = ({ expenses, editExpense }) => (
  <View style={styles.expenseList}>
    <Text style={styles.listTitle}>Expense List</Text>
    {expenses.map((expense, index) => (
      <ExpenseItem key={index} item={expense} onEdit={editExpense} />
    ))}
  </View>
);
const categories = ['Food', 'Transportation', 'Housing', 'Utilities', 'Entertainment', 'Other'];

const MoneyManagementScreen = () => {
  const [budget, setBudget] = useState(1000);
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Food');
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showSearchInputs, setShowSearchInputs] = useState(false);
  const [isSearchModalVisible, setSearchModalVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirmDate = (selectedDate) => {
    if (selectedDate) {
      setExpenseDate(selectedDate);
    }
    hideDatePicker();
  };

  const addExpense = () => {
    if (expenseDescription && expenseAmount) {
      const newExpense = {
        id: expenses.length + 1,
        description: expenseDescription,
        amount: parseFloat(expenseAmount),
        category: expenseCategory,
        date: expenseDate.toISOString(),
      };
      setExpenses([...expenses, newExpense]);
      setTotalExpenses(totalExpenses + newExpense.amount);
      setExpenseDescription('');
      setExpenseAmount('');
      setModalVisible(false);
    }
  };

  const clearAllExpenses = () => {
    setExpenses([]);
    setTotalExpenses(0);
  };
  const [editingExpense, setEditingExpense] = useState(null);

  const editExpense = (expense) => {
    setEditingExpense(expense);
    setModalVisible(true);
  };
const handleSearchExpenses = () => {
  // Create a filteredExpenses array to store the filtered results
 
  setShowSearchInputs(true);
    setSearchModalVisible(true);

 let filteredExpenses = [...expenses];

  if (searchText) {
    filteredExpenses = filteredExpenses.filter((expense) =>
      expense.description.includes(searchText)
    );
  }

  if (selectedCategory !== 'All') {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === selectedCategory
    );
  }

  if (minAmount) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.amount >= parseFloat(minAmount)
    );
  }

  if (maxAmount) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.amount <= parseFloat(maxAmount)
    );
  }

  setExpenses(filteredExpenses);
};
const handleApplySearch = () => {
  // Create a copy of the original expenses array to filter
  let filteredExpenses = [...expenses];

  // Filter by search text if it's not empty
  if (searchText) {
    filteredExpenses = filteredExpenses.filter((expense) =>
      expense.description.includes(searchText)
    );
  }

  // Filter by category if it's not "All"
  if (selectedCategory !== 'All') {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === selectedCategory
    );
  }

  // Filter by min amount if it's not empty
  if (minAmount) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.amount >= parseFloat(minAmount)
    );
  }

  // Filter by max amount if it's not empty
  if (maxAmount) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.amount <= parseFloat(maxAmount)
    );
  }

  // Update the expenses state with the filtered results
  setExpenses(filteredExpenses);

  // Close the modal when everything is set
  setSearchModalVisible(false);
};

  const updateExpense = () => {
    // Implement logic to update the selected expense
    // Find the expense in the expenses array and update its properties
    // Then setEditingExpense(null) to exit editing mode
    // Remember to handle validation and error cases
  };

  const deleteExpense = () => {
    // Implement logic to delete the selected expense
    // Find the expense in the expenses array and remove it
    // Then setEditingExpense(null) to exit editing mode
    // Remember to handle confirmation and error cases
  };

  useEffect(() => {
    // Implement a useEffect hook to update the chart data whenever expenses change
    // Calculate and update the chart data here
    // You may want to use a library like react-native-chart-kit to create charts
  }, [expenses]);

  const [searchText, setSearchText] = useState('');
const [selectedCategory, setSelectedCategory] = useState('All');
const [minAmount, setMinAmount] = useState('');
const [maxAmount, setMaxAmount] = useState('');

// Implement filtering logic for expenses
const filteredExpenses = expenses.filter((expense) => {
    const matchesSearchText = expense.description.includes(searchText);
    const matchesCategory = selectedCategory === 'All' || expense.category === selectedCategory;
    const matchesAmountRange =
      (!minAmount || expense.amount >= parseFloat(minAmount)) &&
      (!maxAmount || expense.amount <= parseFloat(maxAmount));
    return matchesSearchText && matchesCategory && matchesAmountRange;
  });
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
  <Text style={styles.title}>Money Management</Text>
  <TouchableOpacity style={styles.iconButton} onPress={handleSearchExpenses}>
    <Image
      source={require('../assets/icons8-search-50.png')} // Replace with the correct path to your icon image
      style={styles.iconImage1}
    />
  </TouchableOpacity>
</View>

      <Card containerStyle={styles.budgetCard}>
        <Card.Title>Your Budget</Card.Title>
        <Card.Divider />
      <TextInput
          style={styles.budgetInput}
          keyboardType="numeric"
          placeholder="Enter your budget"
          value={budget.toString()}
          onChangeText={(text) => setBudget(parseFloat(text))}
        />
      </Card>
    

      <Modal
        animationType="slide"
        transparent={true}
        visible={isSearchModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Search Expenses</Text>
            <View style={styles.searchInputsContainer}>
              {/* Search input */}
              <Text style={styles.label}>Search expenses:</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search expenses..."
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
              />

              {/* Category picker */}
              
          <Text style={styles.label}>Category:</Text>

              <View style={styles.pickerContainer}>
  <Picker
    selectedValue={selectedCategory}
    onValueChange={(value) => setSelectedCategory(value)}
    style={styles.pickerInput}
  >
    <Picker.Item label="All" value="All" />
    {categories.map((category) => (
      <Picker.Item key={category} label={category} value={category} />
    ))}
  </Picker>
</View>


              {/* Min and Max amount inputs */}
              <View style={styles.amountInputsContainer}>
                
        {/*   <Text style={styles.label}>Min Amount:</Text> */}

        <View style={styles.inputContainer}>
  <Text style={styles.label}>Min Amount:</Text>
  <TextInput
    style={styles.amountInput}
    placeholder="Min Amount"
    value={minAmount}
    onChangeText={(text) => setMinAmount(text)}
    keyboardType="numeric"
  />
</View>


     
     
<View style={styles.inputContainer}>
          <Text style={styles.label}>Max Amount:</Text>

                <TextInput
                  style={styles.amountInput}
                  placeholder="Max Amount"
                  value={maxAmount}
                  onChangeText={(text) => setMaxAmount(text)}
                  keyboardType="numeric"
                />
              </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.applySearchButton}
              onPress={handleApplySearch}
            >
              <Text style={styles.applySearchButtonText}>Apply Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.headerContainer}>
 
    

 {/*  <ExpenseList expenses={filteredExpenses} editExpense={editExpense} deleteExpense={deleteExpense} />
   */}
</View>


  <ExpenseList expenses={filteredExpenses} editExpense={editExpense} deleteExpense={deleteExpense} />


      {/* <ExpenseList
      
        expenses={expenses}
        editExpense={editExpense}
        deleteExpense={deleteExpense}
      /> */}
      <Card containerStyle={styles.expenseCard}>
        <Card.Title>Total Expenses</Card.Title>
        <Card.Divider />
        <Text style={styles.totalExpenses}>${totalExpenses.toFixed(2)}</Text>
      </Card>

      <Card containerStyle={styles.clearButtonCard}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonLabel}>Add Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearAllExpenses}
        >
          <Text style={styles.clearButtonText}>Clear All Expenses</Text>
        </TouchableOpacity>
      </View>
    </Card>

      <Text style={styles.chartTitle}>Expense Chart</Text>
      {/* Add your LineChart component here */}
      <ExpenseModal
      isVisible={isModalVisible}
      closeModal={() => setModalVisible(false)}
      expenseDescription={expenseDescription}
      setExpenseDescription={setExpenseDescription}
      expenseAmount={expenseAmount}
      setExpenseAmount={setExpenseAmount}
      expenseCategory={expenseCategory}
      setExpenseCategory={setExpenseCategory}
      showDatePicker={showDatePicker}
      addExpense={addExpense}
      hideDatePicker={hideDatePicker}
      expenseDate={expenseDate}
      handleConfirmDate={handleConfirmDate}
    />

    {isDatePickerVisible && (
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={expenseDate}
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
    )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row', // To align the text and icon horizontally
    alignItems: 'center', 
    marginRight:180,// To vertically center align them
  },

  iconButton: {
    marginLeft: 10, // To add spacing between the text and icon
  },
  iconImage1: {
    width: 34, // Adjust the width and height as needed
    height: 34,
  },
  iconButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft:170, // Add any desired spacing
  },
  
  iconImage: {
    width: 40, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    resizeMode: 'contain', // You can choose how the image should be resized
  },
 searchButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchInputsContainer: {
    marginTop: 20,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
 /*  picker: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    fontSize: 16,
    marginVertical: 10,
  }, */
  pickerContainer: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    overflow: 'hidden', // Hide the default dropdown indicator
  },
  pickerInput: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    color: 'black',
  },
  
  amountInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
   },

  editDeleteButtons: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginLeft: 10, 
  },
  editButton: {
    backgroundColor: 'transparent', 
    marginRight: 10,
  
  },
  deleteButton: {
    backgroundColor: 'transparent',
    marginLeft:180, // Transparent background
  },
  buttonIcon: {
    width: 30,
    height: 30, 
    resizeMode: 'contain', 
  },
 
  cardContainer: {
    backgroundColor: '#ffffff', 
    borderRadius: 8, 
    padding: 16, 
    marginHorizontal: 16, 
    marginTop: 8,
    marginBottom: 16, 
    shadowColor: 'rgba(0, 0, 0, 0.1)', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5, 
    shadowRadius: 4, 
    elevation: 4, 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#007BFF', // Primary color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8, // Rounded corners
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 12, 
    borderRadius: 8, 
  },
  clearButtonText: {
    color: 'white', 

fontSize: 16, 
    fontWeight: 'bold', 
    textAlign: 'center', 
  },
  
  addButtonLabel1: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseCard: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection:'row'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
   color:"black",
  },
  category: {
    fontSize: 16,
    color: 'black',
    fontWeight:'bold',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5, 
  },
  date: {
    fontSize: 14,
    color: 'black',
    fontWeight:"bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30, // Increased padding
    borderRadius: 10,
    width: '90%', // Increased width
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  searchInputsContainer: {
    marginBottom: 20,
  },
  searchInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  picker: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
  },
  amountInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height:60,
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 12,
    marginRight: 10, // Space between Min Amount and Max Amount
    height:190,
  },
  applySearchButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  applySearchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  cancelButton: {
    backgroundColor: 'red',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    marginLeft: 10,
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
 /*  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"black",
    alignSelf:'center',
  }, */
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
    color:"black",
  },
  budgetInput: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 8,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'green'
  },
  expenseList: {
    marginTop: 20,
    marginBottom: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalExpenses: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'black',
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color:"green",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  expenseDescriptionInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8, // Rounded corners
    padding: 12,
    marginBottom: 20, // Increased spacing
  },
  expenseAmountInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8, // Rounded corners
    padding: 12,
    marginBottom: 20, // Increased spacing
  },
  categoryPicker: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
    justifyContent: 'space-between', // Space between the icon and the expense list
    marginBottom: 10, // Add any desired spacing
  },
  
});

export default MoneyManagementScreen;
