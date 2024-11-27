import React from 'react';
import { NativeBaseProvider, Box, Center, VStack, Avatar, Text, Divider } from 'native-base';

const Usuario = ({ route }) => {
    // Obtenemos los datos de route.params, con valores por defecto en caso de que no existan
    const { userInfo } = route.params || { userInfo: {} };

    return (
        <NativeBaseProvider>
            <Box flex={1} bg="white" p="5">
                <Center>
                    {/* Imagen de perfil */}
                    <Avatar size="2xl" source={{ uri: userInfo.imageUri || 'https://via.placeholder.com/150' }} mb="5" />
                    <Text fontSize="xl" fontWeight="bold">
                        {userInfo.fullName || 'Usuario'}
                    </Text>
                </Center>

                <Divider my="4" />

                {/* Información básica */}
                <VStack space={3}>
                    <Text fontSize="md">
                        <Text fontWeight="bold">Número de Control: </Text>
                        {userInfo.controlNumber || 'No disponible'}
                    </Text>
                    <Text fontSize="md">
                        <Text fontWeight="bold">Correo Electrónico: </Text>
                        {userInfo.email || 'No disponible'}
                    </Text>
                </VStack>
            </Box>
        </NativeBaseProvider>
    );
};

export default Usuario;
