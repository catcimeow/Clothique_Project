import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { Feather } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { ordersApi } from '../api/api';

type CheckoutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Checkout'>;

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export default function CheckoutScreen() {
  const navigation = useNavigation<CheckoutScreenNavigationProp>();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const [activeStep, setActiveStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [loading, setLoading] = useState(false);
  
  // Shipping form state
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  
  // Payment form state
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  
  // Calculate order summary
  const subtotal = getCartTotal();
  const shippingPrice = 5.99;
  const taxPrice = subtotal * 0.08;
  const totalPrice = subtotal + shippingPrice + taxPrice;
  
  const handleShippingSubmit = () => {
    // Validate shipping form
    if (!shippingAddress.address || !shippingAddress.city || 
        !shippingAddress.postalCode || !shippingAddress.country) {
      Alert.alert('Error', 'Please fill in all shipping fields');
      return;
    }
    
    setActiveStep(2);
  };
  
  const handlePaymentSubmit = () => {
    // Validate payment method
    if (!paymentMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }
    
    setActiveStep(3);
  };
  
  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      
      const orderItems = cartItems.map(item => ({
        name: item.name,
        qty: item.quantity,
        image: item.image,
        price: item.price,
        product: item.id,
        size: item.size,
        color: item.color,
      }));
      
      const orderData = {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: subtotal,
        taxPrice,
        shippingPrice,
        totalPrice,
      };
      
      const { data } = await ordersApi.createOrder(orderData);
      
      clearCart();
      navigation.navigate('OrderSuccess', { orderId: data._id });
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'There was a problem placing your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const renderShippingForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Shipping Address</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Street Address</Text>
        <TextInput
          style={styles.input}
          value={shippingAddress.address}
          onChangeText={(text) => setShippingAddress({...shippingAddress, address: text})}
          placeholder="Enter your street address"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>City</Text>
        <TextInput
          style={styles.input}
          value={shippingAddress.city}
          onChangeText={(text) => setShippingAddress({...shippingAddress, city: text})}
          placeholder="Enter your city"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>