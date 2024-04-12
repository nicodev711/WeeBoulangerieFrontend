import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext.jsx";

function NavBar() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        setIsMobileDropdownOpen(false);
        setIsOpen(false);
    };

    return (
        <nav className="bg-boulangerie-main text-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div>
                        <NavLink to="/">
                            <img src="/logo.png" alt="Boulangerie Logo" className="h-8 m-4 rounded-lg" style={{height: "75px"}}/>
                        </NavLink>
                    </div>

                    {/* Primary Nav */}
                    <div className="flex-1 justify-center hidden md:flex items-center space-x-10">
                        <NavLink to="/" className={({ isActive }) => isActive ? "text-white border-b-2 border-white" : "text-white hover:text-gray-200 transition-colors duration-300"}>Home</NavLink>
                        <NavLink to="/products" className={({ isActive }) => isActive ? "text-white border-b-2 border-white" : "text-white hover:text-gray-200 transition-colors duration-300"}>Products</NavLink>
                        <NavLink to="/about" className={({ isActive }) => isActive ? "text-white border-b-2 border-white" : "text-white hover:text-gray-200 transition-colors duration-300"}>Who we are</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "text-white border-b-2 border-white" : "text-white hover:text-gray-200 transition-colors duration-300"}>Contact Us</NavLink>
                    </div>

                    {/* Profile/Login link for desktop */}
                    <div className="hidden md:block relative">
                        {user ? (
                            <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="py-5 px-3 text-white flex items-center">
                                    Profile
                                    <svg className={`ml-2 w-4 h-4 transition-transform transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 transition-opacity duration-300 ${isDropdownOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>
                                    {user.role === 'admin' && (
                                        <>
                                            <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>Profile</NavLink>
                                            <NavLink to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>Admin</NavLink>
                                        </>
                                    )}
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                                </div>
                            </>
                        ) : (
                            <NavLink to="/login" className="py-5 px-3 text-white hover:text-gray-200 transition-colors duration-300">Login</NavLink>
                        )}
                    </div>

                    {/* Mobile button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="flex flex-col py-2">
                    <NavLink to="/" className="py-2 px-4 block text-white hover:text-gray-200 transition-colors duration-300">Home</NavLink>
                    <NavLink to="/products" className="py-2 px-4 block text-white hover:text-gray-200 transition-colors duration-300">Products</NavLink>
                    <NavLink to="/about" className="py-2 px-4 block text-white hover:text-gray-200 transition-colors duration-300">Who we are</NavLink>
                    <NavLink to="/contact" className="py-2 px-4 block text-white hover:text-gray-200 transition-colors duration-300">Contact Us</NavLink>
                </div>
                <hr className="my-2 border-gray-700" />
                <div className="flex flex-col py-2">
                    {user ? (
                        <>
                            <button onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)} className="py-2 px-4 text-white w-full text-left flex items-center justify-between">
                                Profile
                                <svg className={`transition-transform transform ${isMobileDropdownOpen ? 'rotate-180' : 'rotate-0'} w-4 h-4`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            {isMobileDropdownOpen && (
                                <div className="flex flex-col py-2">
                                    {user.role === 'admin' && (
                                        <>
                                            <NavLink to="/profile" className="ml-4 py-2 px-4 text-white hover:text-gray-200 transition-colors duration-300 text-left" onClick={() => setIsMobileDropdownOpen(false)}>Profile</NavLink>
                                            <NavLink to="/admin" className="ml-4 py-2 px-4 text-white hover:text-gray-200 transition-colors duration-300 text-left" onClick={() => setIsMobileDropdownOpen(false)}>Admin</NavLink>
                                        </>
                                    )}
                                    <button onClick={handleLogout} className="ml-4 py-2 px-4 text-white hover:text-gray-200 transition-colors duration-300 text-left">Logout</button>
                                </div>
                            )}
                        </>
                    ) : (
                        <NavLink to="/login" className="py-2 px-4 block text-white hover:text-gray-200 transition-colors duration-300">Login</NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
