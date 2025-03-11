import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Navigation types
import { ProfileStackParamList } from "./types";

// Screens
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import OrdersScreen from "../screens/OrdersScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import AddressesScreen from "../screens/AddressesScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import EditAddressScreen from "../screens/EditAddressScreen";
import PaymentMethodsScreen from "../screens/PaymentMethodsScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ title: "My Orders" }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{ title: "Order Details" }}
      />
      <Stack.Screen
        name="Addresses"
        component={AddressesScreen}
        options={{ title: "My Addresses" }}
      />
      <Stack.Screen
        name="AddAddress"
        component={AddAddressScreen}
        options={{ title: "Add Address" }}
      />
      <Stack.Screen
        name="EditAddress"
        component={EditAddressScreen}
        options={{ title: "Edit Address" }}
      />
      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethodsScreen}
        options={{ title: "Payment Methods" }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Stack.Navigator>
  );
}
