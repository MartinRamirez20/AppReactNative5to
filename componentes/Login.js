import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!correo || !contrasena) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
    } catch (error) {
      Alert.alert('Error al iniciar sesión', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.logoText}>STAR WARS</Text>
        <Text style={styles.titulo}>Iniciar Sesión</Text>

        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor="#888"
          value={correo}
          onChangeText={setCorreo}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#888"
          value={contrasena}
          onChangeText={setContrasena}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.boton} onPress={handleLogin}>
          <Text style={styles.botonTexto}>INGRESAR</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botonSecundario} 
          onPress={() => navigation.navigate('Registro')}
        >
          <Text style={styles.botonSecundarioTexto}>
            ¿No tienes cuenta? Regístrate
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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