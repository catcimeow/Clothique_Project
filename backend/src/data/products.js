const products = [
  {
    name: "Classic White T-Shirt",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    description:
      "A comfortable and versatile white t-shirt made from 100% organic cotton. Perfect for everyday wear and easy to style with any outfit.",
    brand: "Fashion Brand",
    category: "T-Shirts",
    price: 29.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", value: "#FFFFFF" },
      { name: "Black", value: "#000000" },
      { name: "Gray", value: "#808080" },
    ],
  },
  {
    name: "Black Denim Jeans",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80",
    description:
      "Classic black denim jeans with a slim fit. Made from high-quality denim that provides both comfort and durability.",
    brand: "Denim Co",
    category: "Jeans",
    price: 59.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Blue", value: "#0000FF" },
    ],
  },
  {
    name: "Casual Hoodie",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
    description:
      "Stay warm and stylish with this casual hoodie. Features a kangaroo pocket and adjustable drawstring hood.",
    brand: "Urban Style",
    category: "Hoodies",
    price: 49.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Gray", value: "#808080" },
      { name: "Black", value: "#000000" },
      { name: "Navy", value: "#000080" },
    ],
  },
  {
    name: "Summer Dress",
    image:
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500&q=80",
    description:
      "Light and flowy summer dress perfect for warm days. Features a flattering silhouette and breathable fabric.",
    brand: "Summer Vibes",
    category: "Dresses",
    price: 39.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Floral", value: "#FFC0CB" },
      { name: "Blue", value: "#ADD8E6" },
      { name: "White", value: "#FFFFFF" },
    ],
  },
  {
    name: "Leather Jacket",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
    description:
      "Classic leather jacket with a modern twist. Made from premium leather with a comfortable lining.",
    brand: "Leather Luxe",
    category: "Jackets",
    price: 129.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Brown", value: "#8B4513" },
      { name: "Black", value: "#000000" },
    ],
  },
  {
    name: "Striped Polo Shirt",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
    description:
      "Classic striped polo shirt perfect for casual or semi-formal occasions. Made from breathable cotton.",
    brand: "Polo Club",
    category: "Shirts",
    price: 34.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy/White", value: "#000080" },
      { name: "Red/White", value: "#FF0000" },
      { name: "Green/White", value: "#008000" },
    ],
  },
];

module.exports = products;
