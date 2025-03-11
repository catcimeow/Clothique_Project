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
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { Feather } from "@expo/vector-icons";

type CategoriesNavigationProp = StackNavigationProp<RootStackParamList>;

interface Category {
  id: string;
  name: string;
  image: string;
  subcategories: string[];
}

const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Women",
    image:
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&q=80",
    subcategories: ["Tops", "Dresses", "Pants", "Jackets", "Accessories"],
  },
  {
    id: "2",
    name: "Men",
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=500&q=80",
    subcategories: ["Shirts", "Pants", "Jackets", "Accessories"],
  },
  {
    id: "3",
    name: "Kids",
    image:
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&q=80",
    subcategories: ["Girls", "Boys", "Babies", "Accessories"],
  },
  {
    id: "4",
    name: "Sale",
    image:
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500&q=80",
    subcategories: ["Women", "Men", "Kids", "Accessories"],
  },
];

export default function CategoriesScreen() {
  const navigation = useNavigation<CategoriesNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {CATEGORIES.map((category) => (
          <View key={category.id} style={styles.categorySection}>
            <TouchableOpacity
              style={styles.categoryHeader}
              onPress={() => {
                // Navigate to a category page (not implemented in this example)
                console.log(`Navigate to ${category.name} category`);
              }}
            >
              <View style={styles.categoryTitleContainer}>
                <Text style={styles.categoryTitle}>{category.name}</Text>
                <Feather name="chevron-right" size={20} color="#000" />
              </View>
              <Image
                source={{ uri: category.image }}
                style={styles.categoryImage}
              />
            </TouchableOpacity>

            <View style={styles.subcategoriesList}>
              {category.subcategories.map((subcategory) => (
                <TouchableOpacity
                  key={subcategory}
                  style={styles.subcategoryItem}
                  onPress={() => {
                    // Navigate to subcategory (not implemented in this example)
                    console.log(
                      `Navigate to ${category.name} > ${subcategory}`,
                    );
                  }}
                >
                  <Text style={styles.subcategoryText}>{subcategory}</Text>
                  <Feather name="chevron-right" size={16} color="#666" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    position: "relative",
    height: 120,
    marginBottom: 8,
  },
  categoryImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  categoryTitleContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subcategoriesList: {
    paddingHorizontal: 16,
  },
  subcategoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  subcategoryText: {
    fontSize: 16,
  },
});
