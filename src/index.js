import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { CartProvider } from './Context/CartProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import ar from './locales/ar';

const resources = {
  en: en,
  ar: ar,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // اللغة الافتراضية
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React بالفعل تقوم بحماية القيم
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <CartProvider>
        <App />
    <ToastContainer />
    </CartProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();

