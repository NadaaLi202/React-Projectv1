import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';

const UserAccountPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <NavbarComponent />
      <div className="container my-4 py-5">
        <h2>User Account</h2>
        {user ? (
          <div>
            {console.log(user)
            }
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserAccountPage;
