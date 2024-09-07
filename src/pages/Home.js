import React from 'react';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <NavbarComponent />
      
      {/* Hero Section */}
      <header className="hero bg-secondary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">{t('Welcome to MyShop')}</h1>
          <p className="lead">Your one-stop shop for all your needs.</p>
          <a href="/products" className="btn btn-dark btn-lg">{t('Shop Now')}</a>
        </div>
      </header>

      {/* Features Section */}
      <section className="features py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="feature bg-light p-4 rounded">
                <h3>Quality Products</h3>
                <p>We offer a wide range of high-quality products to meet your needs.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature bg-light p-4 rounded">
                <h3>Affordable Prices</h3>
                <p>Get the best deals and discounts on your favorite products.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature bg-light p-4 rounded">
                <h3>Fast Shipping</h3>
                <p>Enjoy fast and reliable shipping on all your orders.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">What Our Customers Say</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="testimonial p-4 bg-white rounded shadow-sm">
                <p>"Great selection of products and excellent customer service!"</p>
                <footer className="blockquote-footer">John Doe</footer>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="testimonial p-4 bg-white rounded shadow-sm">
                <p>"Fast delivery and very reasonable prices. Highly recommend!"</p>
                <footer className="blockquote-footer">Jane Smith</footer>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="testimonial p-4 bg-white rounded shadow-sm">
                <p>"A wonderful shopping experience. Will definitely return!"</p>
                <footer className="blockquote-footer">Emily Johnson</footer>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
