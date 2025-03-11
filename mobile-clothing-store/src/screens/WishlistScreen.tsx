import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { userApi, productsApi } from "../api/api";

type WishlistNavigationProp = StackNavigationProp<RootStackParamList>;

interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  countInStock: number;
}

export default function WishlistScreen() {
  const navigation = useNavigation<WishlistNavigationProp>();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user profile to get wishlist IDs
      const userResponse = await userApi.getUserProfile();
      const wishlistIds = userResponse.data.wishlist;

      if (!wishlistIds || wishlistIds.length === 0) {
        setWishlistItems([]);
        setLoading(false);
        return;
      }

      // Fetch details for each product in wishlist
      const items = await Promise.all(
        wishlistIds.map(async (id: string) => {
          const response = await productsApi.getProductDetails(id);
          return response.data;
        }),
      );

      setWishlistItems(items);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setError("Failed to load wishlist items");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await userApi.removeFromWishlist(productId);
      setWishlistItems(wishlistItems.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      setError("Failed to remove item from wishlist");
    }
  };

  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      countInStock: item.countInStock,
    });
    navigation.navigate("Cart");
  };

  const renderWishlistItem = ({ item }: { item: WishlistItem }) => (
    <View style={styles.wishlistItem}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetail", { productId: item._id })
        }
        style={styles.itemContainer}
      >
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

          <View style={styles.itemActions}>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => handleAddToCart(item)}
              disabled={item.countInStock === 0}
            >
              <Text style={styles.addToCartText}>
                {item.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveFromWishlist(item._id)}
      >
        <Feather name="x" size={18} color="#666" />
      </TouchableOpacity>
    </View>
  );

  const renderEmptyWishlist = () => (
    <View style={styles.emptyContainer}>
      <Feather name="heart" size={64} color="#ddd" />
      <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
      <Text style={styles.emptyText}>
        Save items you like by tapping the heart icon on product pages
      </Text>
      <TouchableOpacity
        style={styles.shopNowButton}
        onPress={() => navigation.navigate("Home")}
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
      <View style={styles.header}>
        <Text style={styles.title}>My Wishlist</Text>
        {wishlistItems.length > 0 && (
          <Text style={styles.itemCount}>{wishlistItems.length} items</Text>
        )}
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {wishlistItems.length === 0 ? (
        renderEmptyWishlist()
      ) : (
        <FlatList
          data={wishlistItems}
          renderItem={renderWishlistItem}
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
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  itemCount: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  listContainer: {
    padding: 16,
  },
  wishlistItem: {
    flexDirection: "row",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 8,
    overflow: "hidden",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 12,
  },
  itemImage: {
    width: 80,
    height: 80,
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
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  itemActions: {
    flexDirection: "row",
  },
  addToCartButton: {
    backgroundColor: "#000",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  removeButton: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
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
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
