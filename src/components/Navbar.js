import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import styles from "../pages/ProductListPage.module.css"
const Navbar = () => {
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/';
  };

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const isLoggedIn = !!loggedInUser;
  const isAdmin = loggedInUser?.role === 'admin';

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <BootstrapNavbar bg="light" expand="lg" fixed="top" className={styles.navPading}>
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">MyShop</BootstrapNavbar.Brand>
        <BootstrapNavbar aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">{t('Home')}</Nav.Link>
            <Nav.Link as={Link} to="/products">{t('Products')}</Nav.Link>
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/cart">{t('Cart')}</Nav.Link>
                <Nav.Link as={Link} to="/wishlist">{t('Wishlist')}</Nav.Link>
                <Nav.Link as={Link} to="/account">{t('Account')}</Nav.Link>
                {isAdmin && (
                  <Nav.Link as={Link} to="/admin">{t('Admin Panel')}</Nav.Link>
                )}
                <Nav.Link onClick={handleLogout}>{t('Logout')}</Nav.Link>
              </>
            )}
            <Nav.Link onClick={() => changeLanguage('en')}>English</Nav.Link>
            <Nav.Link onClick={() => changeLanguage('ar')}>العربية</Nav.Link>
            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/login">{t('Login')}</Nav.Link>
                <Nav.Link as={Link} to="/register">{t('Register')}</Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;