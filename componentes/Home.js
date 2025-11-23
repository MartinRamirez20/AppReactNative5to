import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function Home() {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerPersonajes = async () => {
      try {
        // API que incluye imágenes
        const res = await fetch("https://akabab.github.io/starwars-api/api/all.json");
        const json = await res.json();
        setPersonajes(json);
        setCargando(false);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los datos');
        setCargando(false);
      }
    };

    obtenerPersonajes();
  }, []);

  // Componente para manejar imágenes con fallback
  const ImagenPersonaje = ({ uri, nombre }) => {
    const [errorImagen, setErrorImagen] = useState(false);
    
    // Placeholder con iniciales si la imagen falla
    if (errorImagen || !uri) {
      return (
        <View style={styles.imagenPlaceholder}>
          <Text style={styles.iniciales}>
            {nombre ? nombre.charAt(0).toUpperCase() : '?'}
          </Text>
        </View>
      );
    }

    return (
      <Image
        source={{ uri }}
        style={styles.imagen}
        onError={() => setErrorImagen(true)}
      />
    );
  };

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
      <Text style={styles.subtitulo}>{personajes.length} personajes encontrados</Text>
      <View style={styles.lista}>
        {personajes.map((personaje) => (
          <TouchableOpacity key={personaje.id} style={styles.item}>
            <ImagenPersonaje uri={personaje.image} nombre={personaje.name} />
            <Text style={styles.nombre}>{personaje.name}</Text>
            <View style={styles.detalles}>
              {personaje.species && (
                <Text style={styles.detalle}>Especie: {personaje.species}</Text>
              )}
              {personaje.height && (
                <Text style={styles.detalle}>Estatura: {personaje.height} m</Text>
              )}
              {personaje.mass && (
                <Text style={styles.detalle}>Peso: {personaje.mass} kg</Text>
              )}
              {personaje.homeworld && (
                <Text style={styles.detalle}>Nacionalidad: {personaje.homeworld}</Text>
              )}
              {personaje.gender && (
                <Text style={styles.detalle}>Genero: {personaje.gender}</Text>
              )}
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
    marginTop: 20,
  },
  subtitulo: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
    marginBottom: 15,
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
  imagenPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#0f3460',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iniciales: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFE81F',
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