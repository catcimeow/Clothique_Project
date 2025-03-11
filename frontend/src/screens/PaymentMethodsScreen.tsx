import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../navigation/types";
import { Feather } from "@expo/vector-icons";

type PaymentMethodsNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "PaymentMethods"
>;

interface PaymentMethod {
  id: string;
  type: "card" | "paypal";
  name: string;
  details: string;
  isDefault: boolean;
  expiryDate?: string;
}

// Sample payment methods data
const SAMPLE_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "1",
    type: "card",
    name: "Visa ending in 4242",
    details: "••••••••••••4242",
    isDefault: true,
    expiryDate: "12/25",
  },
  {
    id: "2",
    type: "card",
    name: "Mastercard ending in 5555",
    details: "••••••••••••5555",
    isDefault: false,
    expiryDate: "08/24",
  },
  {
    id: "3",
    type: "paypal",
    name: "PayPal",
    details: "user@example.com",
    isDefault: false,
  },
];

export default function PaymentMethodsScreen() {
  const navigation = useNavigation<PaymentMethodsNavigationProp>();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(
    SAMPLE_PAYMENT_METHODS,
  );

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    );
  };

  const handleDeletePaymentMethod = (id: string) => {
    // Check if it's the default payment method
    const isDefault = paymentMethods.find(
      (method) => method.id === id,
    )?.isDefault;

    if (isDefault) {
      Alert.alert(
        "Cannot Delete Default",
        "Please set another payment method as default before deleting this one.",
        [{ text: "OK" }],
      );
      return;
    }

    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  const handleAddPaymentMethod = () => {
    // In a real app, this would navigate to a screen to add a new payment method
    Alert.alert(
      "Add Payment Method",
      "This feature would allow adding a new payment method in a real app.",
      [{ text: "OK" }],
    );
  };

  const renderPaymentMethodItem = ({ item }: { item: PaymentMethod }) => (
    <View style={styles.paymentItem}>
      <View style={styles.paymentHeader}>
        <View style={styles.typeContainer}>
          {item.type === "card" ? (
            <Feather
              name="credit-card"
              size={20}
              color="#000"
              style={styles.typeIcon}
            />
          ) : (
            <Feather
              name="dollar-sign"
              size={20}
              color="#000"
              style={styles.typeIcon}
            />
          )}
          <Text style={styles.paymentName}>{item.name}</Text>
          {item.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Default</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeletePaymentMethod(item.id)}
        >
          <Feather name="trash-2" size={16} color="#666" />
        </TouchableOpacity>
      </View>

      <Text style={styles.paymentDetails}>{item.details}</Text>
      {item.expiryDate && (
        <Text style={styles.expiryDate}>Expires {item.expiryDate}</Text>
      )}

      {!item.isDefault && (
        <TouchableOpacity
          style={styles.setDefaultButton}
          onPress={() => handleSetDefault(item.id)}
        >
          <Text style={styles.setDefaultText}>Set as Default</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={paymentMethods}
        renderItem={renderPaymentMethodItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="credit-card" size={64} color="#ddd" />
            <Text style={styles.emptyTitle}>No Payment Methods</Text>
            <Text style={styles.emptyText}>
              You haven't added any payment methods yet.
            </Text>
          </View>
        }
      />

      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddPaymentMethod}
        >
          <Feather
            name="plus"
            size={20}
            color="#fff"
            style={styles.addButtonIcon}
          />
          <Text style={styles.addButtonText}>Add Payment Method</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80, // Space for the add button
  },
  paymentItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  paymentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  typeIcon: {
    marginRight: 8,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: "#e8f5e9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    fontSize: 10,
    color: "#2e7d32",
    fontWeight: "500",
  },
  deleteButton: {
    padding: 4,
  },
  paymentDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  expiryDate: {
    fontSize: 12,
    color: "#666",
  },
  setDefaultButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  setDefaultText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  addButton: {
    backgroundColor: "#000",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  addButtonIcon: {
    marginRight: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
