import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../../common/config/firebaseConfig";
import {
  getFavoritesByUser,
  removeFavorite,
} from "../../productsDetails/services/productsApi";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const currentUser = auth.currentUser;

  const fetchFavorites = async () => {
    if (!currentUser) return;
    try {
      const favoritesFromFirebase = await getFavoritesByUser(currentUser.uid);
      await AsyncStorage.setItem(
        "favorites",
        JSON.stringify(favoritesFromFirebase)
      );
      setFavorites(favoritesFromFirebase);
    } catch (error) {
      console.error("Error fetching favorites: ", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const handleRemoveFavorite = async (productId: string) => {
    if (!currentUser) return;
    try {
      await removeFavorite(currentUser.uid, productId);
      const updated = favorites.filter(fav => fav.id !== productId);
      await AsyncStorage.setItem("favorites", JSON.stringify(updated));
      setFavorites(updated);
      Alert.alert("Producto eliminado", "Se eliminó de tus favoritos.");
    } catch (err) {
      console.error("Error removing favorite:", err);
      Alert.alert("Error", "No se pudo eliminar de favoritos.");
    }
  };
  

  const renderFavoriteItem = ({ item }: { item: any }) => (
    <View style={styles.favoriteItem}>
      <Image source={{ uri: item.itemData.image }} style={styles.productImage} />
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteTitle}>{item.itemData.title}</Text>
        <Text style={styles.favoritePrice}>${item.itemData.price}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveFavorite(item.itemId)}
        >
          <Ionicons name="trash-bin" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Favoritos</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No tienes productos en favoritos.</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => String(item.id)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 40,
  },
  favoriteItem: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  favoriteInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  favoriteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  favoritePrice: {
    fontSize: 16,
    color: "#777",
  },
  removeButton: {
    backgroundColor: "#FF6347",
    padding: 8,
    borderRadius: 50,
    alignSelf: "flex-start",
    marginTop: 8,
  },
});

export default FavoritesScreen;
