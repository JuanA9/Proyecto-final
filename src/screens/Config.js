import React, { useState } from 'react';
import { NativeBaseProvider, Box, Center, VStack, FormControl, Input, Button, Avatar, HStack, Icon, Text, ScrollView, Stack, ZStack, Divider } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Importamos ImagePicker

const Config = () => {
    const [imageUri, setImageUri] = useState('https://via.placeholder.com/150'); // URI de la imagen de perfil

    // Función para seleccionar una nueva imagen
    const handleImagePick = async () => {
        // Solicitar permisos para acceder a la galería
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        // Abrir el selector de imágenes
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!pickerResult.cancelled) {
            setImageUri(pickerResult.uri); // Actualizamos la URI con la imagen seleccionada
        } else {
            console.log('No image selected');
        }
    };

    return (
        <NativeBaseProvider>
            <ScrollView flex={1} bg="white">
                {/* Barra de navegación */}
                <HStack bg="green.600" px="4" py="3" alignItems="center">
                    <Box flex={1} alignItems="center">
                        <Text color="white" fontSize="lg" fontWeight="bold">Configuración</Text>
                    </Box>
                </HStack>

                {/* Sección de Imagen de Perfil */}
                <Center mt="65">
                    <ZStack alignItems="center" justifyContent="center">
                        <Avatar
                            size="2xl" // Cambio de tamaño a 2xl para que sea más grande
                            source={{ uri: imageUri }} // Usamos la URI actual de la imagen
                            mb="5"
                        />
                        <Icon
                            as={Ionicons}
                            name="camera"
                            size="sm"
                            color="gray.500"
                            position="absolute"
                            bottom="0"
                            right="center"
                            onPress={handleImagePick} // Llamamos a la función cuando se presiona el ícono
                        />
                    </ZStack>
                    <Text mt="65" color="gray.500" onPress={handleImagePick}>
                        Cambiar foto de perfil
                    </Text>
                </Center>

                <VStack space={4} px="7" mt="10">
                    {/* Información básica del usuario */}
                    <Box bg="gray.100" p="4" borderRadius="md">
                        <Text fontSize="lg" color="gray.700" fontWeight="bold" mb="2">Información Básica</Text>
                        <Stack space={3}>
                            <FormControl>
                                <FormControl.Label>Nombre Completo</FormControl.Label>
                                <Input placeholder="Juan Alvarez" />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Número de Control</FormControl.Label>
                                <Input placeholder="19150360" />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Correo Electrónico</FormControl.Label>
                                <Input placeholder="jondoe@example.com" />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Contraseña Nueva</FormControl.Label>
                                <Input placeholder="Ingresar Contraseña Nueva" secureTextEntry={true} />
                            </FormControl>
                        </Stack>
                    </Box>

                    <Divider my="4" />

                    {/* Dirección del usuario */}
                    <Box bg="gray.100" p="4" borderRadius="md">
                        <Text fontSize="lg" color="gray.700" fontWeight="bold" mb="2">Dirección</Text>
                        <Stack space={3}>
                            <FormControl>
                                <FormControl.Label>Dirección</FormControl.Label>
                                <Input placeholder="103, Jardines de Triana" />
                            </FormControl>
                            <HStack space={2}>
                                <FormControl flex={1}>
                                    <FormControl.Label>Ciudad</FormControl.Label>
                                    <Input placeholder="Ags" />
                                </FormControl>
                                <FormControl flex={1}>
                                    <FormControl.Label>Estado</FormControl.Label>
                                    <Input placeholder="Aguascalientes" />
                                </FormControl>
                            </HStack>
                            <HStack space={2}>
                                <FormControl flex={1}>
                                    <FormControl.Label>Código Postal</FormControl.Label>
                                    <Input placeholder="11357" />
                                </FormControl>
                                <FormControl flex={1}>
                                    <FormControl.Label>País</FormControl.Label>
                                    <Input placeholder="México" />
                                </FormControl>
                            </HStack>
                        </Stack>
                    </Box>

                    <Divider my="4" />

                    {/* Botón de Guardar */}
                    <Center mt="0">
                        <Button colorScheme="green" size="lg" borderRadius="md" width="90%">
                            Guardar Cambios
                        </Button>
                    </Center>
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default Config;
