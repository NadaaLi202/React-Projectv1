import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, saveProduct, setSelectedProduct }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        price: product.price || '',
        description: product.description || '',
        image: product?.image || null,
        category: product.category || '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    saveProduct({ ...product, ...formData });
    setSelectedProduct(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      
      <div className="mb-3">
        <label className="form-label">Image</label>
        <input
          type="file"
          name="image"
          className="form-control"
          onChange={handleFileChange}
          //required
        />
        {formData.image && (
          <img
            src={formData.image}
            alt="Product"
            style={{ marginTop: '10px', maxWidth: '100%' }}
          />
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          name="category"
          className="form-control"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        {product?.id ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;
