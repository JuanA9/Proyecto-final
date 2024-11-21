import React, { useState } from 'react';
import { Text, Image } from 'react-native';
import { NativeBaseProvider, Box, Heading, VStack, FormControl, HStack, Input, Button, Link, Center, useColorModeValue, useBreakpointValue } from "native-base";
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const bgColor = useColorModeValue('light.background.50', 'dark.background.900');
    const textColor = useColorModeValue('light.text.50', 'dark.text.50');
    const linkColor = useColorModeValue("green.500", "green.300");

    const flexDir = useBreakpointValue({ base: 'column', lg: 'row' });

    const handleRedirectToRegister = () => {
        navigation.navigate('Register'); // Redirigir a la pantalla de registro
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
                    Bienvenido
                </Heading>
                <Heading mt="1" color={textColor} fontWeight="medium" size="xs">
                    Por favor, regístrate para continuar
                </Heading>

                <VStack space={3} mt="5" flexDirection={flexDir}>
                    <FormControl>
                        <FormControl.Label>Correo electrónico</FormControl.Label>
                        <Input value={email} onChangeText={setEmail} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Contraseña</FormControl.Label>
                        <Input type="password" value={password} onChangeText={setPassword} />
                    </FormControl>
                    <Button mt="2" colorScheme="green" onPress={handleRedirectToRegister}>
                        Registrarse
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color={textColor}>
                            ¿Ya tienes una cuenta? 
                            <Button
                                variant="link"
                                colorScheme="green"
                                onPress={() => navigation.navigate('Login')}>
                                Inicia sesión
                            </Button>
                        </Text>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    );
};

export default LoginScreen;
