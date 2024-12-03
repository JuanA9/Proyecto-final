import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

const HistorialScreen = () => {
    const [historial, setHistorial] = useState([]);

    // Cargar el historial de registros desde AsyncStorage
    useEffect(() => {
        const cargarHistorial = async () => {
            try {
                const historialGuardado = await AsyncStorage.getItem('historial');
                if (historialGuardado) {
                    setHistorial(JSON.parse(historialGuardado));
                }
            } catch (error) {
                console.error('Error al cargar el historial:', error);
            }
        };
        cargarHistorial();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Historial de Registros</Text>
            {historial.length === 0 ? (
                <Text>No hay registros disponibles.</Text>
            ) : (
                historial.map((sesion, index) => (
                    <View key={index} style={styles.sesion}>
                        <Text style={styles.sesionText}>
                            {sesion.email} - {sesion.fecha}
                        </Text>
                    </View>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sesion: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    sesionText: {
        fontSize: 16,
    },
});

export default HistorialScreen;
