import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { Feather } from "@expo/vector-icons";

type ProductDetailRouteProp = RouteProp<RootStackParamList, "ProductDetail">;
type ProductDetailNavigationProp = StackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get("window");

// Sample product data
const PRODUCT = {
  id: "1",
  name: "Classic White T-Shirt",
  price: 29.99,
  description:
    "A comfortable and versatile white t-shirt made from 100% organic cotton. Perfect for everyday wear and easy to style with any outfit.",
  images: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
  ],
  category: "T-Shirts",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: [
    { name: "White", value: "#FFFFFF" },
    { name: "Black", value: "#000000" },
    { name: "Gray", value: "#808080" },
  ],
};

export default function ProductDetailScreen() {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<ProductDetailNavigationProp>();
  const { productId } = route.params;

  // In a real app, you would fetch the product details based on productId
  // For now, we'll use our sample data

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Add to cart logic would go here
    navigation.navigate("Cart");
  };

  const handleQuantityChange = (increment: number) => {
    const newQuantity = quantity + increment;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: PRODUCT.images[selectedImage] }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailScroll}
          >
            {PRODUCT.images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(index)}
                style={[
                  styles.thumbnailContainer,
                  selectedImage === index && styles.selectedThumbnail,
                ]}
              >
                <Image source={{ uri: image }} style={styles.thumbnail} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.category}>{PRODUCT.category}</Text>
          <Text style={styles.name}>{PRODUCT.name}</Text>
          <Text style={styles.price}>${PRODUCT.price.toFixed(2)}</Text>

          <Text style={styles.description}>{PRODUCT.description}</Text>

          {/* Size Selection */}
          <View style={styles.selectionContainer}>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.optionsRow}>
              {PRODUCT.sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.selectedSizeButton,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeButtonText,
                      selectedSize === size && styles.selectedOptionText,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Color Selection */}
          <View style={styles.selectionContainer}>
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.optionsRow}>
              {PRODUCT.colors.map((color) => (
                <TouchableOpacity
                  key={color.name}
                  style={[
                    styles.colorButton,
                    { backgroundColor: color.value },
                    selectedColor === color.name && styles.selectedColorButton,
                  ]}
                  onPress={() => setSelectedColor(color.name)}
                />
              ))}
            </View>
          </View>

          {/* Quantity */}
          <View style={styles.selectionContainer}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Feather
                  name="minus"
                  size={16}
                  color={quantity <= 1 ? "#ccc" : "#000"}
                />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
              >
                <Feather
                  name="plus"
                  size={16}
                  color={quantity >= 10 ? "#ccc" : "#000"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.wishlistButton}>
          <Feather name="heart" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Feather
            name="shopping-cart"
            size={20}
            color="#fff"
            style={styles.buttonIcon}
          />
          <Text style={styles.addToCartText}>Add to Cart</Text>
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
  imageContainer: {
    backgroundColor: "#f9f9f9",
  },
  mainImage: {
    width: width,
    height: width,
  },
  thumbnailScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  thumbnailContainer: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },
  selectedThumbnail: {
    borderColor: "#000",
    borderWidth: 2,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    padding: 16,
  },
  category: {
    fontSize: 12,
    color: "#666",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#444",
    marginBottom: 24,
  },
  selectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedSizeButton: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  sizeButtonText: {
    fontSize: 14,
  },
  selectedOptionText: {
    color: "#fff",
  },
  colorButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedColorButton: {
    borderWidth: 2,
    borderColor: "#000",
    transform: [{ scale: 1.1 }],
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    width: 120,
  },
  quantityButton: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
  },
  quantityText: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
  },
  actionContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  wishlistButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#000",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  buttonIcon: {
    marginRight: 8,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
