import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import AuthNavigator from "./navigation/authNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAppReady(true);
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  if (!isAppReady) {
    return null;
  }

  return <AuthNavigator />;
}
