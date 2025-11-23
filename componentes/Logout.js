import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function Logout() {
  useEffect(() => {
    const cerrarSesion = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    };
    cerrarSesion();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FFE81F" />
      <Text style={styles.texto}>Cerrando sesión...</Text>
      <Text style={styles.subtexto}>Que la Fuerza te acompañe</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  texto: {
    marginTop: 20,
    color: '#FFE81F',
    fontSize: 18,
  },
  subtexto: {
    marginTop: 10,
    color: '#888',
    fontSize: 14,
    fontStyle: 'italic',
  },
});