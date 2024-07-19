import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AddAddressForm = ({ onClose, onSuccess }) => {
  const [address, setAddress] = useState("");
  const [playerID, setPlayerID] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setPlayerID(decoded.playerID);
      setExpire(decoded.exp);
    } catch (error) {
    }
  };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.patch(`http://localhost:5000/players/${playerID}`, {
          address: address,
        });
        onClose(); // Menutup popup
        onSuccess(); // Memanggil fungsi onSuccess untuk memperbarui data tanpa refresh
      } catch (error) {
        console.error("Error adding address:", error);
      }
    };
  
    const handleChange = (e) => {
      setAddress(e.target.value);
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Tambah Alamat Pengiriman</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Alamat:</label>
          <textarea
            className="block w-full h-24 resize-none border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-800"
          >
            Simpan
          </button>
        </div>
      </form>
    );
  };
  
  export default AddAddressForm;
  