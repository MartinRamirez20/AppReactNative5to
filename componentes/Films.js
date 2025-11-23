import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

// Datos de películas con imágenes (SWAPI no incluye imágenes)
const PELICULAS_DATA = [
  {
    id: 1,
    episode_id: 4,
    title: "A New Hope",
    director: "George Lucas",
    producer: "Gary Kurtz, Rick McCallum",
    release_date: "1977-05-25",
    opening_crawl: "It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire...",
    image: "https://m.media-amazon.com/images/I/81aA7hEEykL._AC_SY679_.jpg"
  },
  {
    id: 2,
    episode_id: 5,
    title: "The Empire Strikes Back",
    director: "Irvin Kershner",
    producer: "Gary Kurtz, Rick McCallum",
    release_date: "1980-05-17",
    opening_crawl: "It is a dark time for the Rebellion. Although the Death Star has been destroyed, Imperial troops have driven the Rebel forces from their hidden base...",
    image: "https://m.media-amazon.com/images/I/91gPwApIdRL._AC_SY679_.jpg"
  },
  {
    id: 3,
    episode_id: 6,
    title: "Return of the Jedi",
    director: "Richard Marquand",
    producer: "Howard G. Kazanjian, George Lucas, Rick McCallum",
    release_date: "1983-05-25",
    opening_crawl: "Luke Skywalker has returned to his home planet of Tatooine in an attempt to rescue his friend Han Solo from the clutches of the vile gangster Jabba the Hutt...",
    image: "https://m.media-amazon.com/images/I/91LlN7J+Z9L._AC_SY679_.jpg"
  },
  {
    id: 4,
    episode_id: 1,
    title: "The Phantom Menace",
    director: "George Lucas",
    producer: "Rick McCallum",
    release_date: "1999-05-19",
    opening_crawl: "Turmoil has engulfed the Galactic Republic. The taxation of trade routes to outlying star systems is in dispute...",
    image: "https://m.media-amazon.com/images/I/81lSbU4jKnL._AC_SY679_.jpg"
  },
  {
    id: 5,
    episode_id: 2,
    title: "Attack of the Clones",
    director: "George Lucas",
    producer: "Rick McCallum",
    release_date: "2002-05-16",
    opening_crawl: "There is unrest in the Galactic Senate. Several thousand solar systems have declared their intentions to leave the Republic...",
    image: "https://m.media-amazon.com/images/I/71FqSa7lQ3L._AC_SY679_.jpg"
  },
  {
    id: 6,
    episode_id: 3,
    title: "Revenge of the Sith",
    director: "George Lucas",
    producer: "Rick McCallum",
    release_date: "2005-05-19",
    opening_crawl: "War! The Republic is crumbling under attacks by the ruthless Sith Lord, Count Dooku. There are heroes on both sides. Evil is everywhere...",
    image: "https://m.media-amazon.com/images/I/71WjrvA3KIL._AC_SY679_.jpg"
  },
  {
    id: 7,
    episode_id: 7,
    title: "The Force Awakens",
    director: "J.J. Abrams",
    producer: "Kathleen Kennedy, J.J. Abrams, Bryan Burk",
    release_date: "2015-12-11",
    opening_crawl: "Luke Skywalker has vanished. In his absence, the sinister FIRST ORDER has risen from the ashes of the Empire and will not rest until Skywalker, the last Jedi, has been destroyed...",
    image: "https://m.media-amazon.com/images/I/81RYmJKOwnL._AC_SY679_.jpg"
  },
  {
    id: 8,
    episode_id: 8,
    title: "The Last Jedi",
    director: "Rian Johnson",
    producer: "Kathleen Kennedy, Ram Bergman",
    release_date: "2017-12-09",
    opening_crawl: "The FIRST ORDER reigns. Having decimated the peaceful Republic, Supreme Leader Snoke now deploys his merciless legions to seize military control of the galaxy...",
    image: "https://m.media-amazon.com/images/I/81dwDMvLqBL._AC_SY679_.jpg"
  },
  {
    id: 9,
    episode_id: 9,
    title: "The Rise of Skywalker",
    director: "J.J. Abrams",
    producer: "Kathleen Kennedy, J.J. Abrams, Michelle Rejwan",
    release_date: "2019-12-16",
    opening_crawl: "The dead speak! The galaxy has heard a mysterious broadcast, a threat of REVENGE in the sinister voice of the late EMPEROR PALPATINE...",
    image: "https://m.media-amazon.com/images/I/81R0gfeYcML._AC_SY679_.jpg"
  }
];

export default function Films() {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Ordenar por episodio
    const ordenadas = [...PELICULAS_DATA].sort((a, b) => a.episode_id - b.episode_id);
    setPeliculas(ordenadas);
    setCargando(false);
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
        <TouchableOpacity key={film.id} style={styles.card}>
          <Image
            source={{ uri: film.image }}
            style={styles.imagen}
          />
          <View style={styles.info}>
            <Text style={styles.episodio}>Episodio {film.episode_id}</Text>
            <Text style={styles.nombre}>{film.title}</Text>
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