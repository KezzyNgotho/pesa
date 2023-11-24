import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; 

const MoneyTransferScreen = () => {
  const modules = [
    { name: 'Send Money', image: require('../assets/airtel.png'), section: 'Send' },
    { name: 'M-Pesa to My Account', image: require('../assets/icons8-mpesa-48.png'), section: 'Send' },
    { name: 'Other Accounts', image: require('../assets/otheraccount.png'), section: 'Send' },
    { name: 'Pesalink', image: require('../assets/pesalink-logo-1200x800.jpg'), section: 'Send' },
    
    { name: 'SWIFT', image: require('../assets/swift.png'), section: 'Send' },
    { name: 'RTGS', image: require('../assets/rtgs.jpeg'), section: 'Send' },
    { name: 'Cardless Withdrawal', image: require('../assets/Cardless.png'), section: 'Withdraw' },
    { name: 'Receive Money from M-Pesa', image: require('../assets/icons8-mpesa-48.png'), section: 'Receive' },
    { name: 'Buy M-Pesa Float', image: require('../assets/Lipa-na-mpesa.png'), section: 'Receive' },
    { name: 'Airtel to My Account', image: require('../assets/airtel.png'), section: 'Receive' },
    // Add more modules as needed
  ];

  // Filter modules by section
  const sendModules = modules.filter((module) => module.section === 'Send');
  const receiveModules = modules.filter((module) => module.section === 'Receive');
  const withdrawModules = modules.filter((module) => module.section === 'Withdraw');
  const navigation = useNavigation(); 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Money Transfer</Text>

      <View>
        <Text style={styles.sectionHeader}>Send Money</Text>
        <View style={styles.cardContainer}>
          {sendModules.map((module, index) => (
            <TouchableOpacity style={styles.card} key={index}>
              <Card style={styles.cardContent}>
                
                <Image source={module.image} style={styles.cardImage} />
                <Text style={styles.cardText}>{module.name}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View>
        <Text style={styles.sectionHeader}>Receive Money</Text>
        <View style={styles.cardContainer}>
          {receiveModules.map((module, index) => (
            <TouchableOpacity style={styles.card} key={index}
            onPress={() => {
              if (module.name === 'Buy M-Pesa Float') {
                navigation.navigate('SendMoney'); // Navigate to SendMoneyScreen
              } else if (module.name === 'Receive Money from M-Pesa') {
                navigation.navigate('ReceiveMoney'); // Navigate to ReceiveMoneyScreen
              } else if  (module.name === 'Airtel to My Account') {
                navigation.navigate('ReceiveAirtelMoney'); // Navigate to ReceiveMoneyScreen
              } 
            }}
            >
              <Card style={styles.cardContent}>
                <Image source={module.image} style={styles.cardImage} />
                <Text style={styles.cardText}>{module.name}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View>
        <Text style={styles.sectionHeader}>Withdraw Money</Text>
        <View style={styles.cardContainer}>
          {withdrawModules.map((module, index) => (
            <TouchableOpacity style={styles.card} key={index}>
              <Card style={styles.cardContent}>
                <Image source={module.image} style={styles.cardImage} />
                <Text style={styles.cardText}>{module.name}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '30%',
    marginBottom: 20,
  },
  cardContent: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5, // Add border radius to the cards
  },
  cardImage: {
    width: 36,
    height: 36,
    marginBottom: 5,
  },
  cardText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
});

export default MoneyTransferScreen;
