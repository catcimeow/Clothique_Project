import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  StatusBar,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    category: "T-Shirts",
  },
  {
    id: "2",
    name: "Black Denim Jeans",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80",
    category: "Jeans",
  },
  {
    id: "3",
    name: "Casual Hoodie",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
    category: "Hoodies",
  },
  {
    id: "4",
    name: "Summer Dress",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500&q=80",
    category: "Dresses",
  },
  {
    id: "5",
    name: "Leather Jacket",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
    category: "Jackets",
  },
  {
    id: "6",
    name: "Striped Polo Shirt",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
    category: "Shirts",
  },
];

const CATEGORIES = [
  { id: "1", name: "Women", icon: "female" },
  { id: "2", name: "Men", icon: "male" },
  { id: "3", name: "Kids", icon: "users" },
  { id: "4", name: "Sale", icon: "tag" },
];

const ProductCard = ({
  product,
  onPress,
}: {
  product: Product;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {product.name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Feather name="shopping-cart" size={14} color="#000" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CategoryButton = ({
  category,
}: {
  category: { id: string; name: string; icon: keyof typeof Feather.glyphMap };
}) => {
  return (
    <TouchableOpacity style={styles.categoryButton}>
      <Feather name={category.icon} size={20} color="#000" />
      <Text style={styles.categoryButtonText}>{category.name}</Text>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");

  const handleProductPress = (productId: string) => {
    navigation.navigate("ProductDetail", { productId });
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard product={item} onPress={() => handleProductPress(item.id)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brandName}>BRAND</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="search" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate("Cart")}
          >
            <Feather name="shopping-bag" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={16}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {CATEGORIES.map((category) => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View style={styles.productsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={PRODUCTS}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.productGrid}
          />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  brandName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
  categoriesContainer: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  categoriesScroll: {
    flexDirection: "row",
    marginBottom: 20,
  },
  categoryButton: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    width: 70,
  },
  categoryButtonText: {
    marginTop: 4,
    fontSize: 12,
    textAlign: "center",
  },
  productsContainer: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: "#666",
  },
  productGrid: {
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    margin: 6,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: "relative",
    height: 180,
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  categoryTag: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    color: "#fff",
    fontSize: 10,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "600",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
  addButtonText: {
    fontSize: 12,
    marginLeft: 4,
  },
});
