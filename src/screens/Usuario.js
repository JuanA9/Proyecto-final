import React from 'react';
import { NativeBaseProvider, Box, Center, VStack, Avatar, Text, Divider, Button } from 'native-base';

const Usuario = ({ route, navigation }) => {
    // Obtenemos los datos de route.params, con valores por defecto en caso de que no existan
    const { userInfo } = route.params || { userInfo: {} };

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        // Navegar a la pantalla de Login
        navigation.navigate('RoleSelectionScreen');
    };

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
                <VStack space={3} mb="5">
                <Text fontSize="md">
                        <Text fontWeight="bold">Nombre Completo: </Text>
                        {userInfo.email || 'No disponible'}
                    </Text>
                    <Text fontSize="md">
                        <Text fontWeight="bold">Número de Control: </Text>
                        {userInfo.controlNumber || 'No disponible'}
                    </Text>
                    <Text fontSize="md">
                        <Text fontWeight="bold">Correo Electrónico: </Text>
                        {userInfo.email || 'No disponible'}
                    </Text>
                    <Text fontSize="md">
                        <Text fontWeight="bold">Turno: </Text>
                        {userInfo.email || 'No disponible'}
                    </Text>
                </VStack>

                {/* Botón de Cerrar Sesión */}
                <Button colorScheme="red" onPress={handleLogout}>
                    Cerrar Sesión
                </Button>
            </Box>
        </NativeBaseProvider>
    );
};

export default Usuario;
