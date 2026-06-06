import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [login, setlogin] = useState(true);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
    // TODO:
    // Connect the backend and the database
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
            />
            <input
              placeholder="Password"
              className="border-b-1 p-1"
              required
              type="password"
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
            />
            <input
              placeholder="Email"
              className="border-b-1 p-1"
              required
              type="email"
            />
            <input
              placeholder="Password"
              className="border-b-1 p-1"
              required
              type="password"
            />
            <input
              placeholder="Confirm password"
              className="border-b-1 p-1"
              required
              type="password"
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
