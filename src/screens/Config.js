import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { NativeBaseProvider, Box, Center, VStack, FormControl, Input, Button, Avatar, HStack, Icon, ScrollView, Stack, Divider } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Config = () => {
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState('https://via.placeholder.com/150');
    const [userData, setUserData] = useState({
        nombreCompleto: '',
        numeroControl: '',
        correoElectronico: '',
        carrera: '',
    });

    const handleImagePick = async () => {
        try {
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
                setImageUri(pickerResult.assets[0].uri);
            } else {
                console.log('No se seleccionó una imagen.');
            }
        } catch (error) {
            console.error('Error al seleccionar imagen:', error);
        }
    };

    const handleSaveChanges = async () => {
        try {
            // Guardar datos en AsyncStorage
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            await AsyncStorage.setItem('userImage', imageUri);

            alert('Datos guardados correctamente.');
            navigation.navigate('Usuario'); // Navegar a la pantalla Usuario
        } catch (error) {
            console.error('Error al guardar datos:', error);
            alert('Error al guardar los datos.');
        }
    };

    return (
        <NativeBaseProvider>
            <ScrollView flex={1} bg="white">
                <HStack bg="green.600" px="4" py="3" alignItems="center">
                    <Box flex={1} alignItems="center">
                        <Text color="white" fontSize="lg" fontWeight="bold">Config</Text>
                    </Box>
                </HStack>

                <Center mt="8">
                    <View style={{ position: 'relative', alignItems: 'center' }}>
                        <Avatar
                            size="2xl"
                            source={{ uri: imageUri }}
                            mb="5"
                        />
                        <Icon
                            as={Ionicons}
                            name="camera"
                            size="lg"
                            color="gray.500"
                            position="absolute"
                            bottom="0"
                            right="0"
                            onPress={handleImagePick}
                        />
                    </View>
                    <Text mt="2" color="gray.500" onPress={handleImagePick}>
                        Cambiar foto de perfil
                    </Text>
                </Center>

                <VStack space={4} px="7" mt="10">
                    <Box bg="white" p="5" borderRadius="md" shadow={2}>
                        <Stack space={3}>
                            <FormControl>
                                <FormControl.Label>Nombre Completo</FormControl.Label>
                                <Input
                                    value={userData.nombreCompleto}
                                    onChangeText={(value) => setUserData({ ...userData, nombreCompleto: value })}
                                    placeholder="Fernando Robles Casillas"
                                />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Número de Control</FormControl.Label>
                                <Input
                                    value={userData.numeroControl}
                                    onChangeText={(value) => setUserData({ ...userData, numeroControl: value })}
                                    placeholder="173923R"
                                />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Correo Electrónico</FormControl.Label>
                                <Input
                                    value={userData.correoElectronico}
                                    onChangeText={(value) => setUserData({ ...userData, correoElectronico: value })}
                                    placeholder="fernando.r@aguascalientes.tecnm.com"
                                />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Carrera</FormControl.Label>
                                <Input
                                    value={userData.carrera}
                                    onChangeText={(value) => setUserData({ ...userData, carrera: value })}
                                    placeholder="Ingeniería en Sistemas"
                                />
                            </FormControl>
                        </Stack>
                    </Box>

                    <Divider my="4" />

                    <Center mt="0">
                        <Button
                            colorScheme="green"
                            size="lg"
                            borderRadius="md"
                            width="90%"
                            onPress={handleSaveChanges}
                        >
                            Guardar Cambios
                        </Button>
                    </Center>
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default Config;
