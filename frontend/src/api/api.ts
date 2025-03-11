import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Base URL for API requests
const API_URL = "http://10.0.2.2:5000/api"; // Use this for Android emulator
// const API_URL = 'http://localhost:5000/api'; // Use this for iOS simulator

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Products API
export const productsApi = {
  getProducts: (keyword = "", pageNumber = "") => {
    return api.get(`/products?keyword=${keyword}&pageNumber=${pageNumber}`);
  },
  getProductsByCategory: (category: string, pageNumber = "") => {
    return api.get(`/products?category=${category}&pageNumber=${pageNumber}`);
  },
  getProductDetails: (id: string) => {
    return api.get(`/products/${id}`);
  },
  createProductReview: (
    productId: string,
    review: { rating: number; comment: string },
  ) => {
    return api.post(`/products/${productId}/reviews`, review);
  },
};

// User API
export const userApi = {
  login: (email: string, password: string) => {
    return api.post("/users/login", { email, password });
  },
  register: (name: string, email: string, password: string) => {
    return api.post("/users", { name, email, password });
  },
  getUserProfile: () => {
    return api.get("/users/profile");
  },
  updateUserProfile: (user: {
    name?: string;
    email?: string;
    password?: string;
  }) => {
    return api.put("/users/profile", user);
  },
  addToWishlist: (productId: string) => {
    return api.post("/users/wishlist", { productId });
  },
  removeFromWishlist: (productId: string) => {
    return api.delete(`/users/wishlist/${productId}`);
  },
};

// Orders API
export const ordersApi = {
  createOrder: (order: any) => {
    return api.post("/orders", order);
  },
  getOrderDetails: (id: string) => {
    return api.get(`/orders/${id}`);
  },
  payOrder: (orderId: string, paymentResult: any) => {
    return api.put(`/orders/${orderId}/pay`, paymentResult);
  },
  getUserOrders: () => {
    return api.get("/orders/myorders");
  },
};

export default api;
