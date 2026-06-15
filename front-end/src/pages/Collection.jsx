import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

function Collection() {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOrder, setSortOrder] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((category) =>
        category.filter((item) => item !== e.target.value),
      );
    } else {
      setCategory((category) => [...category, e.target.value]);
    }
    // console.log(category);
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((subCategory) =>
        subCategory.filter((item) => item !== e.target.value),
      );
    } else {
      setSubCategory((subCategory) => [...subCategory, e.target.value]);
    }
  };

  const handlingFilter = () => {
    let productsCopy = products.slice();
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.sub_category),
      );
    }
    if (sortOrder === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
      console.log(search);
    }
    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    handlingFilter();
  }, [products, category, subCategory, sortOrder, search, showSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/*Filters */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          Filters
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden ${showFilter ? "rotate 90" : ""}`}
          />
        </p>
        {/*Category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mr-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={(e) => toggleCategory(e)}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={(e) => toggleCategory(e)}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={(e) => toggleCategory(e)}
              />
              Kids
            </p>
          </div>
        </div>

        {/*Sub category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={(e) => toggleSubCategory(e)}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={(e) => toggleSubCategory(e)}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={(e) => toggleSubCategory(e)}
              />
              Winter wear
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justified-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"Collections"} />
          <select
            className="border-2 border-gray-300 text-sm px-2 ml-20 sm:ml-100"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="relavent">Sort by relavent</option>
            <option value="low-high">Sort by low-high</option>
            <option value="high-low">Sort by high-low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={item.id}
              name={item.name}
              id={item.id}
              image={item.images}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
