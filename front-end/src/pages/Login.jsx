import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
function Login() {
  const [login, setlogin] = useState(true);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [error, seterror] = useState(null);
  const { setNoItem } = useContext(ShopContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror(null);

    if (!login) {
      // --- SIGN UP ---
      if (password !== confirmpassword) {
        seterror("Passwords do not match");
        return; // Stops the function here
      }

      try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post("http://localhost:8000/user/", {
          name,
          email,
          password,
        });
        const loginResponse = await axios.post("http://localhost:8000/signin", {
          email,
          password,
        });
        localStorage.setItem("access_token", loginResponse.data.access_token);
        localStorage.setItem("email", email);
        const email = localStorage.getItem("email");
        const cartresponse = await axios.get(
          `http://localhost:8000/cart/products/${email}`,
        );
        setNoItem(cartresponse.data.length);
        navigate("/home");
      } catch (err) {
        // Correctly extract the error text from the backend
        if (err.response && err.response.data && err.response.data.detail) {
          seterror(err.response.data.detail);
        } else {
          seterror(err.response?.data?.detail || "Signup failed");
        }
      }
    } else {
      // --- LOGIN ---
      try {
        const response = await axios.post("http://localhost:8000/signin", {
          email,
          password,
        });
        localStorage.setItem("email", email);
        const token = response.data.access_token;

        localStorage.setItem("access_token", token);

        navigate("/home");
      } catch (err) {
        seterror(err.response?.data?.detail || "Login failed");
      }
    }
  };

  return (
    <div className="w-100 mx-auto border-1 rounded-sm p-5">
      <div className="relative flex border rounded-full overflow-hidden">
        {/* Sliding background */}
        <div
          className={`absolute top-0 h-full w-1/2 bg-red-100 rounded-full transition-all duration-300 ease-in-out ${
            login ? "left-0" : "left-1/2"
          }`}
        />

        <h1
          onClick={() => setlogin(true)}
          className="relative z-10 w-1/2 text-center p-2 cursor-pointer"
        >
          Login
        </h1>

        <h1
          onClick={() => setlogin(false)}
          className="relative z-10 w-1/2 text-center p-2 cursor-pointer"
        >
          Sign up
        </h1>
      </div>
      {login ? (
        <>
          <form
            className="flex flex-col justify-center mt-5 gap-5"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              placeholder="Email"
              className="border-b-1 p-1"
              required
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="border-b-1 p-1"
              required
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <button className="border-1 p-2 w-[70%] m-auto mt-2 rounded-2xl text-xl hover:bg-[#000] hover:text-white cursor-pointer">
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <form
            className="flex flex-col justify-center mt-5 gap-5 "
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              placeholder="Name"
              className="border-b-1 p-1"
              required
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <input
              placeholder="Email"
              className="border-b-1 p-1"
              required
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="border-b-1 p-1"
              required
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <input
              placeholder="Confirm password"
              className="border-b-1 p-1"
              required
              type="password"
              value={confirmpassword}
              onChange={(e) => setconfirmpassword(e.target.value)}
            />
            <button className="border-1 p-2 w-[70%] m-auto mt-2 rounded-2xl text-xl hover:bg-[#000] hover:text-white cursor-pointer">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Login;
