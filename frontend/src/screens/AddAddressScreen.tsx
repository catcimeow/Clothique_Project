import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../navigation/types";
import { Feather } from "@expo/vector-icons";

type AddAddressNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "AddAddress"
>;

export default function AddAddressScreen() {
  const navigation = useNavigation<AddAddressNavigationProp>();

  const [addressName, setAddressName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const handleSaveAddress = () => {
    // Validate form
    if (!addressName || !street || !city || !state || !postalCode || !country) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // In a real app, you would save the address to your backend here
    // For now, we'll just navigate back
    Alert.alert("Success", "Address added successfully");
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
              />
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveAddress}
            >
              <Text style={styles.saveButtonText}>Save Address</Text>
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
