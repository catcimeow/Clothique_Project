import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  items?: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
}

const CartDrawer = ({
  isOpen = true,
  onClose = () => {},
  items = [
    {
      id: "1",
      name: "Classic White T-Shirt",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80",
      quantity: 1,
      size: "M",
      color: "White",
    },
    {
      id: "2",
      name: "Black Denim Jeans",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80",
      quantity: 2,
      size: "32",
      color: "Black",
    },
    {
      id: "3",
      name: "Leather Jacket",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80",
      quantity: 1,
      size: "L",
      color: "Brown",
    },
  ],
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
  onCheckout = () => {},
}: CartDrawerProps) => {
  const [localItems, setLocalItems] = useState<CartItem[]>(items);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = localItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item,
    );

    setLocalItems(updatedItems);
    onUpdateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = localItems.filter((item) => item.id !== id);
    setLocalItems(updatedItems);
    onRemoveItem(id);
  };

  const subtotal = localItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="bg-white max-h-[90vh] overflow-y-auto">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-bold">Your Cart</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </div>
          <div className="text-sm text-gray-500">
            {localItems.length} {localItems.length === 1 ? "item" : "items"}
          </div>
        </DrawerHeader>

        {localItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Your cart is empty
            </h3>
            <p className="text-gray-500 text-center mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <DrawerClose asChild>
              <Button>Continue Shopping</Button>
            </DrawerClose>
          </div>
        ) : (
          <>
            <div className="px-4 py-2">
              {localItems.map((item) => (
                <div
                  key={item.id}
                  className="flex py-4 border-b border-gray-200 last:border-0"
                >
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3 className="text-sm">{item.name}</h3>
                      <p className="ml-4">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      {item.color && <span className="mr-2">{item.color}</span>}
                      {item.size && (
                        <>
                          <span className="mx-1">•</span>
                          <span>Size: {item.size}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none border-r"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none border-l"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-red-500"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-4 border-t border-gray-200">
              <div className="flow-root">
                <div className="flex justify-between py-1.5 text-sm">
                  <p className="text-gray-500">Subtotal</p>
                  <p className="font-medium">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between py-1.5 text-sm">
                  <p className="text-gray-500">Shipping</p>
                  <p className="font-medium">${shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between py-1.5 text-sm">
                  <p className="text-gray-500">Tax</p>
                  <p className="font-medium">${tax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between py-3 text-base font-semibold">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <DrawerFooter>
              <Button className="w-full" onClick={onCheckout}>
                Checkout
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
