import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaThLarge, FaSearch } from 'react-icons/fa'; // Import ikon pencarian
import "./menu.css";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [playerID, setPlayerID] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setPlayerID(decoded.playerID);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) navigate("/");
    }
  };

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

  const formatPrice = (price) => {
    return `IDR ${new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(price)}`;
  };

  const addToCart = async (product) => {
    try {
      const response = await axios.get("http://localhost:5000/cart", {
        params: { id_player: playerID },
      });

      const cartItem = response.data.find(item => item.ProductName === product.ProductName);

      if (cartItem) {
        const newQuantity = parseInt(cartItem.quantity) + 1;
        console.log(`Updating quantity for ${cartItem.ProductName} from ${cartItem.quantity} to ${newQuantity}`);
        await axios.put(`http://localhost:5000/cart/${cartItem.id}`, {
          quantity: newQuantity,
        });
        alert('Berhasil menambah item');
      } else {
        await axios.post('http://localhost:5000/cart', {
          id_player: playerID,
          ProductName: product.ProductName,
          gambar: product.Gambar,
          quantity: 1,
          price: product.Price
        });
        alert('Berhasil menambah item');
      }
    } catch (error) {
      console.log("Error adding to cart:", error);
      if (error.response) {
        console.log("Response status:", error.response.status);
        console.log("Response data:", error.response.data);
      }
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredProducts = products.filter(product =>
    product.ProductName.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedFilter === "ALL" || product.FilterCategory === selectedFilter)
  );

  const filters = [
    { label: "ALL", value: "ALL" },
    { label: "Category1", value: "25" },
    { label: "Category2", value: "12" },
    { label: "Category3", value: "40" },
    { label: "Category4", value: "21" },
    { label: "Category5", value: "11" }
  ];

  return (
    <div>
      <div className="mt-6 flex justify-center">
        <div className="relative w-full max-w-7xl">
          <FaSearch className="absolute left-6 top-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari Produk..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-3 pl-14 border rounded-2xl shadow-sm"
          />
        </div>
      </div>

      <div className="flex justify-left ml-32 mt-16 space-x-4">
        {filters.map((filter) => (
          <div
            key={filter.value}
            onClick={() => handleFilterChange(filter.value)}
            className={`cursor-pointer p-4 text-white rounded-xl shadow-md transition-transform transform hover:scale-105 ${selectedFilter === filter.value ? 'bg-choose' : 'bg-custom-color'}`}
            style={{ width: '155px', height: '167px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
          >
            <FaThLarge className="text-3xl mb-2" />
            <div className="text-center">
              <p className="text-lg font-semibold">{filter.label}</p>
              <p className="text-sm">{filter.value} Items</p>
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto flex justify-center items-center">
        <div className="grid grid-cols-1 m-0 mt-16 mb-20 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="text-center col-span-full">Tidak ada item yang tersedia</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="p-5 rounded-xl bg-white" style={{ height: '410px', width: '300px' }}>
                {product.Gambar && (
                  <img
                    src={`http://localhost:5000/${product.Gambar}`}
                    alt={product.ProductName}
                    className="w-full h-52 object-cover mb-4 rounded-md"
                  />
                )}
                <h2 className="text-2xl font-semibold mb-1">{product.ProductName}</h2>
                <p className="text-sm text-gray-400 mb-1">Stok : {product.Quantity}</p>
                <p className="text-green-700 font-bold mb-5">{formatPrice(product.Price)}</p>
                <button
                  className="text-white py-2 px-4 rounded-xl transition-colors w-full"
                  style={{ background: '#36133B' }}
                  onClick={() => addToCart(product)}
                >
                  Tambah Ke Keranjang
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
