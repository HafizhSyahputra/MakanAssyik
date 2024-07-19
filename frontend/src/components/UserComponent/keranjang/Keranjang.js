import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./keranjang.css";

const Keranjang = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const [playerID, setPlayerID] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  useEffect(() => {
    refreshToken();
  }, []);

  useEffect(() => {
    if (playerID) {
      getCart(playerID);
    }
  }, [playerID]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      const productsWithFixedImagePaths = response.data.map((product) => ({
        ...product,
        Gambar: product.Gambar.replace(/\\/g, "/"),
      }));
      setProducts(productsWithFixedImagePaths);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = async (product) => {
    try {
      const response = await axios.get("http://localhost:5000/cart", {
        params: { id_player: playerID },
      });

      const cartItem = response.data.find(
        (item) => item.ProductName === product.ProductName
      );

      if (cartItem) {
        const newQuantity = parseInt(cartItem.quantity) + 1;
        console.log(
          `Updating quantity for ${cartItem.ProductName} from ${cartItem.quantity} to ${newQuantity}`
        );
        await axios.put(`http://localhost:5000/cart/${cartItem.id}`, {
          quantity: newQuantity,
        });
        alert("Berhasil menambah item");
      } else {
        await axios.post("http://localhost:5000/cart", {
          id_player: playerID,
          ProductName: product.ProductName,
          gambar: product.Gambar,
          quantity: 1,
          price: product.Price,
        });
        alert("Berhasil menambah item");
      }
    } catch (error) {
      console.log("Error adding to cart:", error);
      if (error.response) {
        console.log("Response status:", error.response.status);
        console.log("Response data:", error.response.data);
      }
    }
  };

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

  const getCart = async (id_player) => {
    try {
      const response = await axios.get("http://localhost:5000/cart", {
        params: { id_player: id_player },
      });
      const cartWithFixedImagePaths = response.data.map((cart) => ({
        ...cart,
        Gambar: cart.gambar.replace(/\\/g, "/"),
        selected: false,
      }));
      setCart(cartWithFixedImagePaths);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const handleDelete = async () => {
    const selectedIds = cart
      .filter((item) => item.selected)
      .map((item) => item.id);
    try {
      await Promise.all(
        selectedIds.map((id) =>
          axios.delete(`http://localhost:5000/cart/${id}`)
        )
      );
      setCart(cart.filter((item) => !item.selected));
    } catch (error) {
      console.error("Error deleting selected items:", error);
    }
  };

  const handleDeleteNow = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${id}`);
      setCart(cart.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const handleQuantityChange = (id, newQuantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      });
    });
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCart(cart.map((item) => ({ ...item, selected: newSelectAll })));
  };

  const handleSelectItem = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleCheckout = () => {
    const selectedItems = cart.filter((item) => item.selected);
    navigate("/pengiriman", { state: { selectedItems } });
  };

  const sold = () => {
    alert('Maaf, tidak ada promo yang tersedia saat ini');
  }

  const totalSelectedAmount = cart
    .filter((item) => item.selected)
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  const selectedItemsCount = cart.filter((item) => item.selected).length;

  return (
    <div className="p-28 -translate-y-14">
      <h1 className="text-4xl font-semibold mb-5">Keranjang</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <div className="border-b mb-2 flex bg-white p-6 rounded-t-2xl justify-between items-center">
              <div>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="checkbox-lg mr-2"
                />
                <span>Pilih Semua ({cart.length})</span>
              </div>
              <button className="text-red-500" onClick={handleDelete}>
                Hapus
              </button>
            </div>
            {cart.length === 0 && <p>Tidak Ada Item...</p>}
            {cart.map((cartItem, index) => (
              <div
                key={cartItem.id}
                className={`bg-white p-6 mb-2 flex items-center border-b py-4${
                  index === cart.length - 1 ? "rounded-b-2xl" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={cartItem.selected}
                  onChange={() => handleSelectItem(cartItem.id)}
                  className="checkbox-lg mr-4"
                />
                <img
                  src={`http://localhost:5000/${cartItem.Gambar}`}
                  alt={cartItem.ProductName}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">
                    {cartItem.ProductName}
                  </h2>
                  <p className="text-gray-700">{formatPrice(cartItem.price)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      className="border px-2 py-1"
                      onClick={() =>
                        handleQuantityChange(cartItem.id, cartItem.quantity - 1)
                      }
                      disabled={cartItem.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-2">{cartItem.quantity}</span>
                    <button
                      className="border px-2 py-1"
                      onClick={() =>
                        handleQuantityChange(cartItem.id, cartItem.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="text-red-500 ml-4"
                  onClick={() => handleDeleteNow(cartItem.id)}
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
          <div>
            <h1 className="text-4xl font-semibold mb-10">
              Rekomendasi Untukmu
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-2">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 p-4 rounded-lg  hover:shadow-lg transition-shadow bg-white h-auto"
                >
                  {product.Gambar && (
                    <img
                      src={`http://localhost:5000/${product.Gambar}`}
                      alt={product.ProductName}
                      className="w-full h-48 object-cover mb-3 rounded"
                    />
                  )}
                  <h2 className="text-2xl font-semibold mb-1">
                    {product.ProductName}
                  </h2>
                  <p className="text-sm text-gray-400 mb-1">
                    Stok : {product.Quantity}
                  </p>
                  <p className="text-green-700 font-bold mb-5">
                    {formatPrice(product.Price)}
                  </p>
                  <button
                    className="bg-purple-950 text-white py-2 px-4 rounded-xl hover:bg-black transition-colors w-full"
                    onClick={() => addToCart(product)}
                  >
                    Tambah Ke Keranjang
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sticky top-40 max-h-[calc(100vh-20px)] overflow-y-auto">
          {selectedItemsCount > 0 && (
            <div className="p-11 border rounded-lg  bg-white">
              <h2 className="text-xl font-semibold mb-4">Ringkasan Belanja</h2>
              <div className="flex justify-between mb-4">
                <span>Total</span>
                <span className="font-bold">
                  {formatPrice(totalSelectedAmount)}
                </span>
              </div>
              <button className="w-full bg-purple-50 text-black border-purple-900 border font-medium rounded-xl mt-5 py-2 mb-4" onClick={sold}>
                Makin hemat pakai promo
              </button>
              <button
                className="w-full bg-purple-950 rounded-xl text-white py-2"
                onClick={handleCheckout}
              >
                Beli ({selectedItemsCount})
              </button>
            </div>
          )}
          {selectedItemsCount === 0 && (
            <div className="p-11 border rounded-lg  bg-white text-center">
              <h2 className="text-xl font-semibold mb-4">Ringkasan Belanja</h2>
              <span className="block text-3xl font-bold mb-4">-</span>
              <p className="text-gray-500">Tidak ada barang yang dipilih.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Keranjang;
