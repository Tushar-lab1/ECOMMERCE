import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "./ProductItem";

function RelatedProduct({ category, subcategory }) {
  const { products } = useContext(ShopContext);

  const [related, setrelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      productsCopy = productsCopy.filter((item) => category === item.category);

      productsCopy = productsCopy.filter(
        (item) => subcategory === item.sub_category,
      );
      setrelated(productsCopy.slice(0, 5));
    }
  }, [products]);
  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"Related"} text2={"Products"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.images}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProduct;