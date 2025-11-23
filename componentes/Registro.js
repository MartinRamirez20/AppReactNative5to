import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [fecha, setFecha] = useState('');
  const [telefono, setTelefono] = useState('');
  const [personajeFavorito, setPersonajeFavorito] = useState('');
  const navigation = useNavigation();

  const handleRegistro = async () => {
    if (!nombre || !correo || !contrasena) {
      Alert.alert('Error', 'Por favor completa los campos obligatorios');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const user = userCredential.user;

      await setDoc(doc(db, 'usuarios', user.uid), {
        uid: user.uid,
        nombre,
        correo,
        fecha,
        telefono,
        personajeFavorito,
        peliculasFavoritas: [],
        creadoEn: new Date().toISOString()
      });

      Alert.alert('¡Bienvenido a la galaxia!', 'Usuario registrado correctamente');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error al registrarse', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contenido}>
        <Text style={styles.logoText}>STAR WARS</Text>
        <Text style={styles.titulo}>Únete a la Alianza</Text>

        <TextInput 
          placeholder="Nombre *" 
          placeholderTextColor="#888"
          value={nombre} 
          onChangeText={setNombre} 
          style={styles.input} 
        />
        <TextInput 
          placeholder="Correo electrónico *" 
          placeholderTextColor="#888"
          value={correo} 
          onChangeText={setCorreo} 
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput 
          placeholder="Contraseña *" 
          placeholderTextColor="#888"
          value={contrasena} 
          onChangeText={setContrasena} 
          secureTextEntry 
          style={styles.input} 
        />
        <TextInput 
          placeholder="Fecha de nacimiento (YYYY-MM-DD)" 
          placeholderTextColor="#888"
          value={fecha} 
          onChangeText={setFecha} 
          style={styles.input} 
        />
        <TextInput 
          placeholder="Teléfono" 
          placeholderTextColor="#888"
          value={telefono} 
          onChangeText={setTelefono} 
          keyboardType="phone-pad" 
          style={styles.input} 
        />
        <TextInput 
          placeholder="Personaje favorito de Star Wars" 
          placeholderTextColor="#888"
          value={personajeFavorito} 
          onChangeText={setPersonajeFavorito} 
          style={styles.input} 
        />

        <TouchableOpacity style={styles.boton} onPress={handleRegistro}>
          <Text style={styles.botonTexto}>REGISTRARSE</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botonSecundario} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.botonSecundarioTexto}>
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1a1a2e',
  },
  contenido: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFE81F',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 4,
  },
  titulo: { 
    fontSize: 22, 
    marginBottom: 30, 
    textAlign: 'center',
    color: '#e0e0e0',
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
  botonSecundario: {
    marginTop: 20,
    alignItems: 'center',
  },
  botonSecundarioTexto: {
    color: '#FFE81F',
    fontSize: 14,
  },
});