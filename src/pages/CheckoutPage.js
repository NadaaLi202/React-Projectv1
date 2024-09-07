import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';

const CheckoutPage = () => {
  const cartItems = useSelector(state => state.cart.items);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleOrder = () => {
    // هنا يجب إضافة منطق الدفع ومعالجة الطلب
    alert('Order placed successfully!');
  };

  return (
    <>
      <NavbarComponent />
      <div className="container my-4">
        <h2>Checkout</h2>
        <div className="row">
          <div className="col-md-8">
            <h4>Shipping Address</h4>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <h4>Payment Method</h4>
            <select
              className="form-select mb-3"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cashOnDelivery">Cash on Delivery</option>
            </select>
          </div>
          <div className="col-md-4">
            <h4>Order Summary</h4>
            <ul className="list-group mb-3">
              {cartItems.map(item => (
                <li className="list-group-item d-flex justify-content-between" key={item.id}>
                  <div>
                    <h6 className="my-0">{item.title}</h6>
                    <small className="text-muted">x{item.quantity}</small>
                  </div>
                  <span className="text-muted">${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${totalPrice.toFixed(2)}</strong>
              </li>
            </ul>
            <button className="btn btn-primary w-100" onClick={handleOrder}>Place Order</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
