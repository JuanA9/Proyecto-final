import React from 'react';
import { NativeBaseProvider, AspectRatio, Box, Center, VStack, HStack, Text, Image, Heading, Divider, Button } from "native-base";

const Inicio = () => {
    return (
        <NativeBaseProvider>
            <Center w="100%" flex={1} bg="green.100" p="4">
                {/* Encabezado Principal */}
                <Heading mb="2" size="lg" textAlign="center" color="green.600">
                    Bienvenido a Roll Call
                </Heading>
                {/* Sección de Imagen de Bienvenida */}
                <Center w="70%" mb="75">
                    <AspectRatio ratio={16 / 9} w="100%" borderRadius="lg">
                        <Image
                            source={require('../../assets/Rectangle60.png')} // Ruta relativa de tu imagen de bienvenida
                            alt="Bienvenida"
                            borderRadius="lg" 
                            resizeMode="contain"  // Ajusta la imagen sin distorsionar
                        />
                    </AspectRatio>
                </Center>
                <Divider my="4" />
                {/* Botón de Pase de Lista */}
                <Box w="100%" px="4">
                    <Button size="lg" colorScheme="green" borderRadius="lg">
                        Realizar Pase de Lista
                    </Button>
                </Box>
                <Divider my="4" />
                {/* Opciones de Grupos */}
                <VStack space={3} w="90%" alignItems="center">
                    <Heading size="md" color="green.700">Selecciona un Grupo</Heading>
                    <HStack space={2} w="100%">
                        <Box bg="green.500" p="3" flex={1} borderRadius="lg" alignItems="center">
                            <Text color="white">Grupo 1</Text>
                        </Box>
                        <Box bg="green.500" p="3" flex={1} borderRadius="lg" alignItems="center">
                            <Text color="white">Grupo 2</Text>
                        </Box>
                    </HStack>
                </VStack>
                <Divider my="4" />
            </Center>
        </NativeBaseProvider>
    );
};

export default Inicio;
