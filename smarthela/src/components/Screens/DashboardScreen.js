import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform,Image,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';
import { Card } from 'react-native-elements';
import firebase from '../firebase';

const DashboardScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
 
  const fetchUserData = async () => {
    try {
      const userId = firebase.auth().currentUser.uid;
      const userDoc = await firebase.firestore().collection('users').doc(userId).get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        setUserData(userData);
      } else {
        console.error('User data not found.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const fetchAccountOverview = async () => {
    try {
      const userId = firebase.auth().currentUser.uid;
      const totalsCollection = await firebase
        .firestore()
        .collection('totals'); // Reference the "totals" collection
  
      // Retrieve all documents in the "totals" collection
      const querySnapshot = await totalsCollection.get();
  
      if (!querySnapshot.empty) {
        // Initialize an array to store account overview data
        const accountOverview = [];
  
        querySnapshot.forEach((doc) => {
          const accountType = doc.id; // Document ID is the account type
          const amount = doc.data().amount;
  
          // Convert amount to a formatted string if necessary
          const balance = `KSH ${amount.toFixed(2)}`;
  
          // Create an account overview object for each account type
          const accountTypeOverview = {
            accountName: accountType,
            balance,
            visible: true,
          };
  
          accountOverview.push(accountTypeOverview);
        });
  
        // Update the state with the aggregated data
        setAccountOverview(accountOverview);
      } else {
        console.error('No account totals found in the "totals" collection.');
      }
    } catch (error) {
      console.error('Error fetching account overview data:', error);
    }
  };
  
  
 const fetchTransactionHistory = async () => {
  try {
    const userId = firebase.auth().currentUser.uid;
    const transactionsCollection = await firebase
      .firestore()
      .collection('transactions') // Replace with the correct collection name for transactions
      .where('userId', '==', userId) // Assuming you have a 'userId' field in your transactions
      .get();

    const transactionHistory = transactionsCollection.docs.map((doc) => {
      const data = doc.data();
      const timestamp = data.timestamp; // Assuming 'timestamp' is the field name in Firestore
      const date = timestamp ? timestamp.toDate() : null;
      const dateString = date ? date.toISOString().split('T')[0] : '';
      return {
        date: dateString,// Convert timestamp to ISO date string// Convert timestamp to ISO date string // Convert timestamp to ISO date string
        description: data.type, // Assuming 'type' in Firebase corresponds to 'description'
        amount: `KSH ${parseFloat(data.amount).toFixed(2)}`,
      };
    });
    console.log('Fetched transaction history:', transactionHistory);
    setTransactionHistory(transactionHistory);
  } catch (error) {
    console.error('Error fetching transaction history:', error);
  }
};


  useEffect(() => {
    fetchUserData();
    fetchAccountOverview();
    fetchTransactionHistory();
  }, []);


  // Demo account overview data
  /* const [accountOverview, setAccountOverview] = useState([
    { accountName: 'Checking Account', balance: '$5,000', visible: true },
    { accountName: 'Savings Account', balance: '$10,000', visible: true },
    { accountName: 'Credit Card', balance: '$-2,000', visible: true },
  ]);

 */
  const [accountOverview, setAccountOverview] = useState([]);
  
  // Demo transaction history data
 
  /*   { date: '2023-09-03', description: 'ATM Withdrawal', amount: '$100.00' }, */
    // Add more transactions as needed
  
  const [transactionHistory, setTransactionHistory] = useState([])
    /* { date: '2023-09-01', description: 'Purchase at Store A', amount: '$50.00' },
    { date: '2023-09-02', description: 'Online Payment', amount: '$25.00' },
    // Add more transactions as needed
  ]);
 */
  // State to control visibility of view transactions section
  const [showTransactions, setShowTransactions] = useState(false);

const [showRecentTransactions, setShowRecentTransactions] = useState(false);
const [showAllTransactions, setShowAllTransactions] = useState(false);

  const [showTransactionCard, setShowTransactionCard] = useState(false); // State for the Transaction Card

// Function to toggle the visibility of recent transactions
const toggleRecentTransactions = () => {
  setShowRecentTransactions(!showRecentTransactions);
  setShowAllTransactions(false); // Hide "All Transactions" when showing recent transactions
};

// Function to toggle the visibility of all transactions
const toggleAllTransactions = () => {
  setShowAllTransactions(!showAllTransactions);
  setShowRecentTransactions(false); // Hide "Recent Transactions" when showing all transactions
};
const toggleBalanceVisibility = (index) => {
  // Create a copy of the account overview array
  const updatedAccountOverview = [...accountOverview];
  // Toggle the visibility of the selected account's balance
  updatedAccountOverview[index].visible = !updatedAccountOverview[index].visible;
  // Update the state with the modified array
  setAccountOverview(updatedAccountOverview);
};
  const renderAccountOverview = () => {
    return accountOverview.map((account, index) => (
      <View key={index} style={styles.accountItem}>
      <View style={styles.column}>
        <Text style={styles.accountName}>{account.accountName}</Text>
        {account.visible && <Text style={styles.balance}>Balance: {account.balance}</Text>}
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => toggleBalanceVisibility(index)} style={styles.eyeIconContainer}>
          <Image
            source={account.visible ? require('../assets/icons8-eye-32.png') : require('../assets/icons8-invisible-32.png')}
            alt="Eye Icon"
            width={20}
            height={20}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
    

    ));
  };

  return (
    <ScrollView style={styles.container}>
    <View style={styles.header}>
    <View style={styles.userInfo}>
          <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
            <Text style={styles.userInitials}>{userData?.initials}</Text>
          </TouchableOpacity>
          <Text style={styles.greeting}>Hi, {userData?.name}</Text>
        </View>
  <View style={styles.rightTopContainer}>
    <TouchableOpacity
      style={styles.notificationIcon}
      onPress={() => navigation.navigate('Notifications')}>
      {/* <Icon
        name="bell-outline"
        size={24}
        color="#333"
      /> */}
      <Image source={require('../assets/icons8-bell-48.png')} style={{ width: 30, height: 30 }} />
    </TouchableOpacity>
    <View style={styles.qrCodeContainer}>
      <QRCode value="Your QR code data here" size={30} />
    </View>
  </View>
</View>

      {/* Account Overview */}
      <Card>
        <Text style={styles.cardHeader}>Account Overview</Text>
        {renderAccountOverview()}
      </Card>
      <TouchableOpacity
      style={styles.textInputButton}
      onPress={() => setShowTransactionCard(!showTransactionCard)}
    >
      <View style={styles.row}>
      <Text style={styles.buttonText1}>
          {showTransactionCard ? 'Close Transactions' : 'View Transactions'}
        </Text>
        <Image
          source={showTransactionCard ? require('../assets/icons8-view-48.png') : require('../assets/icons8-eye-64.png')}
          style={styles.serviceIcon} // Set the image style, e.g., width and height
        />
       
      </View>
    </TouchableOpacity>

      {/* Transaction History */}
     {/* Transaction Card */}
     {showTransactionCard && (
        <View style={styles.transactionCard}>
          {/* Close button to hide the Transaction Card */}
         

          {/* Transaction Card Content */}
          <View style={styles.viewTransactionsCard}>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.sectionTitleButton}
                onPress={() => {
                  setShowRecentTransactions(true);
                  setShowAllTransactions(false);
                }}
              >
                <Text style={styles.sectionTitle}>Recent Transactions</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sectionTitleButton}
                onPress={() => {
                  setShowRecentTransactions(false);
                  setShowAllTransactions(true);
                }}
              >
                <Text style={styles.sectionTitle}>All Transactions</Text>
              </TouchableOpacity>
            </View>

            {/* Conditional rendering of Recent Transactions */}
            {showRecentTransactions && (
              <View style={styles.transactionSection}>
                {transactionHistory.map((transaction, index) => (
                  <View key={index} style={styles.transactionItem}>
                    <Text style={styles.date}>{transaction.date}</Text>
                    <Text style={styles.description}>{transaction.description}</Text>
                    <Text style={styles.amount}>{transaction.amount}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Conditional rendering of All Transactions */}
            {showAllTransactions && (
              <View style={styles.transactionSection}>
                {/* Input field for filtering */}
                <TextInput
                  style={styles.filterInput}
                  placeholder="Filter Transactions"
                  onChangeText={(text) => {
                    // Handle filtering logic based on the input text
                  }}
                />

                {transactionHistory.map((transaction, index) => (
                  <View key={index} style={styles.transactionItem}>
                    <Text style={styles.date}>{transaction.date}</Text>
                    <Text style={styles.description}>{transaction.description}</Text>
                    <Text style={styles.amount}>{transaction.amount}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      )}
  {/* Financial Services */}
  <Card containerStyle={styles.card}>
  <View style={styles.cardHeaderContainer}>
    <Text style={styles.cardHeader}>Financial Services</Text>
  </View>
  <View style={styles.financialServicesContent}>
    {/* Row 1 */}
    <View style={styles.row}>
      {/* MPESA */}
      <TouchableOpacity
        style={styles.serviceItem}
        onPress={() => navigation.navigate('Mpesa')}>
        <Image source={require('../assets/icons8-mpesa-48.png')} style={styles.serviceIcon} />
        <Text style={styles.serviceText}>MPESA</Text>
      </TouchableOpacity>

      {/* Airtel */}
      <TouchableOpacity
        style={styles.serviceItem}
        onPress={() => navigation.navigate('Airtel')}>
        <Image source={require('../assets/airtel.png')} style={styles.serviceIcon} />
        <Text style={styles.serviceText}>Airtel</Text>
      </TouchableOpacity>

      {/* Pesalink */}
      <TouchableOpacity
        style={styles.serviceItem}
        onPress={() => {
          // Handle Pesalink service action here
        }}>
        <Image source={require('../assets/pesalink-logo-1200x800.jpg')} style={styles.serviceIcon} />
        <Text style={styles.serviceText}>Pesalink</Text>
      </TouchableOpacity>
    </View>

    {/* Row 2 */}
    <View style={styles.row}>
      {/* International Transfer */}
     {/*  <TouchableOpacity
        style={styles.serviceItem}
        onPress={() => {
          // Handle International Transfer service action here
        }}>
        <Image source={require('../assets/international.jpg')} style={styles.serviceIcon} />
        <Text style={styles.serviceText}>International Transfer</Text>
      </TouchableOpacity>
 */}
      {/* Transfer to Other Account */}
      <TouchableOpacity
        style={styles.serviceItem}
        onPress={() => navigation.navigate('Transfer')}>
         <Image source={require('../assets/imagesyu.png')} style={styles.serviceIcon} />
        <Text style={styles.serviceText}>To my Account</Text>
      </TouchableOpacity>
      

      {/* Placeholder for the third item in Row 2 */}
      <TouchableOpacity
        style={styles.serviceItem}
        onPress={() => navigation.navigate('Support')}>
        <Image source={require('../assets/otheraccount.png')} style={styles.serviceIcon} />
        <Text style={styles.serviceText}>To Other Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.serviceItem}
        onPress={() => navigation.navigate('Support')}>
        <Image source={require('../assets/icons8-support-40.png')} style={styles.serviceIcon} />
        <Text style={styles.serviceText}>Support</Text>
      </TouchableOpacity>
      </View>
  {/*     <View style={styles.placeholder}></View>
      */} 
    </View>
     {/* Row 3 */}
    {/*  <View style={styles.row}>
      
      <TouchableOpacity
        style={styles.serviceItem}
        onPress={() => navigation.navigate('Support')}>
        <Image source={require('../assets/icons8-support-40.png')} style={styles.serviceIcon} />
        <Text style={styles.serviceText}>Support</Text>
      </TouchableOpacity>
    </View> */}

 
</Card>



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textInputButton: {
    borderWidth: 1, // Add a border
    borderColor: 'black', // Border color
    borderRadius: 2, // Rounded corners
    padding: 12, // Padding around the text
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    marginBottom: 16,
    marginTop:16,
    marginHorizontal:20, // Spacing at the bottom
  },
  
  buttonText1: {
    fontWeight: 'bold', // Bold text
    fontSize: 16,
    color:"green" // Font size
  },
  
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0, // Removed left margin
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0, // Removed left margin
  },

  // Corrected spacing between notificationIcon and qrCodeContainer
  rightTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  notificationIcon: {
    padding: 8,
    borderRadius: 0, // Removed border radius
    backgroundColor: 'transparent', // Removed background color
    marginRight: 0, // Removed right margin
  },
  greeting: {
    fontSize: 18,
    marginRight: 8,
    color:'black',
  },
  userInitials: {
    fontSize: 18,
    backgroundColor: 'green',
    color: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    marginRight:2,
  },
 
 
  qrCodeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  qrCodeText: {
    fontSize: 16,
    marginTop: 16,
  },
  rightTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },


  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 16,
    color: '#333',
  },
  cardHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeader: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
    fontWeight:'bold'
  },
  seeAllButton: {
    flexDirection: 'row', // Make sure it's a row
    alignItems: 'center',
  },
  seeAllText: {
    color: '#007bff',
    fontWeight:'bold' // Customize the color
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
   /*  borderBottomWidth: 1, */
    /* borderBottomColor: '#ccc', */ // Add your desired border color
  },
  accountName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  balance: {
    fontSize: 16,
    color: 'green', // Adjust the color to your preference
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: 'blue', // Adjust the icon color to your preference
  },
  transactionCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3, // Add elevation for a shadow effect
  },
  closeTransactionCardButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  closeButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  viewTransactionsCard: {
    backgroundColor: 'white',
    borderRadius: 2,
    padding: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleButton: {
    padding: 8,
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sectionTitle: {
    color: 'black',
    fontWeight: 'bold',
    textDecorationLine:"underline"
  },
  transactionSection: {
    marginBottom: 16,
  },
  filterInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 2,
    padding: 8,
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16, // Adjust spacing between titles and buttons
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    flex: 1,
    marginLeft: 8,
    color: '#555',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    fontFamily:'Helvetica Neue'
  },
  hideShowButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  cardHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  serviceIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },

  serviceText: {
    fontSize: 16,
    color: 'black',
    fontWeight:"bold"
  },
  financialServicesContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Occupy the full width
    marginBottom: 4, // Spacing between rows
  },

  serviceItem: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '30%', // Adjust the width as needed to fit three items in a row
    marginBottom: 1, // Spacing between items in a row
  },

  // Placeholder for the third item in Row 2
  placeholder: {
    width: '30%', // Adjust the width to match service items
  },
});

export default DashboardScreen;
