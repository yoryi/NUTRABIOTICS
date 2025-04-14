import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../../../types/navigation";
import { Ionicons } from "@expo/vector-icons";

const ProductDetailsScreen = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, keyof RootStackParamList>>();
  const { productId } = route.params || {};
  const [product, setProduct] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );
      const data = await response.json();
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const checkFavorite = async () => {
      const favorites = await AsyncStorage.getItem("favorites");
      const parsedFavorites = favorites ? JSON.parse(favorites) : [];
      const exists = parsedFavorites.some((item: any) => item.id === productId);
      setIsFavorite(exists);
    };

    if (productId) {
      checkFavorite();
    }
  }, [productId]);

  const handleFavoritePress = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      const parsedFavorites = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        const updatedFavorites = parsedFavorites.filter(
          (item: any) => item.id !== product.id
        );
        await AsyncStorage.setItem(
          "favorites",
          JSON.stringify(updatedFavorites)
        );
      } else {
        parsedFavorites.push(product);
        await AsyncStorage.setItem(
          "favorites",
          JSON.stringify(parsedFavorites)
        );
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error al manejar favoritos:", error);
    }
  };

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Cargando detalles del producto...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productCategory}>{product.category}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productPrice}>${product.price}</Text>
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              isFavorite && styles.favoriteButtonActive,
            ]}
            onPress={handleFavoritePress}
          >
            <Text style={styles.favoriteButtonText}>
              {isFavorite ? "Eliminar de favoritos" : "Agregar a favoritos"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 16,
    padding: 8,
    backgroundColor: "#000",
    borderRadius: 50,
    zIndex: 1,
  },
  productImage: {
    width: "100%",
    height: 300,
    borderRadius: 16,
    marginTop: 80,
    marginBottom: 16,
  },
  productInfo: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  productTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  productCategory: {
    fontSize: 18,
    color: "#888",
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  favoriteButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  favoriteButtonActive: {
    backgroundColor: "#FF6347",
  },
  favoriteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    fontSize: 18,
    color: "#333",
  },
});

export default ProductDetailsScreen;
