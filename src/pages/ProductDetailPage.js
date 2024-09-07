import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../Context/CartProvider';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../Redux/wishlistSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./ProductDetailPage.module.css";
import { useTranslation } from 'react-i18next';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProduct = () => {
      // Get the products from localStorage
      const products = JSON.parse(localStorage.getItem('products')) || [];
      console.log('Products in localStorage:', products); // Log products to check

      // Log the ID from useParams
      console.log('Requested Product ID:', id);

      // Ensure ID is a string for comparison
      const productId = id.toString();

      // Find the product with the matching ID
      const foundProduct = products.find((prod) => prod.id === productId);
      console.log('Product found:', foundProduct); // Log the found product

      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        console.error('Product not found with ID:', productId);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const userLoggedIn = localStorage.getItem('loggedInUser');
    if (userLoggedIn) {
      addToCart(product);
      toast.success(`${product.title} added to cart successfully!`);
    } else {
      navigate('/register');
    }
  };

  const handleAddToWishlist = () => {
    const userLoggedIn = localStorage.getItem('loggedInUser');

    if (userLoggedIn) {
      if (wishlist && wishlist.length > 0) {
        const isProductInWishlist = wishlist.some((item) => item.id === product.id);

        if (isProductInWishlist) {
          toast.info(`${product.title} is already in your wishlist!`);
        } else {
          dispatch(addToWishlist(product));
          toast.success(`${product.title} added to wishlist!`);
        }
      } else {
        dispatch(addToWishlist(product));
        toast.success(`${product.title} added to wishlist!`);
      }
    } else {
      navigate('/register');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <NavbarComponent />
      <div className="container">
        <div className={`row ${styles.productDetailsPage}`}>
          <div className="col-12 col-lg-5">
            <div className={styles.imageContainer}>
              <img src={product.image} alt={product.title} className={styles.mainImage} />
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <div className={styles.productInfo}>
              <h1 className={styles.productTitle}>{product.title}</h1>
              <p className={styles.productPrice}>${product.price}</p>
              <p className={styles.productDescription}>{product.description}</p>
              <div className={styles.buttonContainer}>
                <button className={styles.addToCartButton} onClick={handleAddToCart}>{t('Add To Cart')}</button>
                <button onClick={handleAddToWishlist} className={styles.wishlistButton}>{t('Add to Wishlist')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default ProductDetailPage;





