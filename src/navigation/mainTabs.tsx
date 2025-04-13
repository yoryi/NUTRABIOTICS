import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const Productos = () => (
  <View style={styles.center}>
    <Text>Productos</Text>
  </View>
);

const Favoritos = () => (
  <View style={styles.center}>
    <Text>Favoritos</Text>
  </View>
);

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Productos" component={Productos} />
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
