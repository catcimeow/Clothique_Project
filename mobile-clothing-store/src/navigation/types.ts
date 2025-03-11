export type RootStackParamList = {
  Main: undefined;
  ProductDetail: { productId: string };
  Cart: undefined;
  Login: undefined;
  Register: undefined;
  Checkout: undefined;
  OrderSuccess: { orderId: string };
  OrderDetails: { orderId: string };
};

export type TabParamList = {
  Home: undefined;
  Categories: undefined;
  Wishlist: undefined;
  Profile: undefined;
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  Orders: undefined;
  OrderDetails: { orderId: string };
  Addresses: undefined;
  AddAddress: undefined;
  EditAddress: { addressId: string };
  PaymentMethods: undefined;
  Settings: undefined;
};
