import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, Dimensions } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Original() {
  const [color, setColor] = useState("blue");
  const [hilt, setHilt] = useState("classic");
  const [encendido, setEncendido] = useState(false);
  
  const bladeOpacity = useRef(new Animated.Value(0)).current;
  const bladeHeight = useRef(new Animated.Value(0)).current;

  const BLADE_MAX_HEIGHT = SCREEN_HEIGHT * 0.22;
  const BLADE_WIDTH = 10;

  const encenderSable = () => {
    setEncendido(true);
    Animated.parallel([
      Animated.timing(bladeOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(bladeHeight, {
        toValue: BLADE_MAX_HEIGHT,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const apagarSable = () => {
    Animated.parallel([
      Animated.timing(bladeOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(bladeHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => setEncendido(false));
  };

  const toggleSable = () => {
    encendido ? apagarSable() : encenderSable();
  };

  // Mangos proporcionales al ancho del sable
  const hilts = {
    classic: { 
      width: BLADE_WIDTH + 20, 
      height: 50, 
      backgroundColor: "#666",
      borderRadius: 3,
    },
    dark: { 
      width: BLADE_WIDTH + 25, 
      height: 55, 
      backgroundColor: "#1a1a1a",
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "#ff3333",
    },
    jedi: { 
      width: BLADE_WIDTH + 18, 
      height: 48, 
      backgroundColor: "#888",
      borderRadius: 3,
    },
  };

  const glowColor = {
    blue: "rgba(0, 150, 255, 0.9)",
    green: "rgba(0, 255, 0, 0.9)",
    red: "rgba(255, 0, 0, 0.9)",
    purple: "rgba(150, 0, 255, 0.9)",
    yellow: "rgba(255, 255, 0, 0.9)",
  };

  const colorNames = {
    blue: "Azul",
    green: "Verde", 
    red: "Rojo",
    purple: "Morado",
    yellow: "Amarillo",
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Crea tu Sable Láser</Text>

      {/* Sable */}
      <View style={[styles.saberContainer, { height: BLADE_MAX_HEIGHT + 80 }]}>
        {/* Hoja */}
        <Animated.View
          style={[
            styles.blade,
            {
              width: BLADE_WIDTH,
              backgroundColor: color,
              opacity: bladeOpacity,
              height: bladeHeight,
              shadowColor: glowColor[color],
            },
          ]}
        />
        {/* Conector hoja-mango */}
        <View style={[styles.connector, { width: BLADE_WIDTH + 8 }]} />
        {/* Mango */}
        <TouchableOpacity onPress={toggleSable} activeOpacity={0.7}>
          <View style={[styles.hilt, hilts[hilt]]}>
            <View style={[styles.hiltButton, { backgroundColor: encendido ? color : "#333" }]} />
            <View style={styles.hiltGrip} />
            <View style={styles.hiltGrip} />
            <View style={styles.hiltGrip} />
          </View>
        </TouchableOpacity>
        {/* Base del mango */}
        <View style={[styles.hiltBase, { width: hilts[hilt].width - 5 }]} />
      </View>

      <Text style={styles.hint}>
        {encendido ? "Toca el mango para apagar" : "Toca el mango para encender"}
      </Text>

      {/* Colores */}
      <Text style={styles.sectionTitle}>Color del Cristal Kyber</Text>
      <View style={styles.row}>
        {["blue", "green", "red", "purple", "yellow"].map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setColor(c)}
            style={[
              styles.colorBtn,
              { backgroundColor: c },
              color === c && styles.colorBtnSelected,
            ]}
          />
        ))}
      </View>

      {/* Mangos */}
      <Text style={styles.sectionTitle}>Tipo de Mango</Text>
      <View style={styles.row}>
        {[
          { key: "classic", label: "Clásico" },
          { key: "dark", label: "Sith" },
          { key: "jedi", label: "Jedi" },
        ].map((type) => (
          <TouchableOpacity
            key={type.key}
            onPress={() => setHilt(type.key)}
            style={[
              styles.hiltBtn,
              hilt === type.key && styles.hiltBtnSelected,
            ]}
          >
            <Text style={[
              styles.hiltBtnText,
              hilt === type.key && styles.hiltBtnTextSelected,
            ]}>
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Tu Sable Láser</Text>
        <Text style={styles.infoText}>
          Cristal: <Text style={{ color: color, fontWeight: "bold" }}>{colorNames[color]}</Text>
        </Text>
        <Text style={styles.infoText}>
          Mango: {hilt === "classic" ? "Clásico" : hilt === "dark" ? "Sith" : "Jedi"}
        </Text>
        <Text style={styles.infoText}>
          Estado: {encendido ? "🟢 Encendido" : "⚫ Apagado"}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    padding: 15,
    paddingBottom: 30,
  },
  title: {
    color: "#FFE81F",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "bold",
  },
  saberContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 10,
  },
  blade: {
    borderRadius: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 15,
  },
  connector: {
    height: 8,
    backgroundColor: "#444",
    borderRadius: 2,
  },
  hilt: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    paddingVertical: 5,
  },
  hiltButton: {
    width: 12,
    height: 6,
    borderRadius: 2,
    marginBottom: 3,
  },
  hiltGrip: {
    width: "70%",
    height: 3,
    backgroundColor: "#333",
    borderRadius: 1,
    marginVertical: 2,
  },
  hiltBase: {
    height: 10,
    backgroundColor: "#444",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  hint: {
    color: "#666",
    textAlign: "center",
    fontSize: 12,
    marginBottom: 15,
    fontStyle: "italic",
  },
  sectionTitle: {
    color: "#FFE81F",
    fontSize: 15,
    marginBottom: 8,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 15,
  },
  colorBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "transparent",
  },
  colorBtnSelected: {
    borderColor: "#FFE81F",
    transform: [{ scale: 1.15 }],
  },
  hiltBtn: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#333",
  },
  hiltBtnSelected: {
    backgroundColor: "#FFE81F",
    borderColor: "#FFE81F",
  },
  hiltBtnText: {
    color: "#888",
    fontSize: 14,
  },
  hiltBtnTextSelected: {
    color: "#000",
    fontWeight: "bold",
  },
  infoContainer: {
    backgroundColor: "#0a0a0a",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#222",
  },
  infoTitle: {
    color: "#FFE81F",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
  },
  infoText: {
    color: "#aaa",
    fontSize: 13,
    marginBottom: 3,
  },
});