import { NavLink } from "react-router-dom"
import React, { useState } from "react"

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-orange-600 tracking-wide animate-pulse">
            Manna Mashla Bhandar
          </div>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden flex items-center px-3 py-2 border rounded text-orange-600 border-orange-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          {/* Desktop menu */}
          <div className="space-x-4 hidden md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded transition font-medium ${
                  isActive
                    ? "bg-orange-500 text-white shadow"
                    : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/customers"
              className={({ isActive }) =>
                `px-4 py-2 rounded transition font-medium ${
                  isActive
                    ? "bg-orange-500 text-white shadow"
                    : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                }`
              }
            >
              Customers
            </NavLink>
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                `px-4 py-2 rounded transition font-medium ${
                  isActive
                    ? "bg-orange-500 text-white shadow"
                    : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                }`
              }
            >
              Upload Data
            </NavLink>
          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4">
            <div className="flex flex-col space-y-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded transition font-medium ${
                    isActive
                      ? "bg-orange-500 text-white shadow"
                      : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/customers"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded transition font-medium ${
                    isActive
                      ? "bg-orange-500 text-white shadow"
                      : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                Customers
              </NavLink>
              <NavLink
                to="/upload"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded transition font-medium ${
                    isActive
                      ? "bg-orange-500 text-white shadow"
                      : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                Upload Data
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default NavBar
