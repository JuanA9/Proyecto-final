import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
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

    // Función para limpiar el historial
    const limpiarHistorial = async () => {
        try {
            await AsyncStorage.removeItem('historial'); // Elimina la clave 'historial' en AsyncStorage
            setHistorial([]); // Vacía el estado local
            Alert.alert('Historial limpio', 'El historial de registros ha sido eliminado correctamente.');
        } catch (error) {
            console.error('Error al limpiar el historial:', error);
            Alert.alert('Error', 'No se pudo limpiar el historial.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de Registros</Text>
            {historial.length === 0 ? (
                <Text>No hay registros disponibles.</Text>
            ) : (
                <ScrollView>
                    {historial.map((sesion, index) => (
                        <View key={index} style={styles.sesion}>
                            <Text style={styles.sesionText}>
                                {sesion.email} - {sesion.fecha}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            )}
            <View style={styles.buttonContainer}>
                <Button title="Limpiar Historial" onPress={limpiarHistorial} color="#d9534f" />
            </View>
        </View>
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
    buttonContainer: {
        marginTop: 20,
    },
});

export default HistorialScreen;
