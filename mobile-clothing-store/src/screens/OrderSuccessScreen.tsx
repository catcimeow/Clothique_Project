import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { Feather } from "@expo/vector-icons";

type OrderSuccessRouteProp = RouteProp<RootStackParamList, "OrderSuccess">;
type OrderSuccessNavigationProp = StackNavigationProp<RootStackParamList>;

export default function OrderSuccessScreen() {
  const navigation = useNavigation<OrderSuccessNavigationProp>();
  const route = useRoute<OrderSuccessRouteProp>();
  const { orderId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Feather name="check-circle" size={80} color="#4CAF50" />
        </View>

        <Text style={styles.title}>Order Placed Successfully!</Text>

        <Text style={styles.message}>
          Your order has been placed successfully. You will receive a
          confirmation email shortly.
        </Text>

        <Text style={styles.orderNumber}>Order #{orderId}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.viewOrderButton}
            onPress={() => navigation.navigate("OrderDetails", { orderId })}
          >
            <Text style={styles.viewOrderButtonText}>View Order</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={() => navigation.navigate("Main")}
          >
            <Text style={styles.continueShoppingText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 32,
  },
  buttonContainer: {
    width: "100%",
  },
  viewOrderButton: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  viewOrderButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  continueShoppingButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  continueShoppingText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});
