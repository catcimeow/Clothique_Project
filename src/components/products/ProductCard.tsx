import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, ShoppingCart, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  category?: string;
  onQuickView?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onAddToWishlist?: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  name = "Classic White T-Shirt",
  price = 29.99,
  image = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
  category = "T-Shirts",
  onQuickView = () => {},
  onAddToCart = () => {},
  onAddToWishlist = () => {},
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group bg-white rounded-md overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md w-full max-w-[280px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered ? "scale-110" : "scale-100",
          )}
        />

        {/* Quick action buttons that appear on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white text-black hover:bg-gray-100"
                  onClick={() => onQuickView(id)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Quick View</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white text-black hover:bg-gray-100"
                  onClick={() => onAddToWishlist(id)}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to Wishlist</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Category tag */}
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {category}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 truncate">{name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-gray-700 font-semibold">${price.toFixed(2)}</p>
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-gray-300 hover:bg-gray-100 hover:text-black"
            onClick={() => onAddToCart(id)}
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
