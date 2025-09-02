import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";
function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // setShowSearch(false);
    // console.log(location.pathname)
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else setVisible(false);
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-content border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-2/3 sm:w-1/2">
        <input
          placeholder="Search"
          type="text"
          className="flex-1 outline-none bg-inherit text-sm"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <img className="w-4" src={assets.search_icon} alt="" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        src={assets.cross_icon}
        className="inline w-3 cursor-pointer"
        alt=""
      />
    </div>
  ) : (
    ""
  );
}

export default SearchBar;
