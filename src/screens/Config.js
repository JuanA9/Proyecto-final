import React, { useState } from 'react';
import { NativeBaseProvider, Box, Center, VStack, FormControl, Input, Button, Avatar, HStack, Icon, Text, ScrollView, ZStack, Divider } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Config = ({ navigation }) => {
    
    const [userInfo, setUserInfo] = useState({
        imageUri: 'https://via.placeholder.com/150',
        fullName: '',
        controlNumber: '',
        email: '',
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

        if (!pickerResult.cancelled) {
            setUserInfo({ ...userInfo, imageUri: pickerResult.uri });
        }
    };

    // Función para guardar cambios y navegar a la pantalla de usuario
    const saveChanges = () => {
        if (navigation && navigation.navigate) {
            navigation.navigate('Usuario', { userInfo }); // Pasamos el objeto userInfo como parámetro
        } else {
            alert('No se pudo navegar a la pantalla de Usuario');
        }
    };
    
    return (
        <NativeBaseProvider>
            <ScrollView flex={1} bg="white">
                {/* Barra de navegación */}
                <HStack bg="green.600" px="4" py="3" alignItems="center">
                    <Box flex={1} alignItems="center">
                        <Text color="white" fontSize="lg" fontWeight="bold">
                            Configuración
                        </Text>
                    </Box>
                </HStack>

                {/* Sección de Imagen de Perfil */}
                <Center mt="6">
                    <ZStack alignItems="center" justifyContent="center">
                        <Avatar
                            size="2xl"
                            source={{ uri: userInfo.imageUri }}
                            mb="5"
                        />
                        <Icon
                            as={Ionicons}
                            name="camera"
                            size="sm"
                            color="gray.500"
                            position="absolute"
                            bottom="0"
                            right="center"
                            onPress={handleImagePick}
                        />
                    </ZStack>
                    <Text mt="2" color="gray.500" onPress={handleImagePick}>
                        Cambiar foto de perfil
                    </Text>
                </Center>

                <VStack space={4} px="7" mt="10">
                    {/* Información básica del usuario */}
                    <Box bg="gray.100" p="4" borderRadius="md">
                        <Text fontSize="lg" color="gray.700" fontWeight="bold" mb="2">
                            Información Básica
                        </Text>
                        <VStack space={3}>
                            <FormControl>
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
                            <FormControl>
                                <FormControl.Label>Correo Electrónico</FormControl.Label>
                                <Input
                                    placeholder="jondoe@example.com"
                                    value={userInfo.email}
                                    onChangeText={(text) => handleInputChange('email', text)}
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
                        <Button colorScheme="green" size="lg" borderRadius="md" width="90%" onPress={saveChanges}>
                            Guardar Cambios
                        </Button>
                    </Center>
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default Config;
