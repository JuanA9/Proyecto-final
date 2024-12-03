import React, { useState } from 'react';
import { Text, Image } from 'react-native';
import { NativeBaseProvider, Box, Heading, VStack, FormControl, HStack, Input, Button, Link, Center, useColorModeValue, useBreakpointValue } from "native-base";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

const LoginScreen = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const bgColor = useColorModeValue('light.background.50', 'dark.background.900');
    const textColor = useColorModeValue('light.text.50', 'dark.text.50');
    const linkColor = useColorModeValue("green.500", "green.300"); 

    const flexDir = useBreakpointValue({ base: 'column', lg: 'row' });

    // Maneja el inicio de sesión y guarda el historial
    const handleLogin = async () => {
        if (email && password) { 
            setIsAuthenticated(true);

            // Guardar el inicio de sesión en el historial
            try {
                const historial = await AsyncStorage.getItem('historial');
                const historialParseado = historial ? JSON.parse(historial) : [];
                const nuevaSesion = { email, fecha: new Date().toLocaleString() };
                historialParseado.push(nuevaSesion);

                await AsyncStorage.setItem('historial', JSON.stringify(historialParseado));
            } catch (error) {
                console.error('Error al guardar el historial:', error);
            }

            navigation.navigate('MainTab');  // Navega a la pantalla principal después de iniciar sesión
        } else {
            alert('Please enter your credentials'); 
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
                    Sign in to continue!
                </Heading>

                <VStack space={3} mt="5" flexDirection={flexDir}>
                    <FormControl>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input value={email} onChangeText={setEmail} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type="password" value={password} onChangeText={setPassword} />
                        <Link _text={{
                            fontSize: "xs",
                            fontWeight: "1000",
                            color: linkColor  }} alignSelf="flex-end" mt="1">
                            Forget Password?
                        </Link>
                    </FormControl>
                    <Button mt="2" colorScheme="green" onPress={handleLogin}>
                        Login
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color={textColor}>
                            I'm a new user. 
                            <Button
                                variant="link"
                                colorScheme="green"
                                onPress={() => navigation.navigate('Register')}>
                                Register
                            </Button>
                        </Text>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    );
};

export default LoginScreen;
