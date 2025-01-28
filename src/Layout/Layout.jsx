import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoLibrary, IoAdd } from "react-icons/io5";
import { LuSquareLibrary } from "react-icons/lu";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: LuSquareLibrary, label: "Book List", path: "/" },
    { icon: IoAdd, label: "Add Book", path: "/book/new" },
  ];

  const NavItem = ({ icon: Icon, label, path }) =>
    isSidebarOpen ? (
      <NavLink
        onClick={() => setIsMobileMenuOpen(false)}
        to={path}
        className={({ isActive }) =>
          `flex items-center  px-4 py-3 text-md font-medium rounded-lg transition-all duration-200 ${
            isActive
              ? "bg-blue-50 text-gray-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`
        }
      >
        <Icon className="h-5 w-5 mr-3" />
        <span className={`transition-opacity duration-200`}>{label}</span>
      </NavLink>
    ) : (
      <NavLink
        to={path}
        onClick={() => setIsMobileMenuOpen(false)}
        className={({ isActive }) =>
          `p-2.5 flex justify-start w-full max-w-fit  text-md font-medium rounded-lg transition-all duration-200 ${
            isActive
              ? "bg-gray-100 text-gray-700"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`
        }
      >
        <Icon className="h-6 w-6" />
      </NavLink>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      <div
        className={`fixed inset-y-0 left-0 bg-white border-r border-gray-200 p-2 hidden md:block  ${
          isSidebarOpen ? "w-64" : "w-24"
        }`}
      >
        <div className="flex items-center justify-between pt-4 ">
          <div className="flex items-center space-x-3 px-2 ">
            <div className="bg-orange-400 p-2.5 rounded-lg">
              <IoLibrary className="h-6 w-6 text-white" />
            </div>
            {isSidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-gray-800 tracking-tight">
                  Book Inventory
                </h1>
                <p className="text-gray-900 text-xs mt-1">
                  Manage your book shop
                </p>
              </div>
            )}
          </div>

          <div
            className=" flex justify-end cursor-pointer  "
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <MdKeyboardDoubleArrowLeft size={22} className="text-gray-400" />
            ) : (
              <MdKeyboardDoubleArrowRight size={22} className="text-gray-400" />
            )}
          </div>
        </div>

        <div className=" px-2 py-4  mt-10  space-y-4">
          {navItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </div>
      </div>

      <div
        className={`fixed z-50 inset-y-0 left-0 bg-white border-r border-gray-200 p-2 md:hidden transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex justify-end items-center cursor-pointer"
        >
          {" "}
          <FaTimes className="h-4 w-4" />
        </div>

        <div className="flex items-center justify-between pt-4 ">
          <div className="flex items-center space-x-3 px-2 ">
            <div className="bg-orange-400 p-2.5 rounded-lg">
              <IoLibrary className="h-6 w-6 text-white" />
            </div>
            {isSidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-gray-800 tracking-tight">
                  Book Inventory
                </h1>
                <p className="text-gray-900 text-xs mt-1">
                  Manage your book shop
                </p>
              </div>
            )}
          </div>
        </div>

        <div className=" px-2 py-4  mt-10  space-y-4">
          {navItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </div>
      </div>

      <div
        className={`w-full transition-all duration-300 ${
          isSidebarOpen ? "md:pl-64" : "md:pl-24"
        }`}
      >
        <nav className="fixed w-full top-0 bg-white border-b border-gray-200 z-30">
          <div className="px-4 mx-auto">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 cursor-pointer rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none md:hidden"
                >
                  <FaBars className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-16">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
