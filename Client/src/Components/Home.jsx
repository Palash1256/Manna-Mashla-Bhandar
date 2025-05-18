import React from "react";
import { NavLink } from "react-router-dom";

// Example image URL (replace with your own if desired)
const heroImg ="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex flex-col">
      {/* Navbar */}
      
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center flex-1 px-4 py-12 md:py-20">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 animate-fade-in-up">
          <div className="text-4xl md:text-6xl font-extrabold text-orange-700 mb-4 drop-shadow animate-bounce">
            Welcome to{" "}
            <div className="text-orange-500">Manna Mashla Bhandar</div>
          </div>
          <p className="text-lg md:text-2xl text-gray-700 mb-8 max-w-xl mx-auto md:mx-0">
            Discover the finest spices and masalas. Authentic flavors, premium
            quality, and unbeatable service for your kitchen!
          </p>
          <NavLink
            to="/customers"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-orange-600 transition transform hover:scale-105 animate-fade-in"
          >
            Explore Customers
          </NavLink>
        </div>
        <div className="md:w-1/2 flex justify-center animate-fade-in">
          <img
            src={heroImg}
            alt="Spices"
            className="rounded-2xl shadow-lg w-80 h-80 object-cover border-4 border-orange-200 animate-zoom-in"
          />
        </div>
      </section>
      {/* Animations */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 1.2s ease;
          }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(60px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in-up {
            animation: fade-in-up 1.2s cubic-bezier(.4,0,.2,1);
          }
          @keyframes zoom-in {
            from { transform: scale(0.8);}
            to { transform: scale(1);}
          }
          .animate-zoom-in {
            animation: zoom-in 1.2s cubic-bezier(.4,0,.2,1);
          }
        `}
      </style>
    </div>
  );
};

export default Home;
