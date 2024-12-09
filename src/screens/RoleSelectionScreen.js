import React, { useState } from 'react';
import { Text, Image } from 'react-native';
import { NativeBaseProvider, Box, Heading, VStack, Button, Center, useColorModeValue } from "native-base";
import { useNavigation } from '@react-navigation/native';

const RoleSelectionScreen = () => {
    const navigation = useNavigation();
    const bgColor = useColorModeValue('light.background.50', 'dark.background.900');
    const textColor = useColorModeValue('light.text.50', 'dark.text.50');

    const handleRoleSelect = (role) => {
        navigation.navigate("" + role + "");  // Navegar a la pantalla de Login con el rol seleccionado
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
                    BIENVENIDO 
                </Heading>
                <Heading mt="1" color={textColor} fontWeight="medium" size="xs">
                    SELECCIONA TU ROL PARA CONTINUAR 
                </Heading>

                <VStack space={3} mt="5">
                    <Button colorScheme="green" onPress={() => handleRoleSelect('Alumno')}>
                        INGRESAR COMO ALUMNO
                    </Button>
                    <Button colorScheme="green" onPress={() => handleRoleSelect('Profesor')}>
                        INGRESAR COMO PROFESOR
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};

export default RoleSelectionScreen;
