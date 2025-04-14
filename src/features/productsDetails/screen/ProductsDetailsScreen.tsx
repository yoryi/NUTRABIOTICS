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
import { auth } from "../../../common/config/firebaseConfig";
import {
  addFavorite,
  removeFavorite,
  getFavoritesByUser,
} from "../services/productsApi";
import { useProductDetails } from "../hooks/useProductDetails";

const ProductDetailsScreen = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, keyof RootStackParamList>>();
  const { productId } = route.params || {};
  const { product, loading } = useProductDetails(productId as number);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();

  const currentUser = auth.currentUser;

  useEffect(() => {
    const syncFavoriteStatus = async () => {
      if (!currentUser) return;
      const favorites = await getFavoritesByUser(currentUser.uid);
      const exists = favorites.some(
        (item: { itemId: string }) => String(item.itemId) === String(productId)
      );

      const localFavorites = await AsyncStorage.getItem("favorites");
      const parsedLocal = localFavorites ? JSON.parse(localFavorites) : [];

      if (exists && !parsedLocal.find((i: any) => i.id === productId)) {
        parsedLocal.push(product);
        await AsyncStorage.setItem("favorites", JSON.stringify(parsedLocal));
      }

      setIsFavorite(exists);
    };

    if (productId && product) {
      syncFavoriteStatus();
    }
  }, [productId, product]);

  const handleFavoritePress = async () => {
    if (!currentUser || !product) return;
    try {
      const idProduct = product.id.toString();
      const localFavorites = await AsyncStorage.getItem("favorites");
      let parsed = localFavorites ? JSON.parse(localFavorites) : [];

      if (isFavorite) {
        await removeFavorite(currentUser.uid, idProduct);
        parsed = parsed.filter((item: any) => item.itemId !== idProduct);
      } else {
        await addFavorite({
          userId: currentUser.uid,
          itemId: idProduct,
          itemData: product,
        });
        parsed.push(product);
      }
      await AsyncStorage.setItem("favorites", JSON.stringify(parsed));
      setIsFavorite(prev => !prev);
    } catch (error) {
      console.error("Error al manejar favoritos:", error);
    }
  };

  if (loading || !product) {
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
