import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Profile from "./Profile/profile.jpg"; 
import "./styles.css"; // Import the CSS file

const MySwal = withReactContent(Swal);

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [playerID, setID] = useState(" ");
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [profilePic, setProfilePic] = useState(Profile);  
  const [token, setToken] = useState(" ");
  const [expire, setExpire] = useState(" ");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    refreshToken();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
        setIsScrolled(true);
      } else {
        setHasShadow(false);
        setIsScrolled(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setID(decoded.playerID);
      setName(decoded.name);
      setEmail(decoded.email);
      setExpire(decoded.exp);
      fetchProfilePic(decoded.playerID);
    } catch (error) {
      if (error.response) navigate("/");
    }
  };

  const fetchProfilePic = async (playerID) => {
    try {
      const response = await axios.get(`http://localhost:5000/players/${playerID}`);
      if (response.data.profile) {
        const fixedImagePath = response.data.profile.replace(/\\/g, "/");
        setProfilePic(`http://localhost:5000/${fixedImagePath}`);
      } else {
        setProfilePic(Profile);
      }
    } catch (error) {
      console.error("Error fetching player:", error);
    }
  };

  const handleLogoutClick = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You will be logged out of the admin dashboard.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        Logout();
      }
    });
  };

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className={`navbar-sticky mt-7 ${hasShadow ? "navbar-shadow" : ""} ${isScrolled ? "bg-white" : ""}`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <Link to="/user" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl whitespace-nowrap dark:text-black" style={{ fontFamily: 'Kaushan Script, cursive', color: '#36133B' }}>
            MakanAssyikk
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse" ref={dropdownRef}>
          <button
            type="button"
            className="flex text-sm shadow-lg rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded={dropdownOpen}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <img className="w-14 h-14 rounded-full bg-white" src={profilePic} alt="user photo" />
          </button>
          {dropdownOpen && (
            <div
              className="z-50 absolute top-16 right-28 mt-6 w-48 bg-white rounded-md shadow-lg divide-y divide-gray-100 dark:bg-gray-900 dark:divide-gray-600"
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">{name}</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{email}</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    to="/pembelian"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Pembelian
                  </Link>
                </li>
                <li>
                  <Link
                    to="/eror"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/profile/${playerID}`}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}
                  >
                    Pengaturan
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleLogoutClick}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Keluar
                  </Link>
                </li>
              </ul>
            </div>
          )}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="justify-between ml-52 hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            <li>
              <Link
                to="/user"
                className={`block py-2 px-3 ${
                  isActive("/user")
                    ? "text-black border-b-2 border-black"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-gray-700"
                }`}
                style={{ color: '#36133B' }}
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                to="/menu"
                className={`block py-2 px-3 rounded ${
                  isActive("/menu")
                    ? "text-black border-b-2 border-black"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-gray-700"
                }`}
                style={{ color: '#36133B' }}
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                to="/keranjang"
                className={`block py-2 px-3 rounded ${
                  isActive("/keranjang")
                    ? "text-black border-b-2 border-black"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-gray-700"
                }`}
                style={{ color: '#36133B' }}
              >
                Keranjang
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
