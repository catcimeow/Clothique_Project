import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  countInStock: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from storage on app start
  useEffect(() => {
    const loadCartFromStorage = async () => {
      try {
        const cartJson = await AsyncStorage.getItem("cart");
        if (cartJson) {
          setCartItems(JSON.parse(cartJson));
        }
      } catch (e) {
        console.error("Failed to load cart from storage", e);
      }
    };

    loadCartFromStorage();
  }, []);

  // Save cart to storage whenever it changes
  useEffect(() => {
    const saveCartToStorage = async () => {
      try {
        await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
      } catch (e) {
        console.error("Failed to save cart to storage", e);
      }
    };

    saveCartToStorage();
  }, [cartItems]);

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) =>
          i.id === item.id && i.size === item.size && i.color === item.color,
      );

      if (existingItem) {
        // If item exists, update quantity
        return prevItems.map((i) =>
          i.id === item.id && i.size === item.size && i.color === item.color
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      } else {
        // If item doesn't exist, add it
        return [...prevItems, item];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Update item quantity
  const updateCartQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate cart total
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => React.useContext(CartContext);
