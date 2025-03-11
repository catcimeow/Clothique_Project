import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../navigation/types";

type EditAddressRouteProp = RouteProp<ProfileStackParamList, "EditAddress">;
type EditAddressNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "EditAddress"
>;

// Sample addresses data - in a real app, this would come from your backend
const SAMPLE_ADDRESSES = [
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

export default function EditAddressScreen() {
  const navigation = useNavigation<EditAddressNavigationProp>();
  const route = useRoute<EditAddressRouteProp>();
  const { addressId } = route.params;

  const [addressName, setAddressName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  // Load address data
  useEffect(() => {
    // In a real app, you would fetch this from your backend
    const address = SAMPLE_ADDRESSES.find((a) => a.id === addressId);
    if (address) {
      setAddressName(address.name);
      setStreet(address.street);
      setCity(address.city);
      setState(address.state);
      setPostalCode(address.postalCode);
      setCountry(address.country);
      setIsDefault(address.isDefault);
    }
  }, [addressId]);

  const handleUpdateAddress = () => {
    // Validate form
    if (!addressName || !street || !city || !state || !postalCode || !country) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // In a real app, you would update the address in your backend here
    // For now, we'll just navigate back
    Alert.alert("Success", "Address updated successfully");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Home, Work, etc."
                value={addressName}
                onChangeText={setAddressName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Street Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Street address or P.O. Box"
                value={street}
                onChangeText={setStreet}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="City"
                value={city}
                onChangeText={setCity}
              />
            </View>

            <View style={styles.rowContainer}>
              <View style={[styles.inputContainer, styles.halfInput]}>
                <Text style={styles.inputLabel}>State/Province</Text>
                <TextInput
                  style={styles.input}
                  placeholder="State"
                  value={state}
                  onChangeText={setState}
                />
              </View>

              <View style={[styles.inputContainer, styles.halfInput]}>
                <Text style={styles.inputLabel}>Postal Code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Postal code"
                  value={postalCode}
                  onChangeText={setPostalCode}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Country</Text>
              <TextInput
                style={styles.input}
                placeholder="Country"
                value={country}
                onChangeText={setCountry}
              />
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Set as default address</Text>
              <Switch
                value={isDefault}
                onValueChange={setIsDefault}
                trackColor={{ false: "#ddd", true: "#000" }}
                thumbColor="#fff"
                disabled={isDefault} // Can't unset default address
              />
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleUpdateAddress}
            >
              <Text style={styles.saveButtonText}>Update Address</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  switchLabel: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});
