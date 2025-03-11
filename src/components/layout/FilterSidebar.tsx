import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { X, SlidersHorizontal } from "lucide-react";

interface FilterSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onApplyFilters?: (filters: FilterState) => void;
  onResetFilters?: () => void;
}

interface FilterState {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
}

const FilterSidebar = ({
  isOpen = true,
  onClose = () => {},
  onApplyFilters = () => {},
  onResetFilters = () => {},
}: FilterSidebarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    sizes: [],
    colors: [],
    priceRange: [0, 200],
  });

  // Available filter options
  const categories = [
    "T-Shirts",
    "Shirts",
    "Jeans",
    "Jackets",
    "Sweaters",
    "Dresses",
    "Skirts",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#0000FF" },
    { name: "Green", value: "#00FF00" },
    { name: "Yellow", value: "#FFFF00" },
    { name: "Purple", value: "#800080" },
    { name: "Gray", value: "#808080" },
  ];

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => {
      if (prev.categories.includes(category)) {
        return {
          ...prev,
          categories: prev.categories.filter((c) => c !== category),
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, category],
        };
      }
    });
  };

  const handleSizeChange = (size: string) => {
    setFilters((prev) => {
      if (prev.sizes.includes(size)) {
        return {
          ...prev,
          sizes: prev.sizes.filter((s) => s !== size),
        };
      } else {
        return {
          ...prev,
          sizes: [...prev.sizes, size],
        };
      }
    });
  };

  const handleColorChange = (color: string) => {
    setFilters((prev) => {
      if (prev.colors.includes(color)) {
        return {
          ...prev,
          colors: prev.colors.filter((c) => c !== color),
        };
      } else {
        return {
          ...prev,
          colors: [...prev.colors, color],
        };
      }
    });
  };

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [value[0], value[1]],
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  const handleResetFilters = () => {
    setFilters({
      categories: [],
      sizes: [],
      colors: [],
      priceRange: [0, 200],
    });
    onResetFilters();
  };

  return (
    <aside
      className={cn(
        "w-[280px] h-[902px] bg-white border-r border-gray-200 p-4 overflow-y-auto transition-all duration-300 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <SlidersHorizontal className="h-5 w-5 mr-2" />
          <h2 className="text-xl font-semibold">Filters</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="md:hidden"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["categories", "sizes", "colors", "price"]}
        className="space-y-2"
      >
        {/* Categories Filter */}
        <AccordionItem value="categories">
          <AccordionTrigger className="text-base font-medium py-2">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Sizes Filter */}
        <AccordionItem value="sizes">
          <AccordionTrigger className="text-base font-medium py-2">
            Sizes
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={filters.sizes.includes(size) ? "default" : "outline"}
                  className={cn(
                    "h-9 w-9 p-0 text-xs",
                    filters.sizes.includes(size)
                      ? "bg-black text-white"
                      : "text-gray-700",
                  )}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Colors Filter */}
        <AccordionItem value="colors">
          <AccordionTrigger className="text-base font-medium py-2">
            Colors
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-2">
              {colors.map((color) => (
                <div
                  key={color.name}
                  className={cn(
                    "h-8 w-8 rounded-full cursor-pointer border-2 transition-all",
                    filters.colors.includes(color.name)
                      ? "border-black scale-110"
                      : "border-transparent hover:scale-105",
                  )}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorChange(color.name)}
                  title={color.name}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range Filter */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium py-2">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-6 px-2">
              <Slider
                defaultValue={[0, 200]}
                max={200}
                step={1}
                value={[filters.priceRange[0], filters.priceRange[1]]}
                onValueChange={handlePriceChange}
                className="mb-6"
              />
              <div className="flex items-center justify-between text-sm">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-auto pt-6 space-y-2">
        <Button
          className="w-full bg-black hover:bg-gray-800 text-white"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleResetFilters}
        >
          Reset Filters
        </Button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
