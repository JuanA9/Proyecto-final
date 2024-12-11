import React, { useState } from 'react';
import { Text, Image } from 'react-native';
import { NativeBaseProvider, Box, Heading, VStack, FormControl, HStack, Input, Button, Center, useColorModeValue, useBreakpointValue } from "native-base";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Importar AsyncStorage

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const bgColor = useColorModeValue('light.background.50', 'dark.background.900');
    const textColor = useColorModeValue('light.text.50', 'dark.text.50');

    const flexDir = useBreakpointValue({ base: 'column', lg: 'row' });

    // Maneja el registro de usuario y lo guarda en AsyncStorage
    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('No coinciden las contraseñas');
            return;
        }
        try {
            const response = await fetch('http://192.168.0.6:3005/users/register', { // Reemplaza con la URL de tu API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario: email,
                    contra: password,
                    nombre: email, // Usar el correo como nombre
                    tipo: 1, // Tipo fijo
                }),
                
            });

            if (response.ok) {
                alert('Registration successful!');
                navigation.navigate('RoleSelectionScreen'); // Redirige a la pantalla de login
            } else {
                const errorData = await response.json();
                console.error('Error en el registro:', errorData);
                alert('Failed to register. Please try again.');
            }
        } catch (error) {
            console.error('Error al registrar:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <Center w="100%" bg={bgColor} flex={1}>
            <Image 
                source={require('../../assets/Rectangle60.png')} 
                style={{ width: '100%', height: 200, marginBottom: 20 }} 
                resizeMode="contain"
            />
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading size="lg" fontWeight="600" color={textColor}>
                    Welcome
                </Heading>
                <Heading mt="1" color={textColor} fontWeight="medium" size="xs">
                    Sign in to continue Profesor!
                </Heading>
                <VStack space={3} mt="5" flexDirection={flexDir}>
                    <FormControl>
                        <FormControl.Label>User</FormControl.Label>
                        <Input value={email} onChangeText={setEmail} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type="password" value={password} onChangeText={setPassword} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Confirm Password</FormControl.Label>
                        <Input type="password" value={confirmPassword} onChangeText={setConfirmPassword} />
                    </FormControl>
                    <Button mt="2" colorScheme="green" onPress={handleRegister}>
                        Register
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color={textColor}>
                            Already have an account? 
                            <Button variant="link" colorScheme="green" onPress={() => navigation.navigate('Login')}>
                                Login
                            </Button>
                        </Text>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    );
};

export default RegisterScreen;
