import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { Feather } from "@expo/vector-icons";
import { ordersApi } from "../api/api";

type OrderDetailsRouteProp = RouteProp<RootStackParamList, "OrderDetails">;

interface OrderItem {
  _id: string;
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
  size?: string;
  color?: string;
}

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  orderItems: OrderItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
}

export default function OrderDetailsScreen() {
  const route = useRoute<OrderDetailsRouteProp>();
  const { orderId } = route.params;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const { data } = await ordersApi.getOrderDetails(orderId);
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error || !order) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error || "Order not found"}</Text>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order #{order._id}</Text>
          <Text style={styles.date}>
            Placed on {formatDate(order.createdAt)}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          {order.orderItems.map((item) => (
            <View key={item._id} style={styles.orderItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.itemMeta}>
                  {item.size && (
                    <Text style={styles.metaText}>Size: {item.size}</Text>
                  )}
                  {item.color && (
                    <>
                      <Text style={styles.metaText}> • </Text>
                      <Text style={styles.metaText}>Color: {item.color}</Text>
                    </>
                  )}
                </View>
                <View style={styles.priceRow}>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  <Text style={styles.quantity}>Qty: {item.qty}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping</Text>
          <Text style={styles.addressText}>
            {order.shippingAddress.address}, {order.shippingAddress.city},
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Status:</Text>
            <View
              style={[
                styles.statusBadge,
                order.isDelivered
                  ? styles.deliveredBadge
                  : styles.notDeliveredBadge,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  order.isDelivered
                    ? styles.deliveredText
                    : styles.notDeliveredText,
                ]}
              >
                {order.isDelivered ? "Delivered" : "Not Delivered"}
              </Text>
            </View>
          </View>
          {order.isDelivered && order.deliveredAt && (
            <Text style={styles.deliveryDate}>
              Delivered on {formatDate(order.deliveredAt)}
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <Text style={styles.paymentMethod}>
            Method: {order.paymentMethod}
          </Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Status:</Text>
            <View
              style={[
                styles.statusBadge,
                order.isPaid ? styles.paidBadge : styles.notPaidBadge,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  order.isPaid ? styles.paidText : styles.notPaidText,
                ]}
              >
                {order.isPaid ? "Paid" : "Not Paid"}
              </Text>
            </View>
          </View>
          {order.isPaid && order.paidAt && (
            <Text style={styles.paymentDate}>
              Paid on {formatDate(order.paidAt)}
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items:</Text>
            <Text style={styles.summaryValue}>
              $
              {(
                order.totalPrice -
                order.taxPrice -
                order.shippingPrice
              ).toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping:</Text>
            <Text style={styles.summaryValue}>
              ${order.shippingPrice.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax:</Text>
            <Text style={styles.summaryValue}>
              ${order.taxPrice.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>
              ${order.totalPrice.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.supportButton}>
            <Feather
              name="help-circle"
              size={16}
              color="#000"
              style={styles.buttonIcon}
            />
            <Text style={styles.supportButtonText}>Need Help?</Text>
          </TouchableOpacity>
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
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  orderItem: {
    flexDirection: "row",
    marginVertical: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  itemMeta: {
    flexDirection: "row",
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#666",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
  },
  quantity: {
    fontSize: 12,
    color: "#666",
  },
  addressText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  statusLabel: {
    fontSize: 14,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  deliveredBadge: {
    backgroundColor: "#e8f5e9",
  },
  notDeliveredBadge: {
    backgroundColor: "#ffebee",
  },
  paidBadge: {
    backgroundColor: "#e8f5e9",
  },
  notPaidBadge: {
    backgroundColor: "#ffebee",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  deliveredText: {
    color: "#2e7d32",
  },
  notDeliveredText: {
    color: "#c62828",
  },
  paidText: {
    color: "#2e7d32",
  },
  notPaidText: {
    color: "#c62828",
  },
  deliveryDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  paymentMethod: {
    fontSize: 14,
    marginBottom: 8,
  },
  paymentDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    marginTop: 8,
    paddingTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  actionsContainer: {
    padding: 16,
    alignItems: "center",
  },
  supportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  supportButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
