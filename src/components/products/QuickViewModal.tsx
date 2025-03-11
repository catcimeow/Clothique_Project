import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Minus, Plus, ShoppingCart, Heart } from "lucide-react";

interface QuickViewModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  product?: {
    id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    category: string;
    sizes: string[];
    colors: { name: string; value: string }[];
  };
  onAddToCart?: (
    id: string,
    quantity: number,
    size: string,
    color: string,
  ) => void;
  onAddToWishlist?: (id: string) => void;
}

const QuickViewModal = ({
  open = true,
  onOpenChange = () => {},
  product = {
    id: "1",
    name: "Classic White T-Shirt",
    price: 29.99,
    description:
      "A comfortable and versatile white t-shirt made from 100% organic cotton. Perfect for everyday wear and easy to style with any outfit.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    ],
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", value: "#FFFFFF" },
      { name: "Black", value: "#000000" },
      { name: "Gray", value: "#808080" },
    ],
  },
  onAddToCart = () => {},
  onAddToWishlist = () => {},
}: QuickViewModalProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity, selectedSize, selectedColor);
    onOpenChange(false);
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, Math.min(10, value)));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Images Section */}
          <div className="bg-gray-50 p-6">
            <div className="aspect-square overflow-hidden rounded-md bg-gray-100 mb-4">
              <img
                src={product.images[selectedImage]}
                alt={`${product.name} - View ${selectedImage + 1}`}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-16 w-16 rounded-md overflow-hidden border-2",
                    selectedImage === index
                      ? "border-black"
                      : "border-transparent",
                  )}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="p-6 flex flex-col h-full">
            <DialogHeader className="text-left">
              <div className="text-sm text-gray-500 uppercase">
                {product.category}
              </div>
              <DialogTitle className="text-2xl font-bold">
                {product.name}
              </DialogTitle>
              <div className="text-xl font-semibold mt-1">
                ${product.price.toFixed(2)}
              </div>
            </DialogHeader>

            <Tabs defaultValue="details" className="mt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="sizing">Sizing</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4">
                <p className="text-gray-600">{product.description}</p>
              </TabsContent>
              <TabsContent value="sizing" className="mt-4">
                <p className="text-gray-600">
                  Please refer to our size guide to find your perfect fit. Model
                  is wearing size M.
                </p>
              </TabsContent>
            </Tabs>

            <Separator className="my-6" />

            {/* Size Selection */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant={selectedSize === size ? "default" : "outline"}
                    className="h-9 px-3"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    className={cn(
                      "h-8 w-8 rounded-full border-2",
                      selectedColor === color.name
                        ? "border-black ring-2 ring-black ring-offset-2"
                        : "border-gray-200",
                    )}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color.name)}
                    aria-label={`Color: ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Quantity</h3>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 10}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <Button className="w-full sm:w-auto" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => onAddToWishlist(product.id)}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Add to Wishlist
                </Button>
              </DialogFooter>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
