import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../navigation/types";
import { Feather } from "@expo/vector-icons";
import { ordersApi } from "../api/api";

type OrdersNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "Orders"
>;

interface Order {
  _id: string;
  createdAt: string;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  orderItems: Array<{ name: string; qty: number }>;
}

export default function OrdersScreen() {
  const navigation = useNavigation<OrdersNavigationProp>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await ordersApi.getUserOrders();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load your orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getOrderStatus = (order: Order) => {
    if (order.isDelivered) return "Delivered";
    if (order.isPaid) return "Shipped";
    return "Processing";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "#4CAF50";
      case "Shipped":
        return "#2196F3";
      default:
        return "#FF9800";
    }
  };

  const renderOrderItem = ({ item }: { item: Order }) => {
    const status = getOrderStatus(item);
    const statusColor = getStatusColor(status);
    const itemCount = item.orderItems.reduce((acc, item) => acc + item.qty, 0);

    return (
      <TouchableOpacity
        style={styles.orderItem}
        onPress={() =>
          navigation.navigate("OrderDetails", { orderId: item._id })
        }
      >
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>
            Order #{item._id.substring(0, 8)}...
          </Text>
          <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
        </View>

        <View style={styles.orderDetails}>
          <Text style={styles.itemCount}>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </Text>
          <Text style={styles.orderTotal}>${item.totalPrice.toFixed(2)}</Text>
        </View>

        <View style={styles.orderFooter}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${statusColor}20` },
            ]}
          >
            <Text style={[styles.statusText, { color: statusColor }]}>
              {status}
            </Text>
          </View>

          <View style={styles.viewDetailsContainer}>
            <Text style={styles.viewDetailsText}>View Details</Text>
            <Feather name="chevron-right" size={16} color="#000" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyOrders = () => (
    <View style={styles.emptyContainer}>
      <Feather name="shopping-bag" size={64} color="#ddd" />
      <Text style={styles.emptyTitle}>No Orders Yet</Text>
      <Text style={styles.emptyText}>
        You haven't placed any orders yet. Start shopping to see your orders
        here.
      </Text>
      <TouchableOpacity
        style={styles.shopNowButton}
        onPress={() => navigation.navigate("Main" as any)}
      >
        <Text style={styles.shopNowText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {orders.length === 0 ? (
        renderEmptyOrders()
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    padding: 10,
    margin: 16,
    borderRadius: 8,
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 14,
  },
  listContainer: {
    padding: 16,
  },
  orderItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "600",
  },
  orderDate: {
    fontSize: 12,
    color: "#666",
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  itemCount: {
    fontSize: 14,
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: "600",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  viewDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewDetailsText: {
    fontSize: 14,
    marginRight: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
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
    marginBottom: 24,
  },
  shopNowButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  shopNowText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
