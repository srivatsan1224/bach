import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <div className="mb-4">
            <h1 className="text-3xl font-bold">BACHELORS</h1>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            High level experience in web design and development knowledge,
            producing quality work.
          </p>
          <p className="mt-4 text-sm text-gray-500">© 2021 All Rights Reserved</p>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow us</h3>
          <div className="flex items-center space-x-4 mb-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-telegram-plane"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-globe"></i>
            </a>
          </div>
          <p className="text-sm text-gray-400">
            Call us <br />
            <a href="tel:+18008543680" className="hover:underline">
              +1 800 854-36-80
            </a>
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Landing Page
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Popup Builder
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Web-design
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Content
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Integrations
              </a>
            </li>
          </ul>
        </div>

        {/* Use Cases */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Use Cases</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Web-designers
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Marketers
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Small Business
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Website Builder
              </a>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Teams
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Links */}
      <div className="mt-10 border-t border-gray-800 pt-4 text-sm text-gray-500 text-center">
        <a href="#" className="mx-2 hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="mx-2 hover:underline">
          Terms of Use
        </a>
        <a href="#" className="mx-2 hover:underline">
          Sales and Refunds
        </a>
        <a href="#" className="mx-2 hover:underline">
          Legal
        </a>
        <a href="#" className="mx-2 hover:underline">
          Site Map
        </a>
      </div>
    </footer>
  );
};

export default Footer;
