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
      setIsFavorite((prev) => !prev);
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
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
    backgroundColor: "#F4F6F5",
  },
  scrollContent: {
    paddingBottom: 32,
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 16,
    padding: 8,
    backgroundColor: "#333",
    borderRadius: 50,
    zIndex: 1,
  },
  productImage: {
    width: "100%",
    height: 300,
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  productInfo: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  productTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },
  productCategory: {
    fontSize: 16,
    color: "#999",
    marginBottom: 6,
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
    backgroundColor: "#35956F",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  favoriteButtonActive: {
    backgroundColor: "#FF6B6B",
  },
  favoriteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F6F5",
  },
  loadingText: {
    fontSize: 18,
    color: "#333",
  },
});

export default ProductDetailsScreen;
