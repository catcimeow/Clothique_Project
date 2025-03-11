import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";

interface NavbarProps {
  onCartOpen?: () => void;
  cartItemCount?: number;
  onSearchSubmit?: (query: string) => void;
  categories?: { name: string; subcategories: string[] }[];
}

const Navbar = ({
  onCartOpen = () => {},
  cartItemCount = 0,
  onSearchSubmit = () => {},
  categories = [
    {
      name: "Women",
      subcategories: ["Tops", "Dresses", "Pants", "Jackets", "Accessories"],
    },
    {
      name: "Men",
      subcategories: ["Shirts", "Pants", "Jackets", "Accessories"],
    },
    {
      name: "Kids",
      subcategories: ["Girls", "Boys", "Babies", "Accessories"],
    },
  ],
}: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="text-2xl font-bold tracking-tight">
            BRAND
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              {categories.map((category) => (
                <NavigationMenuItem key={category.name}>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    {category.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      {category.subcategories.map((subcategory) => (
                        <li key={subcategory}>
                          <NavigationMenuLink asChild>
                            <a
                              href={`/category/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
                                {subcategory}
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href="/sale"
                    className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                  >
                    SALE
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Search, Cart, Account */}
        <div className="flex items-center space-x-4">
          {/* Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center relative"
          >
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] h-9 rounded-full bg-gray-100 border-none pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </form>

          {/* Search Icon (Mobile) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => onSearchSubmit("")}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onCartOpen}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>

          {/* User Account */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <a href="/account" className="w-full">
                  My Account
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/orders" className="w-full">
                  Orders
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/wishlist" className="w-full">
                  Wishlist
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/logout" className="w-full">
                  Logout
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4">
          <form
            onSubmit={handleSearchSubmit}
            className="mb-4 flex items-center relative"
          >
            <Input
              type="search"
              placeholder="Search..."
              className="w-full h-10 rounded-full bg-gray-100 border-none pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </form>

          <nav className="space-y-4">
            {categories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="font-medium">{category.name}</div>
                <ul className="pl-4 space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory}>
                      <a
                        href={`/category/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`}
                        className="text-gray-600 hover:text-black"
                      >
                        {subcategory}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <a
                href="/sale"
                className="font-medium text-red-600 hover:text-red-800"
              >
                SALE
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
