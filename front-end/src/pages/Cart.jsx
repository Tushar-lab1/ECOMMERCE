import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { setNoItem } = useContext(ShopContext);
  const get_all_products = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await axios.get(
        `http://localhost:8000/cart/products/${email}`,
      );
      setCartItems(Array.isArray(response.data) ? response.data : []);
      setNoItem(response.data.length);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    get_all_products();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {cartItems.length === 0 ? (
        <h1>Your Cart is empty</h1>
      ) : (
        cartItems.map((item) => (
          <Card
            key={item.id}
            product_id={item.product_id}
            size={item.size}
            amount={item.amount}
            refreshCart={get_all_products}
          />
        ))
      )}
    </div>
  );
}

function Card({ product_id, size, amount, refreshCart }) {
  const { products, setNoItem } = useContext(ShopContext);
  const product = products.find(
    (item) => String(item.id) === String(product_id),
  );
  const deleteItem = async (e) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem("email");
      // eslint-disable-next-line no-unused-vars
      const response = await axios.delete(`http://localhost:8000/cart/remove`, {
        data: {
          email: email,
          product_id: product_id,
          amount: amount,
          size: size,
        },
      });
      setNoItem((prev) => prev - 1);
      await refreshCart();
    } catch (err) {
      console.log(err.response.data);
    }
  };
  if (!product) return <h1>Your Cart is empty</h1>;
  return (
    <div className="border-1 flex gap-4 rounded-2xl">
      <img
        src={`http://localhost:8000${product.images[0]}`}
        alt={product.name}
        className="w-[20%] rounded-2xl mr-10"
      />
      <div className="p-5">
        <h2 className="text-2xl font-blod my-2">{product.name}</h2>
        <h3 className="text-[15px]">{product.description}</h3>
        <p>₹ {amount}</p>
        <p className="mb-4">Size: {size}</p>
        <button className="border-1 px-4 py-2 mb-5 text-[18px] hover:bg-[#000] hover:text-[#fff] cursor-pointer">
          Buy Now
        </button>
        <ul className="flex gap-5 text-[#666] cursor-pointer">
          <li onClick={(e) => deleteItem(e)}>Delete</li>
          <li>Share</li>
          <li>See more like this</li>
        </ul>
      </div>
    </div>
  );
}
export default Cart;
