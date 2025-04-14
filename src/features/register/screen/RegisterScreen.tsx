import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { RootStackParamList } from "../../../types/navigation";
import { useRegister } from "../hooks/useRegister";
import colors from "../../../common/config/colors";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { register, loading, error, data } = useRegister();

  useEffect(() => {
    if (data) {
      Alert.alert(
        "¡Registro exitoso!",
        "Tu cuenta ha sido creada correctamente."
      );
      navigation.navigate("Login");
    } else if (error) {
      Alert.alert(
        "Error",
        "No se pudo completar el registro. Intenta de nuevo."
      );
    }
  }, [data, error]);

  const handleRegister = () => {
    if (!email || !password) {
      return Alert.alert("Error", "Por favor completa todos los campos.");
    }
    register(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea tu cuenta</Text>
      <Text style={styles.subtitle}>Regístrate para empezar a usar la app</Text>

      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.colorInput,
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    backgroundColor: colors.colorInput,
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 16,
    borderRadius: 10,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    textAlign: "center",
    marginTop: 24,
    color: colors.secondary,
  },
});
