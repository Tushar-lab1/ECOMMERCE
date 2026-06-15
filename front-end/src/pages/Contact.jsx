import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";

function Contact() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post("http://localhost:8000/message", {
        name: name,
        email: email,
        message: message,
      });
      alert("message sent");
    } catch (error) {
      console.log(error.data);
    }
  };

  return (
    <div className="px-6 md:px-16 py-12">
      {/* Heading */}
      <div className="text-center mb-14">
        <p className="text-sm uppercase tracking-[6px] text-gray-500">
          Get In Touch
        </p>

        <h1 className="text-4xl font-bold mt-2">Contact VibeWear</h1>

        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Questions, feedback, or need help with an order? Our team is here to
          help you.
        </p>
      </div>

      {/* Contact Section */}
      <div className="grid md:grid-cols-2 gap-14 items-center">
        {/* Left */}
        <div>
          <img
            src={
              assets.contact_img ||
              "https://images.unsplash.com/photo-1556740749-887f6717d7e4"
            }
            alt="Contact"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

        {/* Right */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Customer Support</h2>

            <p className="text-gray-600">
              Need assistance with shipping, orders, returns, or product
              information?
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <h3 className="font-semibold">📍 Address</h3>

              <p className="text-gray-600">
                VibeWear HQ
                <br />
                Pune, Maharashtra
              </p>
            </div>

            <div>
              <h3 className="font-semibold">📞 Phone</h3>

              <p className="text-gray-600">+91 98765 43210</p>
            </div>

            <div>
              <h3 className="font-semibold">✉️ Email</h3>

              <p className="text-gray-600">support@vibewear.com</p>
            </div>

            <div>
              <h3 className="font-semibold">🕒 Support Hours</h3>

              <p className="text-gray-600">
                Monday – Saturday
                <br />
                9:00 AM – 7:00 PM
              </p>
            </div>
          </div>

          <button
            className="
              cursor-pointer
              bg-black
              text-white
              px-8
              py-3
              rounded-full
              hover:bg-gray-800
              transition
            "
          >
            Send Message
          </button>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-24 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Send us a message
        </h2>

        <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-4 rounded-lg"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <textarea
            rows="5"
            placeholder="Write your message..."
            className="w-full border p-4 rounded-lg"
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <button
            type="submit"
            className="
              w-full
              bg-black
              text-white
              py-4
              rounded-lg
              hover:bg-gray-800
              cursor-pointer
            "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
