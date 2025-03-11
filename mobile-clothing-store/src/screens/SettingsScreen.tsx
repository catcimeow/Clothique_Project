import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../navigation/types";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

type SettingsNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "Settings"
>;

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsNavigationProp>();
  const { logout } = useAuth();

  // Settings state
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometricLogin, setBiometricLogin] = useState(false);

  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => logout(),
      },
    ]);
  };

  const renderSettingItem = (
    title: string,
    description: string,
    value: boolean,
    onValueChange: (value: boolean) => void,
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#ddd", true: "#000" }}
        thumbColor="#fff"
      />
    </View>
  );

  const renderLinkItem = (
    title: string,
    icon: keyof typeof Feather.glyphMap,
    onPress: () => void,
  ) => (
    <TouchableOpacity style={styles.linkItem} onPress={onPress}>
      <View style={styles.linkLeft}>
        <Feather name={icon} size={20} color="#333" style={styles.linkIcon} />
        <Text style={styles.linkTitle}>{title}</Text>
      </View>
      <Feather name="chevron-right" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          {renderSettingItem(
            "Push Notifications",
            "Receive push notifications for orders, promotions, and more",
            pushNotifications,
            setPushNotifications,
          )}
          {renderSettingItem(
            "Email Notifications",
            "Receive email updates about your orders and account",
            emailNotifications,
            setEmailNotifications,
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          {renderSettingItem(
            "Dark Mode",
            "Switch between light and dark themes",
            darkMode,
            setDarkMode,
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          {renderSettingItem(
            "Biometric Login",
            "Use Face ID or Touch ID to log in",
            biometricLogin,
            setBiometricLogin,
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          {renderLinkItem("Privacy Policy", "shield", () => {
            Alert.alert(
              "Privacy Policy",
              "This would open the privacy policy in a real app.",
            );
          })}
          {renderLinkItem("Terms of Service", "file-text", () => {
            Alert.alert(
              "Terms of Service",
              "This would open the terms of service in a real app.",
            );
          })}
          {renderLinkItem("App Version", "info", () => {
            Alert.alert("App Version", "Version 1.0.0");
          })}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather
            name="log-out"
            size={20}
            color="#d32f2f"
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: "#666",
  },
  linkItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  linkLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkIcon: {
    marginRight: 12,
  },
  linkTitle: {
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderColor: "#ffebee",
    borderRadius: 8,
    backgroundColor: "#ffebee",
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#d32f2f",
  },
});
