import React, { useState, useEffect } from 'react';
import { Button, Text, View } from 'native-base';
import { Camera, CameraView } from "expo-camera";
import { useNavigation } from '@react-navigation/native';

const Scanner = () => {
  const navigation = useNavigation();  // Hook de navegación
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
    alert(`Código QR escaneado con tipo ${type} y datos ${data}`);

    // Redirigir a la pantalla "PaseDeLista" pasando el data del QR
    navigation.navigate('PasedeLista', { groupId: data });
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso para la cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No se tiene acceso a la cámara</Text>;
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
          onPress={() => setScanned(false)}
          color="#007BFF"
        >
          Volver a escanear
        </Button>
      )}
    </View>
  );
};

export default Scanner;
