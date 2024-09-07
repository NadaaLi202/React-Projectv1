import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../Redux/productSlice';
import ProductForm from '../components/ProductForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarComponent from '../components/Navbar';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productsStatus = useSelector((state) => state.products.status);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  // const handleDelete = (id) => {
  //   if (window.confirm("Are you sure you want to delete this product?")){
  //     dispatch(deleteProduct(id));
  //   }
    
  //   };
    const handleDelete = (id) => {
      const confirmToast = toast.info(
        <div>
          <p>Are you sure you want to delete this product?</p>
          <div>
            <button
              onClick={() => {
                dispatch(deleteProduct(id));
                toast.success('Product deleted successfully!', {
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
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          closeButton: false,
          style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }
        }
      );
    };
  
  const handleAddProduct = (newProduct) => {
    dispatch(addProduct(newProduct));
    toast.success('Product added successfully!');
  };

  const handleUpdateProduct = (updatedProduct) => {
    dispatch(updateProduct(updatedProduct));
    toast.success('Product updated successfully!');
  };

  return (
    <div className="container mt-5">
            <NavbarComponent />
      <ToastContainer />
      <h2>Admin Dashboard</h2>
      <button className="btn btn-primary mb-3" onClick={() => setSelectedProduct({})}>
        Add New Product
      </button>
      {selectedProduct && (
        <ProductForm
          product={selectedProduct}
          saveProduct={selectedProduct.id ? handleUpdateProduct : handleAddProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}
      {productsStatus === 'loading' ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>
                  <button className="btn btn-warning me-2" onClick={() => handleEdit(product)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
