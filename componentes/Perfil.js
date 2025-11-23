import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function Perfil() {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [telefono, setTelefono] = useState('');
  const [personajeFavorito, setPersonajeFavorito] = useState('');
  const [correo, setCorreo] = useState('');
  const [cargando, setCargando] = useState(true);

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;
    const traerDatos = async () => {
      try {
        const docRef = doc(db, 'usuarios', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombre(data.nombre || '');
          setFecha(data.fecha || '');
          setTelefono(data.telefono || '');
          setPersonajeFavorito(data.personajeFavorito || '');
          setCorreo(data.correo || auth.currentUser?.email || '');
        } else {
          Alert.alert('Usuario no encontrado');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error al cargar datos');
      }
      setCargando(false);
    };
    traerDatos();
  }, [uid]);

  const actualizarDatos = async () => {
    try {
      const docRef = doc(db, 'usuarios', uid);
      await updateDoc(docRef, {
        nombre,
        fecha,
        telefono,
        personajeFavorito,
      });
      Alert.alert('¡Que la Fuerza te acompañe!', 'Datos actualizados correctamente');
    } catch (error) {
      console.error(error);
      Alert.alert('Error al actualizar');
    }
  };

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#FFE81F" />
        <Text style={styles.textoCargando}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.contenedor}>
      <View style={styles.contenido}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {nombre ? nombre.charAt(0).toUpperCase() : '?'}
          </Text>
        </View>
        
        <Text style={styles.titulo}>Perfil del Jedi</Text>
        <Text style={styles.correo}>{correo}</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Tu nombre"
          placeholderTextColor="#888"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Fecha de nacimiento</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#888"
          value={fecha}
          onChangeText={setFecha}
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Tu teléfono"
          placeholderTextColor="#888"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Personaje favorito</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Luke Skywalker"
          placeholderTextColor="#888"
          value={personajeFavorito}
          onChangeText={setPersonajeFavorito}
        />

        <TouchableOpacity style={styles.boton} onPress={actualizarDatos}>
          <Text style={styles.botonTexto}>GUARDAR CAMBIOS</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  contenido: {
    padding: 20,
  },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  textoCargando: {
    marginTop: 10,
    color: '#FFE81F',
    fontSize: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFE81F',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFE81F',
    textAlign: 'center',
    marginBottom: 5,
  },
  correo: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 25,
  },
  label: {
    color: '#FFE81F',
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFE81F',
    backgroundColor: '#16213e',
    color: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#FFE81F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botonTexto: {
    color: '#1a1a2e',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 2,
  },
});