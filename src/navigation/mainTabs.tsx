import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";

import ProductsScreen from "../features/products/screen/ProductsScreen";
const Tab = createBottomTabNavigator();

const Favoritos = () => (
  <View style={styles.center}>
    <Text>Favoritos</Text>
  </View>
);

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Productos" component={ProductsScreen} />
    <Tab.Screen name="Favoritos" component={Favoritos} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    marginTop: 20,
    color: "blue",
  },
});

export default MainTabs;
