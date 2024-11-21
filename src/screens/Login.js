import React, { useState } from 'react';
import { Text, Image } from 'react-native';
import { NativeBaseProvider, Box, Heading, VStack, FormControl, HStack, Input, Button, Link, Center, useColorModeValue } from "native-base";
import { useNavigation, useRoute } from '@react-navigation/native';

const LoginScreen = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const route = useRoute();  // Obtener el parámetro de rol
    const { role } = route.params;  // El rol seleccionado

    const navigation = useNavigation();

    const bgColor = useColorModeValue('light.background.50', 'dark.background.900');
    const textColor = useColorModeValue('light.text.50', 'dark.text.50');
    const linkColor = useColorModeValue("green.500", "green.300"); 

    const handleLogin = () => {
        if (email && password) { 
            setIsAuthenticated(true);
            if (role === 'alumno') {
                navigation.navigate('AlumnoMain');  // Redirigir a la pantalla de Alumno
            } else {
                navigation.navigate('ProfesorMain');  // Redirigir a la pantalla de Profesor
            }
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
                    Welcome {role === 'alumno' ? 'Alumno' : 'Profesor'}
                </Heading>
                <Heading mt="1" color={textColor} fontWeight="medium" size="xs">
                    Sign in to continue!
                </Heading>

                <VStack space={3} mt="5">
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
                            color: linkColor }} alignSelf="flex-end" mt="1">
                            Forget Password?
                        </Link>
                    </FormControl>
                    <Button mt="2" colorScheme="green" onPress={handleLogin}>
                        Login
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};

export default LoginScreen;
