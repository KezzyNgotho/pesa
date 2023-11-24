import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert, // Import Alert for error handling
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';

const BudgetTrackingScreen = () => {
  const [budget, setBudget] = useState(1000);
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Food');
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirmDate = (date) => {
    setExpenseDate(date);
    hideDatePicker();
  };

  const addExpense = () => {
    try {
      if (expenseDescription && expenseAmount) {
        const newExpense = {
          description: expenseDescription,
          amount: parseFloat(expenseAmount),
          category: expenseCategory,
          date: expenseDate.toISOString(),
        };
        setExpenses([...expenses, newExpense]);
        setTotalExpenses(totalExpenses + newExpense.amount);
        setExpenseDescription('');
        setExpenseAmount('');
      } else {
        Alert.alert('Validation Error', 'Please enter a description and amount.');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      Alert.alert('Error', 'An error occurred while adding the expense.');
    }
  };

  const clearAllExpenses = () => {
    try {
      setExpenses([]);
      setTotalExpenses(0);
    } catch (error) {
      console.error('Error clearing expenses:', error);
      Alert.alert('Error', 'An error occurred while clearing expenses.');
    }
  };

 /*  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    decimalPlaces: 2,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  }; */

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget Tracking</Text>
      <View style={styles.budgetContainer}>
        <Text style={styles.label}>Your Budget:</Text>
        <TextInput
          style={styles.budgetInput}
          keyboardType="numeric"
          placeholder="Enter your budget"
          value={budget.toString()}
          onChangeText={(text) => setBudget(parseFloat(text))}
        />
      </View>
      <View style={styles.expenseForm}>
        <TextInput
          style={styles.expenseDescriptionInput}
          placeholder="Expense description"
          value={expenseDescription}
          onChangeText={(text) => setExpenseDescription(text)}
        />
        <TextInput
          style={styles.expenseAmountInput}
          keyboardType="numeric"
          placeholder="Amount"
          value={expenseAmount}
          onChangeText={(text) => setExpenseAmount(text)}
        />
        <Picker
          selectedValue={expenseCategory}
          style={styles.categoryPicker}
          onValueChange={(itemValue) => setExpenseCategory(itemValue)}
        >
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Transportation" value="Transportation" />
          <Picker.Item label="Entertainment" value="Entertainment" />
          <Picker.Item label="Utilities" value="Utilities" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={styles.datePickerText}>Select Date</Text>
        </TouchableOpacity>
      </View>
      <Button title="Add Expense" onPress={addExpense} />
      <ScrollView style={styles.expenseList}>
        {expenses.map((expense, index) => (
          <View key={index} style={styles.expenseItem}>
            <Text>{expense.description}:</Text>
            <Text>${expense.amount.toFixed(2)}</Text>
            <Text>Category: {expense.category}</Text>
            <Text>Date: {new Date(expense.date).toLocaleDateString()}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.totalExpenses}>
          Total Expenses: ${totalExpenses.toFixed(2)}
        </Text>
        <Button title="Clear All Expenses" onPress={clearAllExpenses} />
      </View>
     {/*  <Text style={styles.chartTitle}>Expense Chart</Text> */}
     {/*  <LineChart
        data={{
          labels: expenses.map((expense) =>
            new Date(expense.date).toLocaleDateString()
          ),
          datasets: [
            {
              data: expenses.map((expense) => expense.amount),
            },
          ],
        }}
        width={300}
        height={200}
        yAxisSuffix="$"
        yAxisInterval={1}
        chartConfig={chartConfig}
      />
 */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  budgetInput: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
  },
  expenseForm: {
    marginBottom: 20,
  },
  expenseDescriptionInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  expenseAmountInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  categoryPicker: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 10,
  },
  expenseList: {
    maxHeight: 200,
    marginBottom: 20,
  },
  expenseItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default BudgetTrackingScreen;
