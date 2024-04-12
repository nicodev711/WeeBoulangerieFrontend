import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-boulangerie-main text-white py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-center items-center text-center md:text-left">
                {/* Social Network Links */}
                <nav className="flex justify-center items-center space-x-4 mb-4 md:mb-0 mx-10">
                    <a href="https://www.facebook.com/theweeboulangerie/" className="text-xl hover:text-gray-400" aria-label="Facebook">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="https://twitter.com/example" className="text-xl hover:text-gray-400" aria-label="Twitter">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="https://www.instagram.com/theweeboulangerie/" className="text-xl hover:text-gray-400" aria-label="Instagram">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </nav>
                {/* Navigation Links */}
                <nav className="text-sm mx-10">
                    <ul className="flex flex-wrap justify-center space-x-4">
                        <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
                        <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
                        <li><a href="/faq" className="hover:text-gray-400">FAQ</a></li>
                        <li><a href="/sitemap" className="hover:text-gray-400">Site Map</a></li>
                    </ul>
                </nav>
            </div>
            {/* Legal and Copyright Information */}
            <div className="container mx-auto mt-4 text-sm text-center">
                <p>© 2024 The Wee Boulangerie. All rights reserved.</p>
                <p className="mt-2">Terms of Use | Privacy Policy | Cookie Policy</p>
            </div>
        </footer>
    );
}

export default Footer;
