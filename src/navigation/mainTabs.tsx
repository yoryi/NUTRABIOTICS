import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProductsScreen from "../features/products/screen/ProductsScreen";
import FavoritesScreen from "../features/favorite/screen/FavoriteScreen";

const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Productos" component={ProductsScreen} />
    <Tab.Screen name="Favoritos" component={FavoritesScreen} />
  </Tab.Navigator>
);

export default MainTabs;
