import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function Home() {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerPersonajes = async () => {
      try {
        const res = await fetch("https://www.swapi.tech/api/people?page=1&limit=20");
        const json = await res.json();
        
        // Obtener detalles de cada personaje
        const detalles = await Promise.all(
          json.results.map(async (p) => {
            const detRes = await fetch(p.url);
            const detJson = await detRes.json();
            return {
              uid: p.uid,
              name: p.name,
              ...detJson.result.properties
            };
          })
        );
        
        setPersonajes(detalles);
        setCargando(false);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los datos');
        setCargando(false);
      }
    };

    obtenerPersonajes();
  }, []);

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#FFE81F" />
        <Text style={styles.textoCargando}>Cargando personajes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.textoError}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.contenedor}>
      <Text style={styles.titulo}>Personajes de Star Wars</Text>
      <View style={styles.lista}>
        {personajes.map((personaje) => (
          <TouchableOpacity key={personaje.uid} style={styles.item}>
            <Image
              source={{
                uri: `https://starwars-visualguide.com/assets/img/characters/${personaje.uid}.jpg`,
              }}
              style={styles.imagen}
              defaultSource={{ uri: 'https://via.placeholder.com/120' }}
            />
            <Text style={styles.nombre}>{personaje.name}</Text>
            <View style={styles.detalles}>
              <Text style={styles.detalle}>{personaje.birth_year}</Text>
              <Text style={styles.detalle}>{personaje.height} cm</Text>
              <Text style={styles.detalle}>{personaje.mass} kg</Text>
              <Text style={styles.detalle}>{personaje.eye_color}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFE81F',
    marginVertical: 20,
  },
  lista: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  item: {
    backgroundColor: '#16213e',
    width: '48%',
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFE81F',
  },
  imagen: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover',
    backgroundColor: '#0f3460',
  },
  nombre: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFE81F',
    textAlign: 'center',
    marginTop: 8,
  },
  detalles: {
    marginTop: 5,
    alignItems: 'flex-start',
    width: '100%',
  },
  detalle: {
    fontSize: 11,
    color: '#e0e0e0',
    marginTop: 2,
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
  textoError: {
    color: '#ff6b6b',
    fontSize: 16,
  },
});