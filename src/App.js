// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductListComponent from './pages/ProductListPage';
import LoginComponent from './pages/LoginPage';
import ProductDetailPage from './pages/ProductDetailPage';
// import CartPage from './pages/CartPage';
import ShoppingCart from './pages/CartPage';
// import WishlistPage from './pages/WishlistPage';
import WishlistComponent from './pages/WishlistPage';
// import AdminPanel from './pages/AdminPanel';
import AdminDashboard from './pages/AdminPanel';
// import LoginPage from './pages/LoginPage';
import RegisterComponent from './pages/RegisterPage';
// import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';
import UserAccountPage from './pages/UserAccountPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListComponent />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/wishlist" element={< WishlistComponent/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/account" element={<UserAccountPage />} />
      </Routes>
    </Router>
  );
};

export default App;
