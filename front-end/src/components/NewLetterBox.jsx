import React from "react";
function NewLetterBox() {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Button Clicked");
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, in est.
        Ratione eveniet nam, illo natus voluptas voluptatum vero error quo,
      </p>
      <form className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 pl-3">
        <input
          type="email"
          placeholder="Enter Your Email"
          className="w-full sm:flex-1 outline-none border p-4"
          required
        />
        <button
          onClick={onSubmitHandler}
          className="bg-black text-white text-2 px-10 py-4 cursor-pointer"
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default NewLetterBox;
