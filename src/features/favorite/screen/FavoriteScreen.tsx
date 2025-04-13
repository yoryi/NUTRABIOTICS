import React, { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  const fetchFavorites = async () => {
    try {
      const localFavorites = await AsyncStorage.getItem('favorites');
      const parsedLocalFavorites = localFavorites ? JSON.parse(localFavorites) : [];
      setFavorites(parsedLocalFavorites);
    } catch (error) {
      console.error("Error fetching favorites: ", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const handleRemoveFavorite = async (productId: number) => {
    try {
      const localFavorites = await AsyncStorage.getItem('favorites');
      const parsedLocalFavorites = localFavorites ? JSON.parse(localFavorites) : [];
      const updatedLocalFavorites = parsedLocalFavorites.filter((item: any) => item.id !== productId);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedLocalFavorites));
      setFavorites(updatedLocalFavorites);
      Alert.alert("Producto eliminado", "El producto se ha eliminado de tus favoritos.");
    } catch (error) {
      console.error("Error removing favorite: ", error);
      Alert.alert("Error", "Hubo un problema al eliminar el producto de favoritos.");
    }
  };

  const renderFavoriteItem = ({ item }: { item: any }) => (
    <View style={styles.favoriteItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteTitle}>{item.title}</Text>
        <Text style={styles.favoritePrice}>${item.price}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveFavorite(item.id)}
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
    shadowColor: '#000',
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
