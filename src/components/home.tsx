import React, { useState } from "react";
import Navbar from "./layout/Navbar";
import FilterSidebar from "./layout/FilterSidebar";
import ProductGrid from "./products/ProductGrid";
import QuickViewModal from "./products/QuickViewModal";
import CartDrawer from "./cart/CartDrawer";

const Home = () => {
  // State for managing UI interactions
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample product data for quick view
  const sampleProduct = {
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
  };

  // Handler functions
  const handleQuickView = (id: string) => {
    setSelectedProductId(id);
    setIsQuickViewOpen(true);
  };

  const handleAddToCart = (id: string) => {
    // Simple implementation to add item to cart
    const productToAdd = {
      id,
      name: "Classic White T-Shirt",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80",
      quantity: 1,
      size: "M",
      color: "White",
    };

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        return [...prev, productToAdd];
      }
    });

    // Optionally open cart after adding item
    setIsCartOpen(true);
  };

  const handleAddToWishlist = (id: string) => {
    // Placeholder for wishlist functionality
    console.log(`Added product ${id} to wishlist`);
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApplyFilters = (filters: any) => {
    // Placeholder for filter application
    console.log("Applied filters:", filters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In a real app, you would fetch products for the new page here
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <Navbar
        onCartOpen={() => setIsCartOpen(true)}
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Filter Sidebar - Hidden on mobile by default */}
        <div className="hidden md:block">
          <FilterSidebar
            isOpen={isFilterSidebarOpen}
            onClose={() => setIsFilterSidebarOpen(false)}
            onApplyFilters={handleApplyFilters}
          />
        </div>

        {/* Mobile Filter Sidebar - Shown when toggled */}
        <div className="md:hidden">
          {isFilterSidebarOpen && (
            <FilterSidebar
              isOpen={isFilterSidebarOpen}
              onClose={() => setIsFilterSidebarOpen(false)}
              onApplyFilters={handleApplyFilters}
            />
          )}
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <ProductGrid
            onQuickView={handleQuickView}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            onFilterToggle={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </main>

      {/* Modals and Drawers */}
      <QuickViewModal
        open={isQuickViewOpen}
        onOpenChange={setIsQuickViewOpen}
        product={sampleProduct} // In a real app, you would fetch the product by selectedProductId
        onAddToCart={(id, quantity, size, color) => {
          // More complex implementation would use these parameters
          handleAddToCart(id);
        }}
        onAddToWishlist={handleAddToWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => console.log("Proceeding to checkout")}
      />
    </div>
  );
};

export default Home;
