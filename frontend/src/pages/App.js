import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "../components/AdminComponent/users/PlayerList.js";
import AdminDashboard from "./AdminDashboard.js";
import ProductList from "../components/AdminComponent/products/ProductList.js";
import AddProduct from "../components/AdminComponent/products/AddProduct.js";
import EditProduct from "../components/AdminComponent/products/EditProduct.js";
import Login from "../components/auth/login.js";
import Register from "../components/auth/register.js";
import UserDashboard from "./UserDashboard.js";
import AddPlayer from "../components/AdminComponent/users/AddPlayer.js";
import EditPlayer from "../components/AdminComponent/users/EditPlayer.js";
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
        <Route path="/Admin" element={<AdminDashboard />} />
        <Route path="/User" element={<><Navbar /><UserDashboard /></>} />
        <Route path="/profile/:id_player" element={<Profile />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/addPlayer" element={<AddPlayer />} />
        <Route path="/editPlayer/:id_player" element={<EditPlayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
