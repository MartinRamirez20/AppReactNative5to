import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function Films() {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPeliculas = async () => {
      try {
        const res = await fetch("https://www.swapi.tech/api/films");
        const json = await res.json();
        
        // Obtener detalles de cada película
        const detalles = await Promise.all(
          json.result.map(async (film) => ({
            uid: film.uid,
            ...film.properties
          }))
        );
        
        // Ordenar por episodio
        detalles.sort((a, b) => a.episode_id - b.episode_id);
        setPeliculas(detalles);
        setCargando(false);
      } catch (err) {
        console.error(err);
        setCargando(false);
      }
    };

    obtenerPeliculas();
  }, []);

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#FFE81F" />
        <Text style={styles.textoCargando}>Cargando películas...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.contenedor}>
      <Text style={styles.titulo}>Películas de Star Wars</Text>
      {peliculas.map((film) => (
        <TouchableOpacity key={film.uid} style={styles.card}>
          <Image
            source={{
              uri: `https://starwars-visualguide.com/assets/img/films/${film.episode_id}.jpg`,
            }}
            style={styles.imagen}
          />
          <View style={styles.info}>
            <Text style={styles.episodio}>Episodio: {film.episode_id}</Text>
            <Text style={styles.nombre}>Titulo: {film.title}</Text>
            <Text style={styles.detalle}>Director: {film.director}</Text>
            <Text style={styles.detalle}>Productor: {film.producer}</Text>
            <Text style={styles.detalle}>Fecha: {film.release_date}</Text>
            <Text style={styles.sinopsis} numberOfLines={3}>
              {film.opening_crawl}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
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
  card: {
    backgroundColor: '#16213e',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFE81F',
  },
  imagen: {
    width: 120,
    height: 180,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    padding: 10,
  },
  episodio: {
    color: '#888',
    fontSize: 12,
    marginBottom: 2,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFE81F',
    marginBottom: 5,
  },
  detalle: {
    fontSize: 11,
    color: '#e0e0e0',
    marginTop: 2,
  },
  sinopsis: {
    fontSize: 10,
    color: '#aaa',
    marginTop: 8,
    fontStyle: 'italic',
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
});