import React, { useContext, useEffect, useState } from "react";

import { ShopContext } from "../context/ShopContext";

import Title from "./Title";

import ProductItem from "./ProductItem";

function LatestCollection() {
  const { products } = useContext(ShopContext);

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products.length) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="Latest" text2="Collections" />

        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ut
          doloribus iusto nam aspernatur deleniti quasi numquam voluptates
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {latestProducts.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.images}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;
