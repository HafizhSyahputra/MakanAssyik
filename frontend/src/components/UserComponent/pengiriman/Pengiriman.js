import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoMaps from "./logo.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AddAddressForm from "./alamat";
import Pusher from 'pusher-js';


const Pengiriman = () => {
  const location = useLocation();
  const { selectedItems } = location.state || {};
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [playerID, setID] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate();

  
  useEffect(() => {
    refreshToken();
  }, []);

  useEffect(() => {
    if (showNotification) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showNotification]);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setID(decoded.playerID);
      setName(decoded.name);
      setEmail(decoded.email);
      setAddress(decoded.address);
      setPhone(decoded.phone);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) navigate("/");
    }
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSelectShipping = (option) => {
    setSelectedShipping(option);
  };


  const handleCheckout = async () => {
    if (!address || !selectedShipping) {
      setShowNotification(true);
      return;
    }
  
    const order_id = `ORDER-${new Date().getTime()}`;
    const gross_amount = selectedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      selectedShipping.price
    );
  
    const item_details = selectedItems.map((item) => ({
      id: item.id,
      price: parseInt(item.price, 10), 
      quantity: item.quantity,
      name: (item.ProductName && item.ProductName.trim()) || "Unnamed Item",
      Gambar: item.Gambar,
    }));

    
    item_details.push({
      id: "shipping",
      price: parseInt(selectedShipping.price, 10),
      quantity: 1,
      name: (selectedShipping.ProductName && selectedShipping.ProductName.trim()) || "Ongkir", 
    });
    
    console.log("Selected Items:", selectedItems);
    console.log("Item Details:", item_details);
  
    try {
      const response = await axios.post("http://localhost:5000/api/create-transaction", {
        order_id,
        gross_amount,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        customer_address: address,
        item_details, 
        payment_type: "gopay"  
      });
  
      const { token } = response.data;
  
      window.snap.pay(token, {
        onSuccess: function(result) {
          alert("Pembayaran berhasil!");
          console.log(result);
          navigate('/pembelian', { state: { order_id: order_id } });  
        },
        onPending: function(result) {
          alert("Menunggu pembayaran!");
          console.log(result);
          navigate('/pembelian', { state: { order_id: order_id } }); 
        },
        onError: function(result) {
          alert("Pembayaran gagal!");
          console.log(result);
          navigate('/pengiriman', { state: { order_id: order_id } });  
        },
        onClose: function() {
          axios.post('http://localhost:5000/api/cancel-transaction', { order_id })
            .then(response => {
              alert('Pembayaran dibatalkan...');
            })
            .catch(error => {
              console.error('Error cancelling transaction:', error);
              alert('Error cancelling transaction.');
            });
        }
      });
      
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };
  
  
  
  const handleCancel = () => {
    setShowNotification(false);
  };

  const updateAddress = () => {
    refreshToken();
  };

  if (!selectedItems || selectedItems.length === 0) {
    return <div className="p-24">No items to purchase.</div>;
  }

  const totalItemAmount = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingOptions = [
    {
      id: 1,
      name: "Instant 3 Jam",
      estimate: "Estimasi tiba hari ini - besok, maks. 14:00 WIB",
      price: 106800,
    },
    {
      id: 2,
      name: "Same Day 8 Jam",
      estimate: "Estimasi tiba hari ini - besok, maks. 19:00 WIB",
      price: 48000,
    },
    {
      id: 3,
      name: "Same Day",
      estimate: "Estimasi tiba besok, maks. 22:00 WIB",
      price: 25500,
    },
    {
      id: 4,
      name: "Next Day",
      estimate: "Estimasi tiba besok - 5 Jul",
      price: 15300,
    },
    {
      id: 5,
      name: "Reguler",
      estimate: "Estimasi tiba 5 - 8 Jul",
      price: 11500,
    },
    {
      id: 6,
      name: "Kargo",
      estimate: "Estimasi tiba 6 - 10 Jul",
      price: 17000,
    },
  ];

  const totalAmount = selectedShipping
    ? totalItemAmount + selectedShipping.price
    : "-";

  return (
    <div className="p-32 -translate-y-16">
      <h1 className="text-3xl font-semibold mb-5">Pengiriman</h1>
      {showNotification && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Perhatian:</strong>
          <span className="block sm:inline">
            {address
              ? " Harap pilih metode pengiriman terlebih dahulu."
              : " Harap tambahkan alamat terlebih dahulu."}
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <button
              onClick={handleCancel}
              className="text-red-500 hover:text-red-700"
            >
              <svg
                className="fill-current h-6 w-6"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.25 1.25 0 0 1-1.768 1.768l-2.58-2.58-2.58 2.58a1.25 1.25 0 1 1-1.768-1.768l2.58-2.58-2.58-2.58a1.25 1.25 0 1 1 1.768-1.768l2.58 2.58 2.58-2.58a1.25 1.25 0 1 1 1.768 1.768l-2.58 2.58 2.58 2.58z" />
              </svg>
            </button>
          </span>
        </div>
      )}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <AddAddressForm onClose={handleClosePopup} onSuccess={updateAddress} />
            <button
              onClick={handleClosePopup}
              className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl text-gray-400 font-semibold mb-2">
              ALAMAT PENGIRIMAN
            </h2>
            <div className="flex items-center">
              <div className="flex-grow mx-auto -translate-y-3">
                <img
                  src={logoMaps}
                  alt="Logo Maps"
                  className="w-4 h-5 translate-y-6"
                />
                {address ? (
                  <>
                    <p className="font-medium">
                      <i className="fas fa-map-marker-alt text-green-500 mr-7"></i>
                      {name && <>{name} • </>}
                      {address}
                    </p>
                  </>
                ) : (
                  <p className="font-medium">
                    <button
                      onClick={handleOpenPopup}
                      className="text-purple-900 font-medium ml-8"
                    >
                      Tambah Alamat
                    </button>
                  </p>
                )}
                <p className="text-gray-500">{address}</p>
                {address && (
                  <button
                    onClick={handleOpenPopup}
                    className="text-gray-400 w-40 h-8 font-medium border border-gray-400 text-xs rounded-lg mt-5"
                  >
                    Ganti Alamat
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Data Barang</h2>
            <div>
              {selectedItems.map((item) => (
                <div key={item.id} className="flex items-center border-b py-4">
                  <img
                    src={`http://localhost:5000/${item.Gambar}`}
                    alt={item.ProductName}
                    className="w-20 h-20 object-cover mr-4"
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold">
                      {item.ProductName}
                    </h2>
                    <p className="text-gray-700">{formatPrice(item.price)}</p>
                    <p className="text-gray-700">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-4 mt-4">
              <label className="block text-gray-700 font-bold mb-2">
                Pilih Pengiriman:
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) =>
                    handleSelectShipping(
                      shippingOptions.find(
                        (option) => option.id === parseInt(e.target.value)
                      )
                    )
                  }
                >
                  <option value="">Pilih Pengiriman</option>
                  {shippingOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name} -{" "}
                      {option.maxPrice
                        ? `Rp${option.price.toLocaleString()} - Rp${option.maxPrice.toLocaleString()}`
                        : `Rp${option.price.toLocaleString()}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {selectedShipping && (
              <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                <h3 className="font-semibold text-lg">
                  {selectedShipping.name}
                </h3>
                <p className="text-gray-700">{selectedShipping.estimate}</p>
                <p className="text-gray-700 font-semibold">
                  {selectedShipping.maxPrice
                    ? `Rp${selectedShipping.price.toLocaleString()} - Rp${selectedShipping.maxPrice.toLocaleString()}`
                    : `Rp${selectedShipping.price.toLocaleString()}`}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="sticky top-44 max-h-[calc(100vh-20px)] overflow-y-auto">
            <div className="p-6 bg-white rounded-xl mb-4">
              <h2 className="text-xl font-semibold mb-4">Ringkasan Belanja</h2>
              <div className="space-y-4">
                {selectedItems.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="flex-grow">
                      <p className="text-gray-700">{item.ProductName}</p>
                      <p className="text-gray-700">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-gray-700">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Ringkasan Biaya</h2>
              <div className="flex justify-between mb-4">
                <p className="text-gray-700">Total Belanja:</p>
                <p className="font-semibold">{formatPrice(totalItemAmount)}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-gray-700">Ongkos Kirim:</p>
                <p className="font-semibold">
                  {selectedShipping ? formatPrice(selectedShipping.price) : "-"}
                </p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between">
                <p className="text-gray-700 font-bold">Total Pembayaran:</p>
                <p className="font-semibold"> {formatPrice(totalAmount)}</p>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-purple-950 hover:bg-purple-900 text-white font-bold py-3 rounded-lg"
              >
                Lanjutkan ke Pembayaran
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatPrice = (price) => {
  return `Rp${price.toLocaleString()}`;
};

export default Pengiriman;
