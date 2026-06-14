import React from "react";
import { NavLink } from "react-router-dom";
// About.jsx

export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">About VibeWear</h1>

        <p className="max-w-2xl mx-auto text-lg text-gray-300">
          Fashion is more than clothing — it’s a way to express who you are. At
          VibeWear, we create styles that match your energy, confidence, and
          everyday vibe.
        </p>
      </section>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
            alt="Fashion"
            className="rounded-2xl shadow-lg"
          />

          <div>
            <h2 className="text-3xl font-bold mb-5">Our Story</h2>

            <p className="text-gray-600 leading-8">
              VibeWear was created with one idea in mind — fashion should feel
              effortless and personal. We believe everyone deserves access to
              stylish, comfortable, and premium-quality clothing without
              compromising affordability.
            </p>

            <p className="text-gray-600 leading-8 mt-5">
              From everyday essentials to statement pieces, every collection is
              designed to help you wear your vibe confidently.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We Stand For
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>

              <p className="text-gray-600">
                Carefully selected materials and attention to detail in every
                piece.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-3">Trend Driven</h3>

              <p className="text-gray-600">
                Modern collections inspired by current fashion and everyday
                wear.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-3">Customer First</h3>

              <p className="text-gray-600">
                Fast delivery, simple shopping, and support you can rely on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Wear Your Vibe</h2>

        <p className="text-gray-600 mb-8">
          Discover collections designed for every mood, moment, and style.
        </p>

        <NavLink to={"/home"}>
          <button className="bg-black text-white px-8 py-3 rounded-full hover:opacity-90 cursor-pointer">
            Shop Now
          </button>
        </NavLink>
      </section>
    </div>
  );
}
