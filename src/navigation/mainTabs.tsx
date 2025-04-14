import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FavoritesScreen from "../features/favorite/screen/FavoriteScreen";
import ProductsScreen from "../features/products/screen/ProductsScreen";
import ProductDetails from "../features/productsDetails/screen/ProductsDetailsScreen";
import { RootStackParamList } from "../types/navigation";
import { TouchableOpacity } from "react-native";
import { logOut } from "../common/utils";
import colors from "../common/config/colors";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const ProductStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProductosMain" component={ProductsScreen} />
    <Stack.Screen name="ProductDetails" component={ProductDetails} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <>
    <StatusBar style="light" />
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.grayDark,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerTintColor: colors.headerText,
      }}
    >
      <Tab.Screen
        name="Productos"
        component={ProductStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={logOut}>
              <Ionicons
                size={24}
                color={colors.headerText}
                name="log-out"
                style={{ marginRight: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  </>
);

export default MainTabs;
