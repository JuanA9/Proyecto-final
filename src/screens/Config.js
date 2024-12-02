import React, { useState } from 'react';
import {
  NativeBaseProvider,
  Box,
  Center,
  VStack,
  FormControl,
  Input,
  Button,
  Avatar,
  HStack,
  Icon,
  Text,
  ScrollView,
  Divider
} from 'native-base';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Config = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    imageUri: 'https://via.placeholder.com/150',
    fullName: '',
    controlNumber: '',
    email: '',
    turno: '',
    newPassword: '',
  });

  // Manejar cambios en los inputs
  const handleInputChange = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  // Función para seleccionar una nueva imagen
  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Se requiere permiso para acceder a la galería.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setUserInfo({ ...userInfo, imageUri: pickerResult.uri });
    }
  };

  // Función para guardar cambios y navegar a la pantalla de usuario
  const saveChanges = () => {
    if (userInfo.fullName && userInfo.email) {
      navigation.navigate('Usuario', { userInfo });
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  };

  return (
    <NativeBaseProvider>
      {/* Contenedor principal que usa KeyboardAvoidingView */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Tocar fuera de los campos para cerrar el teclado */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView flex={1} bg="gray.50" contentContainerStyle={{ flexGrow: 1 }}>
            {/* Barra de navegación */}
            <HStack bg="green.600" px="4" py="3" alignItems="center" justifyContent="center">
              <Text color="white" fontSize="lg" fontWeight="bold">
                Configuración
              </Text>
            </HStack>

            {/* Sección de Imagen de Perfil */}
            <Center mt="6">
              <Avatar
                size="2xl"
                source={{ uri: userInfo.imageUri }}
                mb="5"
              />
              <TouchableOpacity onPress={handleImagePick} style={{ position: 'absolute', bottom: 0, right: 100 }}>
                <Icon
                  as={Ionicons}
                  name="camera"
                  size="lg"
                  color="gray.500"
                />
              </TouchableOpacity>
              <Text mt="3" color="gray.500" onPress={handleImagePick}>
                Cambiar foto de perfil
              </Text>
            </Center>

            <VStack space={4} px="7" mt="6">
              {/* Información básica del usuario */}
              <Box bg="white" p="4" borderRadius="md" shadow="2">
                <Text fontSize="lg" color="gray.700" fontWeight="bold" mb="2">
                  Información Básica
                </Text>
                <VStack space={3}>
                  <FormControl isRequired>
                    <FormControl.Label>Nombre Completo</FormControl.Label>
                    <Input
                      placeholder="Juan Alvarez"
                      value={userInfo.fullName}
                      onChangeText={(text) => handleInputChange('fullName', text)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Número de Control</FormControl.Label>
                    <Input
                      placeholder="19150360"
                      value={userInfo.controlNumber}
                      onChangeText={(text) => handleInputChange('controlNumber', text)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormControl.Label>Correo Electrónico</FormControl.Label>
                    <Input
                      placeholder="jondoe@example.com"
                      value={userInfo.email}
                      onChangeText={(text) => handleInputChange('email', text)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Turno</FormControl.Label>
                    <Input
                      placeholder="Matutino o Vespertino"
                      value={userInfo.turno}
                      onChangeText={(text) => handleInputChange('turno', text)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Contraseña Nueva</FormControl.Label>
                    <Input
                      placeholder="Ingresar Contraseña Nueva"
                      secureTextEntry
                      value={userInfo.newPassword}
                      onChangeText={(text) => handleInputChange('newPassword', text)}
                    />
                  </FormControl>
                </VStack>
              </Box>

              <Divider my="4" />

              {/* Botón de Guardar */}
              <Center>
                <Button
                  colorScheme="green"
                  size="lg"
                  borderRadius="md"
                  width="90%"
                  onPress={saveChanges}
                >
                  Guardar Cambios
                </Button>
              </Center>
            </VStack>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
};

export default Config;
