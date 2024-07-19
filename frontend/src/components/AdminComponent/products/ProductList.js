import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      const productsWithFixedImagePaths = response.data.map(product => ({
        ...product,
        Gambar: product.Gambar.replace(/\\/g, '/')
      }));
      setProducts(productsWithFixedImagePaths);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      getProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const deleteSelectedProducts = async () => {
    try {
      for (let id of selectedProducts) {
        await axios.delete(`http://localhost:5000/products/${id}`);
      }
      getProducts();
      setSelectedProducts([]);
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Swal.fire(
          'Deleted!',
          'The Product has been deleted.',
          'success'
        );
      }
    });
  };

  const confirmDeleteSelected = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete them!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSelectedProducts();
        Swal.fire(
          'Deleted!',
          'The selected products have been deleted.',
          'success'
        );
      }
    });
  };

  const toggleProductSelection = (id) => {
    setSelectedProducts(prevSelectedProducts =>
      prevSelectedProducts.includes(id)
        ? prevSelectedProducts.filter(productId => productId !== id)
        : [...prevSelectedProducts, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(product => product.id));
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Product List</h2>
        {selectedProducts.length > 0 && (
          <button onClick={confirmDeleteSelected} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Delete Selected
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="border border-gray-300 px-4 py-2">No</th>
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Picture</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
              <th className="border border-gray-300 px-4 py-2">Updated At</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{product.ProductName}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.Gambar && (
                    <img src={`http://localhost:5000/${product.Gambar}`} alt="Product" className="max-w-full h-auto" style={{ maxWidth: '100px' }} />
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">{product.Quantity}</td>
                <td className="border border-gray-300 px-4 py-2">{formatPrice(product.Price)}</td>
                <td className="border border-gray-300 px-4 py-2">{product.Description}</td>
                <td className="border border-gray-300 px-4 py-2">{product.createdAt}</td>
                <td className="border border-gray-300 px-4 py-2">{product.updatedAt}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link to={`/editProduct/${product.id}`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">Edit</Link>
                  <button onClick={() => confirmDelete(product.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Link to={`/addProduct`} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Add New Product
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
