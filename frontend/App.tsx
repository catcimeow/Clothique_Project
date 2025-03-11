import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Navigation types
import { RootStackParamList } from "./src/navigation/types";

// Context providers
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";

// Screens
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import CartScreen from "./src/screens/CartScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import OrderSuccessScreen from "./src/screens/OrderSuccessScreen";
import OrderDetailsScreen from "./src/screens/OrderDetailsScreen";

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { user, loading } = useAuth();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem("alreadyLaunched");
        if (value === null) {
          await AsyncStorage.setItem("alreadyLaunched", "true");
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (e) {
        console.error("Error checking first launch", e);
        setIsFirstLaunch(false);
      }
    };

    checkFirstLaunch();
  }, []);

  if (loading || isFirstLaunch === null) {
    // You could return a loading screen here
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        {user ? (
          // User is signed in
          <>
            <Stack.Screen
              name="Main"
              component={MainTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
              options={{
                title: "Product Details",
                headerBackTitleVisible: false,
              }}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{ title: "Shopping Cart" }}
            />
            <Stack.Screen
              name="Checkout"
              component={CheckoutScreen}
              options={{ title: "Checkout" }}
            />
            <Stack.Screen
              name="OrderSuccess"
              component={OrderSuccessScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OrderDetails"
              component={OrderDetailsScreen}
              options={{ title: "Order Details" }}
            />
          </>
        ) : (
          // User is not signed in
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppNavigator />
      </CartProvider>
    </AuthProvider>
  );
}
