import React from 'react';
import ProductCard from './ProductCard';

function Home({ products, onAddToCart, loading }) {
  return (
    <div className="flex justify-center mx-auto max-w-[1500px]">
      <div className="w-full relative">
        <img
          className="w-full lg:h-[600px] h-[300px] object-cover md:object-top z-[-1] mb-[-50px] sm:mb-[-150px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))]"
          src="/static/img/banner.jpg"
          alt="Banner"
        />

        <div className="flex z-[1] mx-[5px] flex-wrap justify-center px-1 sm:px-4">
          {loading && (
            <div className="w-full text-center py-20 text-white font-bold text-xl">
              Loading Products...
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="w-full text-center py-20 text-gray-800 font-bold text-xl">
              No products found for that search.
            </div>
          )}

          {products.map((product) => (
            <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center">
              <ProductCard
                id={product.id}
                title={product.title}
                price={product.price}
                mrp={product.mrp}
                discount={product.discount}
                rating={product.rating}
                reviewCount={product.reviewCount}
                image={product.image}
                onAddToCart={() => onAddToCart(product)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
