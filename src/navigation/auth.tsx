import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

import Login from "../features/login/screen/LoginScreen";
import Register from "../features/register/screen/RegisterScreen";
import MainTabs from "./mainTabs";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function Auth() {
  return (
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}
