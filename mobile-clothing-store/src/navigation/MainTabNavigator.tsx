import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

// Navigation types
import { TabParamList } from "./types";

// Screens
import HomeScreen from "../screens/HomeScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import WishlistScreen from "../screens/WishlistScreen";
import ProfileNavigator from "./ProfileNavigator";

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Feather.glyphMap;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Categories") {
            iconName = "grid";
          } else if (route.name === "Wishlist") {
            iconName = "heart";
          } else if (route.name === "Profile") {
            iconName = "user";
          } else {
            iconName = "circle";
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
}
