import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableWithoutFeedback, Text } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const BillsScreen = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleBack = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };

  const handleCancel = () => {
    setPaymentAmount('');
    setPaymentReason('');
    setFeedback('');
  };

  const Section = ({ title, children }) => (
    <View style={styles.sectionContainer}>
      {/* <View style={styles.header}>
        <TouchableWithoutFeedback onPress={handleBack}>
          <Image
            source={require('../assets/icons8-back-50.png')}
            style={styles.icon}
          />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>Zuri Till Payment</Text>
        <TouchableWithoutFeedback onPress={handleCancel}>
          <Image
            source={require('../assets/icons8-cancel-24.png')}
            style={styles.icon}
          />
        </TouchableWithoutFeedback>
      </View> */}
      <Title style={styles.sectionTitle}>{title}</Title>
      <View style={styles.modulesContainer}>{children}</View>
    </View>
  );

  const Module = ({ title, icon, onPress }) => (
    <TouchableWithoutFeedback onPress={onPress}>
      <Card style={styles.moduleCard}>
        <Card.Content>
          <Image source={icon} style={styles.moduleImage} />
          <Title style={styles.moduleTitle}>{title}</Title>
        </Card.Content>
      </Card>
    </TouchableWithoutFeedback>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>


       {/* Back and Cancel buttons at the top */}
       <View style={styles.header}>
        <TouchableWithoutFeedback onPress={handleBack}>
          <Image
            source={require('../assets/icons8-back-50.png')}
            style={styles.icon}
          />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>Pay my bills</Text>
        {/* <TouchableWithoutFeedback onPress={handleCancel}>
          <Image
            source={require('../assets/icons8-cancel-24.png')}
            style={styles.icon}
          />
        </TouchableWithoutFeedback> */}
      </View>
      <Section title="Buy Goods and Services">
        <Module title="Zuri Till" icon={require('../assets/Cardless.png')} onPress={() => navigateToScreen('ZuriTill')} />
        <Module title="Airtime & Data" icon={require('../assets/Airtime.jpeg')} onPress={() => navigateToScreen('Recharge')} />
        <Module title="M-Pesa Till" icon={require('../assets/icons8-mpesa-48.png')} />
        <Module title="M-Pesa Paybill" icon={require('../assets/icons8-mpesa-48.png')} />
      </Section>

      <Section title="Govt Bills">
        <Module title="KRA" icon={require('../assets/kra.webp')} />
        <Module title="E-Citizen" icon={require('../assets/e-citizen.jpg')} />
      </Section>

      <Section title="Utility Bills">
        <Module title="KPLC" icon={require('../assets/KPLC.webp')} />
        <Module title="Zuku TV" icon={require('../assets/Zuku.jpg')} />
        <Module title="DSTV" icon={require('../assets/dstv.webp')} />
        <Module title="GOtv" icon={require('../assets/gotv.jpg')} />
        <Module title="StarTimes" icon={require('../assets/Startimes.jpg')} />
      </Section>

      <Section title="Institutional Bills">
        <Module title="School Fees" icon={require('../assets/fees.jpeg')} />
        <Module title="Rent Payment" icon={require('../assets/rent.jpeg')} />
        <Module title="More" icon={require('../assets/icons8-support-40.png')} />
      </Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title:{
fontWeight:'bold',
color:'black'
  },
  container: {
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  modulesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moduleCard: {
    width: '47%',
    height: 86,
    marginBottom: 20,
    elevation: 0,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  
  moduleImage: {
    width: 50,
    height: 40,
    alignSelf: 'center',
  },
  moduleTitle: {
    fontSize: 14,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
});

export default BillsScreen;
