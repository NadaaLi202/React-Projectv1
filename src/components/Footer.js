import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* About Us Section */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h3 className="h5 mb-3">About Us</h3>
            <p className="small">
              MyShop is a lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Consequat dolor odio odio malesuada at condimentum adipiscing iaculis semper.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h3 className="h5 mb-3">Quick Links</h3>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/home" className="text-white text-decoration-none">Home</Link></li>
              <li className="mb-2"><Link to="/products" className="text-white text-decoration-none">Products</Link></li>
              <li className="mb-2"><Link to="/services" className="text-white text-decoration-none">Services</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-white text-decoration-none">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="col-md-4">
            <h3 className="h5 mb-3">Contact Us</h3>
            <ul className="list-unstyled">
              <li className="mb-2 small">Email: contact@Myfurniture.com</li>
              <li className="mb-2 small">Phone: +1234567890</li>
              <li className="mb-2 small">Address: 123 Street, City, Country</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-4 pt-3 border-top border-secondary">
        <p className="small mb-0">&copy; 2024 MyShop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;