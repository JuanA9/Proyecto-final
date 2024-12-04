import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg'; // Instalar con: npm install react-native-qrcode-svg
import Icon from 'react-native-vector-icons/Ionicons'; // Instalar con: npm install react-native-vector-icons
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

const GruposProfesor = () => {
    const navigation = useNavigation(); // Hook de navegación
    const [materias, setMaterias] = useState([]); // Lista de materias
    const [nombreMateria, setNombreMateria] = useState(''); // Input para nueva materia
    const [qrData, setQrData] = useState(''); // Código QR generado para la materia

    // Cargar las materias guardadas desde AsyncStorage al iniciar
    useEffect(() => {
        const cargarMaterias = async () => {
            try {
                const materiasGuardadas = await AsyncStorage.getItem('materias');
                if (materiasGuardadas) {
                    setMaterias(JSON.parse(materiasGuardadas));
                }
            } catch (error) {
                console.error('Error al cargar las materias:', error);
            }
        };
        cargarMaterias();
    }, []);

    // Guardar las materias en AsyncStorage
    const guardarMaterias = async (materiasActualizadas) => {
        try {
            await AsyncStorage.setItem('materias', JSON.stringify(materiasActualizadas));
        } catch (error) {
            console.error('Error al guardar las materias:', error);
        }
    };

    // Maneja el registro de una nueva materia
    const agregarMateria = () => {
        if (nombreMateria.trim() === '') {
            alert('Por favor ingresa el nombre de la materia.');
            return;
        }
    
        const nuevaMateria = {
            id: Date.now().toString(), // ID único para la materia
            nombre: nombreMateria,
        };
    
        const materiasActualizadas = [...materias, nuevaMateria];
        setMaterias(materiasActualizadas);
        guardarMaterias(materiasActualizadas); // Guardar en AsyncStorage
        setNombreMateria('');
    
        // Genera el QR y redirige a "PaseDeListaScreen"
        generarQR(nuevaMateria);
    };
    

    // Genera el código QR para una materia seleccionada y redirige automáticamente
  // Genera el código QR para una materia seleccionada y redirige automáticamente
const generarQR = (materia) => {
    const qrContent = `grupo-${materia.id}`; // Identificador único del grupo
    setQrData(qrContent);

    // Redirigir a la pantalla "PaseDeListaScreen" pasando el QR como parámetro
    navigation.navigate('PaseDeLista', { qrData: qrContent, materia: materia.nombre });
};

    // Elimina una materia específica
    const eliminarMateria = (id) => {
        Alert.alert(
            'Confirmar Eliminación',
            '¿Estás seguro de que deseas eliminar esta materia?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        const materiasActualizadas = materias.filter((materia) => materia.id !== id);
                        setMaterias(materiasActualizadas);
                        guardarMaterias(materiasActualizadas); // Guardar cambios en AsyncStorage
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            {/* Botón de navegación */}
            <Icon
                name="arrow-back"
                size={30}
                color="black"
                onPress={() => navigation.navigate('PasedeLista')} // Regresa a la pantalla inicial
                style={styles.backButton}
            />

            {/* Gestión de Materias */}
            <Text style={styles.title}>Gestión de Materias</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de la materia"
                    value={nombreMateria}
                    onChangeText={(text) => setNombreMateria(text)}
                />
                <Button title="Agregar Materia" onPress={agregarMateria} />
            </View>

            {/* Lista de materias registradas */}
            <Text style={styles.subtitle}>Materias Registradas</Text>
            {materias.map((materia) => (
                <View key={materia.id} style={styles.materiaRow}>
                    <Text style={styles.materiaItem}>{materia.nombre}</Text>
                    <View style={styles.actionsContainer}>
                        <TouchableOpacity
                            style={styles.selectButton}
                            onPress={() => generarQR(materia)} // Genera QR y navega
                        >
                            <Text style={styles.selectButtonText}>Generar QR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => eliminarMateria(materia.id)} // Elimina la materia
                        >
                            <Text style={styles.deleteButtonText}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

            {/* Mostrar el código QR generado (solo si no redirige automáticamente) */}
            {qrData && (
                <View style={styles.qrContainer}>
                    <Text style={styles.qrTitle}>Código QR para el Grupo</Text>
                    <QRCode value={qrData} size={200} />
                    <Text>Escanea este código QR para unirte al grupo de la materia.</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    materiaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    materiaItem: {
        fontSize: 16,
    },
    actionsContainer: {
        flexDirection: 'row',
    },
    selectButton: {
        backgroundColor: '#007bff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    deleteButton: {
        backgroundColor: '#d9534f',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    qrContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    qrTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default GruposProfesor;
