import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [noItem, setNoItem] = useState(0);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/items");
      setProducts(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(console.log(error.response.data));
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    noItem,
    setNoItem,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
