import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from '../Context/CartProvider';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);

  const calculateTotal = useCallback(() => {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    setTotal(totalPrice);
    setTax(totalPrice * 0.15); // 15% tax
  }, [cart]);

  useEffect(() => {
    calculateTotal();
  }, [cart, calculateTotal]);

  const handleRemove = (id) => {
    const confirmToast = toast.info(
      <div>
        <p>Are you sure you want to remove this item?</p>
        <button
          onClick={() => {
            removeFromCart(id);
            toast.success('Item removed from cart!', {
              position: "top-center",
              autoClose: 3000
            });
            toast.dismiss(confirmToast); // Close confirmation toast
          }}
          style={{ marginRight: '10px' }}
        >
          Yes
        </button>
        <button onClick={() => toast.dismiss(confirmToast)}>No</button>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
        style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }
      }
    );
  };

  const handleUpdateQuantity = (id, quantity) => {
    updateQuantity(id, Math.max(1, quantity));
  };

  return (
  <>
    <NavbarComponent />
    <div className="container mt-5">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                    className="form-control"
                    style={{ width: '80px' }}
                    min="1"
                  />
                </td>
                <td>${(item.price * item.quantity)}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleRemove(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-4">
        <h4>Subtotal: ${total}</h4>
        <h4>Tax (15%): ${tax}</h4>
        <h4>Total: ${(total + tax)}</h4>
      </div>
      
      <ToastContainer /> {/* Add ToastContainer here */}
      
    </div>
    <Footer />
    
  </>
  );
};

export default CartPage;
