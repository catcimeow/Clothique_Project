import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";

interface ProductGridProps {
  products?: ProductType[];
  onQuickView?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onAddToWishlist?: (id: string) => void;
  onFilterToggle?: () => void;
  isLoading?: boolean;
  totalProducts?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

interface ProductType {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductGrid = ({
  products = [
    {
      id: "1",
      name: "Classic White T-Shirt",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
      category: "T-Shirts",
    },
    {
      id: "2",
      name: "Black Denim Jeans",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80",
      category: "Jeans",
    },
    {
      id: "3",
      name: "Casual Hoodie",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
      category: "Hoodies",
    },
    {
      id: "4",
      name: "Summer Dress",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500&q=80",
      category: "Dresses",
    },
    {
      id: "5",
      name: "Leather Jacket",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
      category: "Jackets",
    },
    {
      id: "6",
      name: "Striped Polo Shirt",
      price: 34.99,
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
      category: "Shirts",
    },
    {
      id: "7",
      name: "Slim Fit Chinos",
      price: 44.99,
      image:
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80",
      category: "Pants",
    },
    {
      id: "8",
      name: "Knit Sweater",
      price: 54.99,
      image:
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80",
      category: "Sweaters",
    },
  ],
  onQuickView = () => {},
  onAddToCart = () => {},
  onAddToWishlist = () => {},
  onFilterToggle = () => {},
  isLoading = false,
  totalProducts = 24,
  currentPage = 1,
  onPageChange = () => {},
}: ProductGridProps) => {
  const [gridColumns, setGridColumns] = useState(4);
  const totalPages = Math.ceil(totalProducts / 8);

  // Function to handle grid layout change
  const handleLayoutChange = (columns: number) => {
    setGridColumns(columns);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 p-6">
      {/* Top controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            className="md:hidden mr-2"
            onClick={onFilterToggle}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{products.length}</span> of{" "}
            <span className="font-medium">{totalProducts}</span> products
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex space-x-1">
            <Button
              variant={gridColumns === 3 ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => handleLayoutChange(3)}
            >
              <div className="grid grid-cols-3 gap-0.5 h-4 w-4">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-current rounded-sm" />
                ))}
              </div>
            </Button>
            <Button
              variant={gridColumns === 4 ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => handleLayoutChange(4)}
            >
              <div className="grid grid-cols-2 gap-0.5 h-4 w-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-current rounded-sm" />
                ))}
              </div>
            </Button>
          </div>
          <select
            className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            defaultValue="featured"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-grow">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-md h-[400px] animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${gridColumns} lg:grid-cols-${gridColumns} gap-6 flex-grow`}
          style={{
            gridTemplateColumns: `repeat(${
              gridColumns === 3
                ? "auto-fill, minmax(250px, 1fr)"
                : "auto-fill, minmax(220px, 1fr)"
            })`,
          }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex justify-center">
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
              />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            // Show first page, last page, current page, and pages around current page
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Button>
              );
            } else if (
              (page === currentPage - 2 && currentPage > 3) ||
              (page === currentPage + 2 && currentPage < totalPages - 2)
            ) {
              return <span key={page}>...</span>;
            }
            return null;
          })}

          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
