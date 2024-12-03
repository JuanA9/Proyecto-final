import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, Center, VStack, FormControl, Input, Button, Avatar, HStack, Text, ScrollView, Divider } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Usuario = () => {
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState('https://via.placeholder.com/150');
    const [userData, setUserData] = useState({
        nombreCompleto: '',
        numeroControl: '',
        correoElectronico: '',
        carrera: '',
    });

    // Función para cargar datos del usuario
    const loadUserData = async () => {
        try {
            const savedUserData = await AsyncStorage.getItem('userData');
            const savedImageUri = await AsyncStorage.getItem('userImage');
            if (savedUserData) {
                setUserData(JSON.parse(savedUserData));
            }
            if (savedImageUri) {
                setImageUri(savedImageUri);
            }
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    };

    // Función para cerrar sesión
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken'); // Borra cualquier token almacenado
            await AsyncStorage.removeItem('userData');  // Opcional: elimina también los datos del usuario
            navigation.navigate('RoleSelectionScreen'); // Redirige a RoleSelectionScreen
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    // Efecto para cargar datos y escuchar el evento "focus" en la navegación
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadUserData);
        return unsubscribe; // Limpia el listener al desmontar el componente
    }, [navigation]);

    return (
        <NativeBaseProvider>
            <ScrollView flex={1} bg="white">
                <HStack bg="green.600" px="4" py="3" alignItems="center">
                    <Box flex={1} alignItems="center">
                        <Text color="white" fontSize="lg" fontWeight="bold">Usuario</Text>
                    </Box>
                </HStack>

                <Center mt="8">
                    <Avatar size="2xl" source={{ uri: imageUri }} mb="5" />
                    <Text mt="2" color="gray.500">Foto de perfil</Text>
                </Center>

                <VStack space={4} px="7" mt="10">
                    <Box bg="white" p="5" borderRadius="md" shadow={2}>
                        <VStack space={3}>
                            <FormControl>
                                <FormControl.Label>Nombre Completo</FormControl.Label>
                                <Input isReadOnly value={userData.nombreCompleto} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Número de Control</FormControl.Label>
                                <Input isReadOnly value={userData.numeroControl} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Correo Electrónico</FormControl.Label>
                                <Input isReadOnly value={userData.correoElectronico} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Carrera</FormControl.Label>
                                <Input isReadOnly value={userData.carrera} />
                            </FormControl>
                        </VStack>
                    </Box>

                    <Divider my="4" />

                    <Center mt="0">
                        <Button
                            colorScheme="green"
                            size="lg"
                            borderRadius="md"
                            width="90%"
                            onPress={() => navigation.navigate('Config')}
                        >
                            Configurar Perfil
                        </Button>
                    </Center>

                    <Divider my="4" />

                    <Center mt="0">
                        <Button
                            colorScheme="green"
                            size="lg"
                            borderRadius="md"
                            width="90%"
                            onPress={handleLogout}
                        >
                            Cerrar Sesión
                        </Button>
                    </Center>
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default Usuario;
