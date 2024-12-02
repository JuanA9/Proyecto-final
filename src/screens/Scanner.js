import React, { useState, useEffect } from 'react';
import { Pressable, Text, Button, View, Link} from 'native-base';
import { Camera, CameraView } from "expo-camera";

const Scanner = () => {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
<View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <CameraView
        style={{
          width: '100%',
          height: '70%',
          borderRadius: 10,
          overflow: 'hidden',
          marginBottom: 20,
        }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'pdf417'],
        }}
      />
      {scanned && (
        <Button
          title="Tap to Scan Again"
          onPress={() => setScanned(false)}
          color="#007BFF"
        />
      )}
    </View>
  );
}


export default Scanner;
