import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// local imports
import Logo from "../public/Favicon/logo.ico";

const Header = () => {
  const [store, setStore] = useState([])

  let currentUrl;
  if (typeof window !== "undefined") {
    currentUrl = window.location.href;
  }
  const logout = () => {
    try {
      localStorage.clear();
      localStorage.setItem("showToast", true);
      window.location.href = '/';
      // window.location.reload();
    } catch (err) {
      toast('Logout failed!', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
    }
  };
  
  useEffect(() => {
    const store = JSON.parse(localStorage.getItem('login'));
    setStore(store);
  
    if (localStorage.getItem("showToast") === "true") {
      toast('Logout successful!', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success'
      });
      localStorage.removeItem("showToast");
    }
  }, []);
  

  const logoutButton = () => {
    try {
      if (store['login'] == true) {
        return <button onClick={logout} className="bg-green-500 bg-opacity-50 rounded-lg p-2 ml-auto">
          Logout
        </button>
      }
      else {
        return null;
      }
    } catch (err) {
      return false;
    }
  }
  return (
    <div className="border-b border-[#FEFD32] w-full h-[15vh] flex justify-between items-center px-[5%] mb-4">
      <Image
        src={Logo}
        alt="logo"
        className="min-w-[6%] h-full cursor-pointer object-contain"
      />
      {currentUrl === "/" ? (
        <>
          <BsMoonStarsFill className="text-xl cursor-pointer object-contain" />
        </>
      ) : (
        <>
          {logoutButton()}
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Header;
