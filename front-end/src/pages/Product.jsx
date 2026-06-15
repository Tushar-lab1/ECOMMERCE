import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";
import axios from "axios";
function Product() {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const { setNoItem } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    const item = products.find((item) => String(item.id) === String(productId));
    if (item) {
      setProductData(item);
      setImage(item.images[0]);
    }
  };
  useEffect(() => {
    fetchProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, productId]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (size === "") {
      alert("Select Size");
      return;
    }
    try {
      const email = localStorage.getItem("email");
      console.log(email, productData.id, productData.price, size);
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(`http://localhost:8000/cart`, {
        email: email,
        product_id: String(productData.id),
        amount: productData.price,
        size: size,
      });
      alert("Product Added");
      setNoItem((prev) => prev + 1);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[19%] w-full">
            {productData.images.map((item, index) => (
              <img
                src={`http://localhost:8000${item}`}
                alt=""
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          {/* <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[19%] w-full">
            {productData.image &&
              productData.image.map((item, index) => (
                <Images_ key={index} item={item} />
              ))}
          </div> */}

          <div className="w-full sm:w-[80%]">
            <img
              src={`http://localhost:8000${image}`}
              alt=""
              className="w-full h-auto"
            />
          </div>
        </div>
        {/*PRODUCT INFO */}

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex item-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-5 5" />
            <img src={assets.star_icon} alt="" className="w-5 5" />
            <img src={assets.star_icon} alt="" className="w-5 5" />
            <img src={assets.star_icon} alt="" className="w-5 5" />
            <img src={assets.star_dull_icon} alt="" className="w-5 5" />
            <p className="pl-2">({122})</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-5 text-gray-500 w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`cursor-pointer border-2  py-2 px-4 bg-gray-100 ${
                    item === size ? "border-red-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            className="cursor-pointer bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            onClick={(e) => handleAddToCart(e)}
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5"></hr>
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is also available</p>
            <p>Easy return and exchange policy</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex gap-2">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="mt-3 flex flex-col gap-4 border p-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem sunt aut voluptatum labore quam enim cumque obcaecati
            perspiciatis recusandae sequi ad accusamus quaerat odio adipisci,
            temporibus ullam, fugit porro deleniti.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum
            culpa voluptas doloribus pariatur voluptatem quia incidunt corporis
            repellat accusantium beatae aliquam, commodi dolorem facilis
            recusandae, similique aliquid? Necessitatibus, est quod?
          </p>
        </div>
      </div>

      <RelatedProduct
        category={productData.category}
        subcategory={productData.sub_category}
      />
    </div>
  ) : (
    <></>
  );
}

export default Product;
