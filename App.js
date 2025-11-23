import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { Text, View, StyleSheet } from 'react-native';

// Componentes
import Home from './componentes/Home';
import Films from './componentes/Films';
import Login from './componentes/Login';
import Registro from './componentes/Registro';
import Perfil from './componentes/Perfil';
import Logout from './componentes/Logout';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Iconos simples con emoji
function TabIcon({ emoji, focused }) {
  return (
    <View style={[styles.iconContainer, focused && styles.iconFocused]}>
      <Text style={styles.emoji}>{emoji}</Text>
    </View>
  );
}

// Navegación para usuarios autenticados
function TabsAutenticado() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a2e',
        },
        headerTintColor: '#FFE81F',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: '#16213e',
          borderTopColor: '#FFE81F',
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: '#FFE81F',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen 
        name="Personajes" 
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} />,
          headerTitle: 'Star Wars - Personajes',
        }}
      />
      <Tab.Screen 
        name="Películas" 
        component={Films}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🎬" focused={focused} />,
          headerTitle: 'Star Wars - Películas',
        }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={Perfil}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="⚙️" focused={focused} />,
          headerTitle: 'Mi Perfil',
        }}
      />
      <Tab.Screen 
        name="Salir" 
        component={Logout}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🚪" focused={focused} />,
          headerTitle: 'Cerrar Sesión',
        }}
      />
    </Tab.Navigator>
  );
}

// Navegación para usuarios no autenticados
function StackNoAutenticado() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a2e',
        },
        headerTintColor: '#FFE81F',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Registro" 
        component={Registro}
        options={{ 
          headerTitle: 'Registro',
          headerBackTitle: 'Volver',
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
    });

    return unsubscribe;
  }, []);

  if (cargando) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>STAR WARS</Text>
        <Text style={styles.loadingSubtext}>Cargando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {usuario ? <TabsAutenticado /> : <StackNoAutenticado />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  loadingText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFE81F',
    letterSpacing: 4,
  },
  loadingSubtext: {
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  iconContainer: {
    padding: 5,
  },
  iconFocused: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFE81F',
  },
  emoji: {
    fontSize: 24,
  },
});