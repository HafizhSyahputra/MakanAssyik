import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/auth/login.js";
import Register from "../components/auth/register.js";
import UserDashboard from "./UserDashboard.js";
import Menu from "../components/UserComponent/menu/Menu.js";
import Keranjang from "../components/UserComponent/keranjang/Keranjang.js";
import Navbar from "../components/UserComponent/Navbar.js";
import Profile from "../components/UserComponent/Profile/Profile.js";
import Pembelian from "../components/UserComponent/Pembelian/pembelian.js";
import Pengiriman from "../components/UserComponent/pengiriman/Pengiriman.js";
import AddAddressForm from "../components/UserComponent/pengiriman/alamat.js";
import Error from "./Error.js";
import "../index.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/eror" element={<Error />} />
        <Route path="/pembelian" element={<Pembelian />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/alamat/:id_player" element={<AddAddressForm />} />
        <Route path="/pengiriman" element={<><Navbar/><Pengiriman /></>} />
        <Route path="/menu" element={<><Navbar /><Menu /></>} />
        <Route path="/keranjang" element={<><Navbar /><Keranjang /></>} />
        <Route path="/register" element={<Register />} />
        <Route path="/User" element={<><Navbar /><UserDashboard /></>} />
        <Route path="/profile/:id_player" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
