import React, { useState, useEffect } from 'react'; 
import { NativeBaseProvider, Box, Center, VStack, FormControl, Input, Avatar, HStack, Text, ScrollView, Divider, Icon, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking, PanResponder, View, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window'); // Obtener dimensiones de la pantalla

const Usuario = () => {
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState('https://via.placeholder.com/150');
    const [userData, setUserData] = useState({
        nombreCompleto: '',
        numeroControl: '',
        correoElectronico: '',
        carrera: '',
    });

    const [pan, setPan] = useState({ x: width - 100, y: height - 150 }); // Estado inicial en la parte inferior derecha

    // Animación de la posición del ícono
    const panX = useState(new Animated.Value(width - 100))[0]; // Crear valor animado para la posición X
    const panY = useState(new Animated.Value(height - 150))[0]; // Crear valor animado para la posición Y

    // Crear PanResponder para mover el icono solo cuando se mantenga presionado
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,  // Siempre responde al inicio del toque
        onMoveShouldSetPanResponder: (e, gestureState) => gestureState.numberActiveTouches === 1, // Solo responde al mover el dedo
        onPanResponderGrant: () => {}, // No hacemos nada cuando empieza el toque
        onPanResponderMove: (e, gestureState) => {
            let newX = gestureState.moveX;
            let newY = gestureState.moveY;

            // Limitar el movimiento del icono dentro de la pantalla
            if (newX < 0) newX = 0;
            if (newX > width - 100) newX = width - 100; // 100 es el tamaño aproximado del ícono
            if (newY < 0) newY = 0;
            if (newY > height - 100) newY = height - 100; // 100 es el tamaño aproximado del ícono

            // Animar el movimiento de forma fluida
            Animated.spring(panX, {
                toValue: newX,
                useNativeDriver: false,
            }).start();

            Animated.spring(panY, {
                toValue: newY,
                useNativeDriver: false,
            }).start();
        },
        onPanResponderRelease: () => {
            // Puedes agregar alguna acción aquí si es necesario
        },
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

    // Función para contactar con soporte
    const contactSupport = () => {
        const email = 'isael.dejesus13@gmail.com'; // Cambia esta dirección de correo por la del soporte
        const subject = 'Soporte - Usuario App'; // Asunto del correo
        const body = 'Hola, necesito asistencia con la aplicación.'; // Cuerpo del correo
        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        Linking.openURL(url).catch(err => console.error('Error al abrir correo:', err));
    };

    // Efecto para cargar datos y escuchar el evento "focus" en la navegación
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadUserData);
        return unsubscribe; // Limpia el listener al desmontar el componente
    }, [navigation]);

    return (
        <NativeBaseProvider>
            {/* El ScrollView y todo el contenido principal */}
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

            {/* Botón movible */}
            <Animated.View
                style={{
                    position: 'absolute',
                    left: panX, // Usar valor animado para la posición X
                    top: panY,  // Usar valor animado para la posición Y
                    zIndex: 999, // Asegura que esté sobre otros elementos
                }}
                {...panResponder.panHandlers} // Asociamos el PanResponder al View
            >
                <Button 
                    onPress={contactSupport}
                    colorScheme="green" 
                    borderRadius="full" 
                    p="4"
                    leftIcon={<Icon name="email" size="sm" color="white" />}
                >
                    Soporte
                </Button>
            </Animated.View>
        </NativeBaseProvider>
    );
};

export default Usuario;
