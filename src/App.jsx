import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((item) => {
          const basePriceINR = Math.round(item.price * 83);
          const discount = Math.floor(Math.random() * 40) + 10;
          const mrp = Math.round(basePriceINR / (1 - discount / 100));

          return {
            id: item.id,
            title: item.title,
            price: basePriceINR,
            mrp: mrp,
            discount: discount,
            rating: item.rating.rate,
            reviewCount: item.rating.count,
            image: item.image,
            category: item.category,
          };
        });

        setProducts(formattedData);
      });
  }, []);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const filteredProducts = products.filter((product) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.trim().toLowerCase();
    return (
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-[#eaeded] min-h-screen">
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        cartCount={cartItems.length}
      />
      <Home
        products={filteredProducts}
        onAddToCart={handleAddToCart}
        loading={products.length === 0}
      />
      <Footer />
    </div>
  );
}

export default App;
