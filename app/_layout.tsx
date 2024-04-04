import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { MutableRefObject, useEffect } from "react";
import { ThemeProvider } from "@/hooks/useTheme";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n from "i18next";
import cnResource from "../i18n/cn/resource.json";

import "../global.css";

import enResource from "../i18n/en/resource.json";
import React from "react";
import { PortalProvider, usePortal } from "@/components/base/Portal";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export type PortalService = ReturnType<typeof usePortal>;
export const PortalRef =
  React.createRef<PortalService>() as MutableRefObject<PortalService>;
export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {}, []);
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const resources = {
    en: {
      translation: {
        ...(cnResource as any),
      },
    },
    cn: {
      translation: {
        ...(enResource as any),
      },
    },
  };
  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language
    interpolation: {
      escapeValue: false,
    },
  });

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  console.log("RootLayoutNav");
  const InitializePortalRef = () => {
    const portal = usePortal();
    PortalRef.current = portal;
    return null;
  };
  return (
    <ThemeProvider>
      <PortalProvider>
        <InitializePortalRef />
        <I18nextProvider i18n={i18n}>
          <Stack
            // initialRouteName="screens/register/register-process/profile-img/index"
            screenOptions={{
              headerShown: false,
              headerTintColor: "white",
              headerStyle: { backgroundColor: "black" },
            }}
          >
            {/* <Stack.Screen
              name="screens/register/register-process/profile-img/index"
              options={{ headerShown: false }}
            /> */}
            <Stack.Screen name="screens/login/index" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="modal" options={{ presentation: "modal" }} /> */}
            {/* <Stack.Screen name="screens/landing/index" /> */}
            {/* <Stack.Screen name="screens/login/index" /> */}
            {/* <Stack.Screen
              name="screens/register/register-process/age/index"
              options={{ headerShown: false }}
            /> */}
            {/* <Stack.Screen
              name="screens/register/register-process/tags-choose/index"
              options={{ headerShown: false }}
            /> */}
          </Stack>
        </I18nextProvider>
      </PortalProvider>
    </ThemeProvider>
  );
}
