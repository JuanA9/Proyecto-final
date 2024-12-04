import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import XLSX from 'xlsx';
import { Buffer } from 'buffer'; // Librería para manejar datos binarios
import { AsistenciaContext } from '../context/AsistenciaContext';

const PasedeLista = () => {
    const { asistencia, setAsistencia } = useContext(AsistenciaContext) || { asistencia: [], setAsistencia: () => {} };

    const [nombre, setNombre] = useState('');
    const [horaEntrada, setHoraEntrada] = useState('');
    const [numeroControl, setNumeroControl] = useState('');

    const registrarAsistencia = () => {
        if (!nombre || !numeroControl) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        const horaActual = horaEntrada || new Date().toLocaleTimeString();

        const nuevaAsistencia = {
            nombre,
            numeroControl,
            horaEntrada: horaActual,
            presente: true,
        };

        setAsistencia([...asistencia, nuevaAsistencia]);

        Alert.alert('Asistencia registrada', `La asistencia de ${nombre} ha sido registrada.`);
        setNombre('');
        setHoraEntrada('');
        setNumeroControl('');
    };

    const limpiarAsistencia = () => {
        if (asistencia.length === 0) {
            Alert.alert('Aviso', 'La lista de asistencia ya está vacía.');
            return;
        }

        Alert.alert(
            'Confirmación',
            '¿Estás seguro de que deseas limpiar la lista de asistencia?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Aceptar', onPress: () => setAsistencia([]) },
            ]
        );
    };

    const exportarExcel = async () => {
        if (asistencia.length === 0) {
            Alert.alert('Error', 'No hay registros de asistencia para exportar.');
            return null;
        }

        try {
            // Crear una hoja de Excel con los datos
            const ws = XLSX.utils.json_to_sheet(asistencia);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Asistencia');

            // Generar el archivo Excel como binario
            const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

            // Convertir el archivo binario a un buffer
            const binaryBuffer = Buffer.from(excelFile, 'binary');

            // Guardar el archivo en el sistema
            const path = FileSystem.documentDirectory + 'asistencia.xlsx';
            await FileSystem.writeAsStringAsync(path, binaryBuffer.toString('base64'), {
                encoding: FileSystem.EncodingType.Base64,
            });

            return path; // Devolver el path del archivo generado
        } catch (error) {
            console.error('Error al exportar archivo Excel:', error);
            Alert.alert('Error', 'Hubo un problema al generar el archivo Excel.');
            return null;
        }
    };

    const descargarExcel = async () => {
        try {
            const filePath = await exportarExcel();
            if (filePath && (await Sharing.isAvailableAsync())) {
                await Sharing.shareAsync(filePath);
            } else {
                Alert.alert('Error', 'No se puede compartir este archivo en tu dispositivo.');
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo descargar el archivo.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Registrar Asistencia</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre del Estudiante"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Número de Control"
                value={numeroControl}
                onChangeText={setNumeroControl}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Hora de Entrada (Ej. 10:00 AM)"
                value={horaEntrada}
                onChangeText={setHoraEntrada}
            />

               <Button title="Registrar Asistencia" onPress={registrarAsistencia} color="green" />
               <Button title="Descargar Lista de Asistencia" onPress={descargarExcel} color="green" />
            <Button title="Limpiar Lista de Asistencia" onPress={limpiarAsistencia} color="green" />


            <Text style={styles.subHeader}>Lista de Asistencia</Text>
            <ScrollView contentContainerStyle={styles.listContainer}>
                {asistencia.length > 0 ? (
                    asistencia.map((estudiante, index) => (
                        <View key={index} style={styles.studentContainer}>
                            <Text style={styles.studentName}>{estudiante.nombre}</Text>
                            <Text style={styles.studentControl}>{estudiante.numeroControl}</Text>
                            <Text style={styles.status}>{estudiante.presente ? 'Presente' : 'Ausente'}</Text>
                            <Text style={styles.time}>{estudiante.horaEntrada}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noDataText}>No hay registros de asistencia.</Text>
                )}
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
        width: '100%',
    },
    listContainer: {
        padding: 10,
    },
    studentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    studentName: {
        fontWeight: 'bold',
    },
    studentControl: {
        color: 'gray',
    },
    status: {
        color: 'green',
        fontWeight: 'bold',
    },
    time: {
        fontStyle: 'italic',
    },
    noDataText: {
        textAlign: 'center',
        color: 'green',
        marginTop: 20,
    },
});


export default PasedeLista;
