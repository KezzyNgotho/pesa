import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction History</Text>
      {/* Display recent transactions here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  // Add styles for transaction items as needed
});

export default TransactionHistoryScreen;
