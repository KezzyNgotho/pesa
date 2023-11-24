import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const transactionHistoryData = [
  // Replace with your transaction history data
  {
    id: '1',
    date: '2023-09-01',
    description: 'Purchase at Store A',
    amount: '$50.00',
  },
  {
    id: '2',
    date: '2023-09-05',
    description: 'Online Payment',
    amount: '$30.00',
  },
  {
    id: '3',
    date: '2023-08-10',
    description: 'Grocery Shopping',
    amount: '$75.00',
  },
  {
    id: '4',
    date: '2023-08-05',
    description: 'Utility Bill Payment',
    amount: '$100.00',
  },
  // Add more transaction entries here
];

// Function to format a date string to Month Year (e.g., "September 2023")
const formatDateToMonthYear = (dateString) => {
  const options = { year: 'numeric', month: 'long' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Function to add initials to a string
const addInitials = (string) => {
  const words = string.split(' ');
  return words.map((word) => word[0].toUpperCase()).join('');
};

// Function to group transactions by month
const groupTransactionsByMonth = (transactions) => {
  const groupedTransactions = {};

  transactions.forEach((transaction) => {
    const monthYear = formatDateToMonthYear(transaction.date);

    if (!groupedTransactions[monthYear]) {
      groupedTransactions[monthYear] = [];
    }

    groupedTransactions[monthYear].push(transaction);
  });

  return groupedTransactions;
};

const TransactionHistoryScreen = () => {
  const groupedTransactions = groupTransactionsByMonth(transactionHistoryData);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction History</Text>
      {Object.entries(groupedTransactions).map(([monthYear, transactions]) => (
        <View key={monthYear}>
          <Text style={styles.monthYear}>{monthYear}</Text>
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.transactionItem}>
                <Text style={styles.initials}>{addInitials(item.description)}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.amount}>{item.amount}</Text>
              </View>
            )}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Background color
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
    fontWeight:"bold", 
  },
  monthYear: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Border color
    paddingVertical: 8,
  },
  
  initials: {
    fontSize: 14,
    backgroundColor: 'purple',
    marginRight: 8,
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 20,
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Text color
  },
  description: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: 'black',
    fontWeight:'normal' // Text color
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green', // Amount color
  },
});

export default TransactionHistoryScreen;
