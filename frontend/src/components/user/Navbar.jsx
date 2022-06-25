import React from "react";
import { BsSunFill } from "react-icons/bs";
import Container from "./Container";
import { Link } from "react-router-dom";
import { useTheme } from "../../Hook";
function Navbar() {
  const { toggleTheme } = useTheme();
  return (
    <div className="bg-secondary shadow-sm shadow-gray-100">
      <Container className="p-2">
        <div className="flex justify-between text-white items-center">
          <Link to="/">
            <img src="./logo.png" alt="" className="h-10" />
          </Link>
          <ul className="flex items-center space-x-3">
            <li>
              <button
                className="bg-dark-subtle dark:bg-white p-1 rounded"
                onClick={() => toggleTheme()}
              >
                <BsSunFill size={20} className="text-secondary" />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="w-44 bg-transparent rounded outline-none border-2 border-dark-subtle p-1 focus:border-white transition"
                placeholder="search..."
              />
            </li>
            <Link to="/auth/sign-in">
              <li className="text-white font-semibold text-lg">Login</li>
            </Link>
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default Navbar;
