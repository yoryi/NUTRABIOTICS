import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "./navigation/auth";
import { useAuth } from "./common/utils";
import MainTabs from "./navigation/mainTabs";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const isAuthenticated = useAuth();
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAppReady(true);
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  if (!isAppReady) return null;

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabs /> : <Auth />}
    </NavigationContainer>
  );
}
