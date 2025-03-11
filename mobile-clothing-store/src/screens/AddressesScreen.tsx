import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../navigation/types";
import { Feather } from "@expo/vector-icons";

type AddressesNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "Addresses"
>;

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

// Sample addresses data
const SAMPLE_ADDRESSES: Address[] = [
  {
    id: "1",
    name: "Home",
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States",
    isDefault: true,
  },
  {
    id: "2",
    name: "Work",
    street: "456 Business Ave",
    city: "San Francisco",
    state: "CA",
    postalCode: "94105",
    country: "United States",
    isDefault: false,
  },
];

export default function AddressesScreen() {
  const navigation = useNavigation<AddressesNavigationProp>();
  const [addresses, setAddresses] = useState<Address[]>(SAMPLE_ADDRESSES);

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    );
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const renderAddressItem = ({ item }: { item: Address }) => (
    <View style={styles.addressItem}>
      <View style={styles.addressHeader}>
        <View style={styles.nameContainer}>
          <Text style={styles.addressName}>{item.name}</Text>
          {item.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Default</Text>
            </View>
          )}
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              navigation.navigate("EditAddress", { addressId: item.id })
            }
          >
            <Feather name="edit" size={16} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeleteAddress(item.id)}
          >
            <Feather name="trash-2" size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.addressText}>{item.street}</Text>
      <Text style={styles.addressText}>
        {item.city}, {item.state} {item.postalCode}
      </Text>
      <Text style={styles.addressText}>{item.country}</Text>

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
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="map-pin" size={64} color="#ddd" />
            <Text style={styles.emptyTitle}>No Addresses</Text>
            <Text style={styles.emptyText}>
              You haven't added any addresses yet.
            </Text>
          </View>
        }
      />

      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddAddress")}
        >
          <Feather
            name="plus"
            size={20}
            color="#fff"
            style={styles.addButtonIcon}
          />
          <Text style={styles.addButtonText}>Add New Address</Text>
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
  addressItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressName: {
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
  actionButtons: {
    flexDirection: "row",
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  addressText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
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
