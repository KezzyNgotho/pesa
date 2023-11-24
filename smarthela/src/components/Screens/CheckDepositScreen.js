import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';

import ImageResizer from 'react-native-image-resizer';
import ImageBase64 from 'react-native-image-base64';
import ImagePicker from 'react-native-image-picker';
import { RNCamera } from 'react-native-camera';

const CheckDepositScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [isValidCheck, setIsValidCheck] = useState(false);
  const [scanning, setScanning] = useState(false);

  const cameraRef = useRef(null);

  useEffect(() => {
    // Check and request camera permissions here
    requestCameraPermission();
  }, []);

  const takePicture = async () => {
    try {
      const options = {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      const response = await ImagePicker.showImagePicker(options);

      if (response.didCancel) {
        // User canceled image selection
      } else if (response.error) {
        // Handle any errors when selecting the image
      } else {
        // Resize the image to reduce its size (if needed)
        const resizedImage = await ImageResizer.createResizedImage(
          response.uri,
          800, // width
          600, // height
          'JPEG', // format
          80, // quality
        );

        // Convert the resized image to base64
        const base64Image = await ImageBase64.getBase64String(
          resizedImage.uri,
        );

        // You can save or upload the base64Image and validate it here
        // For simplicity, we assume it's valid if an image is selected.
        setIsValidCheck(true);
        setImageUri(resizedImage.uri);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBarcodeScan = async (scannedData) => {
    try {
      // Process the scanned data (e.g., check validation)
      console.log('Scanned data:', scannedData);

      // Here, you can implement Optical Character Recognition (OCR) to extract check details.

      // Validate the check and process it further (e.g., deposit to a bank account).

      // Implement user authentication to ensure secure access to the app.

      // You can also capture a photo of the check if needed
      if (cameraRef.current) {
        const options = { quality: 0.5, base64: true };
        const capturedData = await cameraRef.current.takePictureAsync(options);
        // Process the captured photo as needed
        console.log('Captured photo:', capturedData.uri);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setScanning(false);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // You have camera permission
      } else {
        // Camera permission denied
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Check Deposit App</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScanning(true)}
        >
          <Text style={styles.buttonText}>Scan Check</Text>
        </TouchableOpacity>
      </View>

      {imageUri && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>
            {isValidCheck ? 'Check is valid!' : 'Check is invalid.'}
          </Text>
          <Image style={styles.previewImage} source={{ uri: imageUri }} />
        </View>
      )}

      {scanning && (
        <View style={styles.cameraContainer}>
          <RNCamera
            ref={cameraRef}
            style={styles.camera}
            onBarCodeRead={(event) => handleBarcodeScan(event.data)}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    marginVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 50,
    padding: 15,
    width: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  previewContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  previewText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  previewImage: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: 'gray',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  camera: {
    flex: 1,
  },
});

export default CheckDepositScreen;
