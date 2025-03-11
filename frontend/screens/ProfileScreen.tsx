import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface MenuItem {
  id: string;
  title: string;
  icon: keyof typeof Feather.glyphMap;
  screen?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: "1", title: "My Orders", icon: "package" },
  { id: "2", title: "My Addresses", icon: "map-pin" },
  { id: "3", title: "Payment Methods", icon: "credit-card" },
  { id: "4", title: "My Wishlist", icon: "heart" },
  { id: "5", title: "My Reviews", icon: "star" },
  { id: "6", title: "Settings", icon: "settings" },
  { id: "7", title: "Help & Support", icon: "help-circle" },
  { id: "8", title: "Logout", icon: "log-out" },
];

export default function ProfileScreen() {
  // In a real app, you would check if user is logged in
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginContainer}>
          <Feather name="user" size={64} color="#ddd" />
          <Text style={styles.loginTitle}>Sign in to your account</Text>
          <Text style={styles.loginText}>
            Sign in to view your orders, wishlist and more
          </Text>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Sign In / Register</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Feather
                  name={item.icon}
                  size={20}
                  color="#333"
                  style={styles.menuItemIcon}
                />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>App Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileHeader: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#f9f9f9",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#eee",
  },
  profileInfo: {
    marginLeft: 16,
    justifyContent: "center",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  editProfileButton: {
    backgroundColor: "transparent",
  },
  editProfileText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  menuContainer: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemIcon: {
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
  },
  versionContainer: {
    padding: 20,
    alignItems: "center",
  },
  versionText: {
    fontSize: 12,
    color: "#999",
  },
  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  loginText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: "#000",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
