import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

// Sample cart items
const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80",
    quantity: 1,
    size: "M",
    color: "White",
  },
  {
    id: "2",
    name: "Black Denim Jeans",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80",
    quantity: 2,
    size: "32",
    color: "Black",
  },
  {
    id: "3",
    name: "Leather Jacket",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80",
    quantity: 1,
    size: "L",
    color: "Brown",
  },
];

export default function CartScreen() {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);

  const handleUpdateQuantity = (id: string, increment: number) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + increment;
          if (newQuantity < 1) return item;
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.itemMeta}>
          {item.color && <Text style={styles.itemMetaText}>{item.color}</Text>}
          {item.size && (
            <>
              <Text style={styles.itemMetaText}> • </Text>
              <Text style={styles.itemMetaText}>Size: {item.size}</Text>
            </>
          )}
        </View>
        <Text style={styles.itemPrice}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>

        <View style={styles.itemActions}>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleUpdateQuantity(item.id, -1)}
              disabled={item.quantity <= 1}
            >
              <Feather
                name="minus"
                size={14}
                color={item.quantity <= 1 ? "#ccc" : "#000"}
              />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleUpdateQuantity(item.id, 1)}
            >
              <Feather name="plus" size={14} color="#000" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveItem(item.id)}
          >
            <Feather name="trash-2" size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Feather name="shopping-bag" size={64} color="#ddd" />
      <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
      <Text style={styles.emptyCartText}>
        Looks like you haven't added any items to your cart yet.
      </Text>
      <TouchableOpacity
        style={styles.continueShoppingButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.continueShoppingText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cartList}
          />

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.continueShoppingLink}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.continueShoppingLinkText}>
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cartList: {
    padding: 16,
  },
  cartItem: {
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: "#f0f0f0",
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
  itemMetaText: {
    fontSize: 12,
    color: "#666",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  itemActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 4,
    width: 96,
  },
  quantityButton: {
    padding: 6,
    width: 32,
    alignItems: "center",
  },
  quantityText: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
  },
  removeButton: {
    padding: 8,
  },
  summaryContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fff",
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
    fontWeight: "500",
  },
  totalRow: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    marginTop: 6,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  checkoutButton: {
    backgroundColor: "#000",
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  continueShoppingLink: {
    alignItems: "center",
    paddingVertical: 8,
  },
  continueShoppingLinkText: {
    fontSize: 14,
    color: "#666",
  },
  emptyCartContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyCartTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyCartText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  continueShoppingButton: {
    backgroundColor: "#000",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  continueShoppingText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
