import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginComponent = () => {
  const [details, setDetails] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ emailErr: '', passwordErr: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleForm = (e) => {
    const { name, value } = e.target;

    setDetails({
      ...details,
      [name]: value
    });

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({
        ...errors,
        emailErr: !value ? 'This field is required' : (!emailRegex.test(value) ? 'Invalid email format' : '')
      });
    } else if (name === 'password') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
      setErrors({
        ...errors,
        passwordErr: !value ? 'This field is required' : (!passwordRegex.test(value) ? 'Password must be at least 8 characters and include uppercase, lowercase, digit, and special character' : '')
      });
    }
  };

const handleLogin = () => {
  const staticEmail = 'nadmin@admi.com';
  const staticPassword = 'Admin@123';

  if (details.email === staticEmail && details.password === staticPassword) {
    // Static credentials match
    localStorage.setItem('loggedInUser', JSON.stringify({ email: staticEmail }));
    navigate('/admin'); // Navigate to the dashboard or any other protected route
  } else {
    // Check against stored users if you have other users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === details.email && user.password === details.password);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      navigate('/'); // Navigate to the dashboard or any other protected route
    } else {
      toast.error('Invalid email or password');
    }
  }
};


  return (
    <>
    <div className="container">
     
      <h2 className='mt-5'>Login</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label mt-5 ">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={details.email}
            onChange={handleForm}
          />
          {errors.emailErr && <div className="text-danger">{errors.emailErr}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="form-label mt-5 ">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="password"
            name="password"
            value={details.password}
            onChange={handleForm}
          />
          {errors.passwordErr && <div className="text-danger">{errors.passwordErr}</div>}
          <div className="form-check mt-2">
            <input 
              type="checkbox" 
              className="form-check-input" 
              id="showPassword" 
              checked={showPassword} 
              onChange={() => setShowPassword(!showPassword)} 
            />
            <label className="form-check-label" htmlFor="showPassword">
              Show Password
            </label>
          </div>
        </div>
        <button type="button" className="btn btn-primary mb-5" onClick={handleLogin}>Login</button>
      </form>
      <ToastContainer />
    </div>
      
      </>
  );
};

export default LoginComponent;
