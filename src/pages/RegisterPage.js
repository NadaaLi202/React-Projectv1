import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const RegisterComponent = () => {
  const [details, setDetails] = useState({ email: '', name: '', username: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({ emailErr: '', nameErr: '', usernameErr: '', passwordErr: '', confirmPasswordErr: '' });
  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const navigate = useNavigate();

  const handleForm = (e) => {
    const { name, value } = e.target;

    setDetails({
      ...details,
      [name]: value
    });

    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors({
          ...errors,
          emailErr: !value ? 'This field is required' : (!emailRegex.test(value) ? 'Invalid email format' : '')
        });
        break;

      case 'name':
        setErrors({
          ...errors,
          nameErr: !value ? 'This field is required' : ''
        });
        break;

      case 'username':
        setErrors({
          ...errors,
          usernameErr: !value ? 'This field is required' : (/\s/.test(value) ? 'Username should not contain spaces' : '')
        });
        break;

      case 'password':
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        setErrors({
          ...errors,
          passwordErr: !value ? 'This field is required' : (!passwordRegex.test(value) ? 'Password must be at least 8 characters and include uppercase, lowercase, digit, and special character' : '')
        });
        break;

      case 'confirmPassword':
        setErrors({
          ...errors,
          confirmPasswordErr: value !== details.password ? 'Passwords do not match' : ''
        });
        break;

      default:
        break;
    }
  };

  const handleRegister = () => {
    // تحقق من إذا كانت كل الحقول فارغة أو بها أخطاء
    if (Object.values(errors).some(err => err) || Object.values(details).some(detail => !detail)) {
      toast.error('Please fix all errors before registering');
      return;
    }

    // تحقق من إذا كان المستخدم موجود بالفعل
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === details.email);

    if (userExists) {
      toast.error('User with this email already exists');
    } else {
      const newUser = { email: details.email, password: details.password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      toast.success('Registered successfully!');
      navigate('/login'); // توجيه المستخدم إلى صفحة تسجيل الدخول بعد التسجيل
    }
  };

  return (
    
    <>
    <div className="container mt-5 mb-4">
      
      <h2>Register</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
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
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={details.name}
            onChange={handleForm}
          />
          {errors.nameErr && <div className="text-danger">{errors.nameErr}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={details.username}
            onChange={handleForm}
          />
          {errors.usernameErr && <div className="text-danger">{errors.usernameErr}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type={showPasswordOne ? "text" : "password"}
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
              id="showPasswordOne" 
              checked={showPasswordOne} 
              onChange={() => setShowPasswordOne(!showPasswordOne)} 
            />
            <label className="form-check-label" htmlFor="showPasswordOne">
              Show Password
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type={showPasswordTwo ? "text" : "password"}
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={details.confirmPassword}
            onChange={handleForm}
          />
          {errors.confirmPasswordErr && <div className="text-danger">{errors.confirmPasswordErr}</div>}
          <div className="form-check mt-2">
            <input 
              type="checkbox" 
              className="form-check-input" 
              id="showPasswordTwo" 
              checked={showPasswordTwo} 
              onChange={() => setShowPasswordTwo(!showPasswordTwo)} 
            />
            <label className="form-check-label" htmlFor="showPasswordTwo">
              Show Confirm Password
            </label>
          </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleRegister}>Register</button>
      </form>
      </div>

      
    </>

  );
};

export default RegisterComponent;
