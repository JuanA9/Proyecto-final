import React from 'react';
import { View, Text } from 'react-native';
import { IconButton } from 'native-base';  // Si prefieres usar NativeBase
import Ionicons from 'react-native-vector-icons/Ionicons'; // Para iconos de Ionicons
import { useNavigation } from '@react-navigation/native';

const PasedeLista = () => {
const navigation = useNavigation();  // Hook de navegación

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <IconButton 
                icon={<Ionicons name="arrow-back" size={30} color="black" />} 
                onPress={() => navigation.navigate('Inicio')} // Navega a la pantalla de Inicio
                style={{position: 'absolute', top: 30, left: 20}} // Posiciona la flecha en la esquina superior izquierda
            />
            <Text>Lista de asistencia</Text>
        </View>
    );
}

export default PasedeLista;