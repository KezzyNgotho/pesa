import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AccountOverviewScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account Overview</Text>
      {/* Display user accounts and balances here */}
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
    fontSize: 24,
    marginBottom: 20,
    color: '#333', // Text color
  },
  // Customize styles for account items and balances as needed
});

export default AccountOverviewScreen;
