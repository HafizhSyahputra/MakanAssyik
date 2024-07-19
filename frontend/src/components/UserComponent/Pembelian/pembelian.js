import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Profile from "../Profile/profile.jpg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Container = styled.div`
  padding: 120px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;
`;

const Header = styled.h2`
  grid-column: span 2;
  margin-bottom: 10px;
  color: #36133b;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    transform: rotate(180deg);
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 7px;
  border: none;
  border-radius: 10px;

  &:hover {
    background-color: #bbb;
  }
`;

const FilterContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #dfdede;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.$active ? "#DDD6DE" : "#FFF")};
  border: 1px solid #dfdede;
  border-radius: 15px;
  cursor: pointer;
  color: #36133b;
  font-weight: 500;

  &:hover {
    background-color: #ddd6de;
  }
`;

const FilterWrapper = styled.div`
  position: sticky;
  top: 120px;
  background-color: white;
  z-index: 10;
  padding: 20px;
  height: 310px;
  overflow: auto;
`;

const TransaksiContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 30px;
`;

const TransaksiItem = styled.div`
  padding: 30px;
  color: #bbbbbb;
  border-radius: 10px;
  background-color: #fff;
  position: relative;
`;

const Status = styled.span`
  color: ${(props) => {
    switch (props.type.toLowerCase()) {
      case "settlement":
        return "green";
      case "pending":
        return "blue";
      case "cancel":
        return "red";
      case "expired":
        return "red";
      default:
        return "black";
    }
  }};
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #000;
  margin-top: 30px;
  margin-bottom: 70px;
  margin-left: 20px;
`;

const Item = styled.div`
  display: flex;
  gap: 20px;
`;

const ItemImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 2px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TotalContainer = styled.div`
  position: absolute;
  bottom: 30px;
  right: 20px;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TotalText = styled.p`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ItemButton1 = styled.button`
  padding: 10px;
  background-color: transparent;
  color: #36133b;
  border: none;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    color: purple;
  }
`;

const ItemButton2 = styled.button`
  padding: 5px 30px;
  background-color: #ebe8ec;
  color: black;
  font-weight: 500;
  border: 0.5px solid #6e5271;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #36133b;
    color: white;
  }
`;

const ItemButton3 = styled.button`
  padding: 5px 70px;
  background-color: #36133b;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #48396a;
  }
`;

const Header2 = styled.p`
  font-size: 32px;
  color: #36133b;
  font-weight: 500;
`;

const ProfileImage = styled.img`
  cursor: pointer;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
`;

const DropdownMenu = styled.div`
  z-index: 50;
  position: absolute;
  top: 180px;
  right: 100px;
  width: 200px;
  background-color: black;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  width: 100%;
  height: 200%;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 4%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 600px;
  max-width: 100%;
  z-index: 1001;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const InfoTitle = styled.div`
  font-weight: bold;
`;

const InfoContent = styled.div`
  color: #36133b;
  font-weight: 500;
`;

const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ItemName = styled.div`
  flex: 1;
`;

const ItemQuantity = styled.div`
  flex: 0.2;
  text-align: right;
`;

const ItemPrice = styled.div`
  flex: 0.3;
  text-align: right;
`;

const Total = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px;
  text-align: right;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #000;
  }
`;

const Modal = ({ isOpen, onClose, transaction }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalHeader>Detail Transaksi</ModalHeader>
        <InfoRow>
          <InfoTitle>Order ID:</InfoTitle>
          <InfoContent>{transaction.order_id}</InfoContent>
        </InfoRow>
        <InfoRow>
          <InfoTitle>Metode Pembayaran:</InfoTitle>
          <InfoContent>{transaction.payment_method}</InfoContent>
        </InfoRow>
        <InfoRow>
          <InfoTitle>Tanggal Pembelian:</InfoTitle>
          <InfoContent>
            {new Date(transaction.created_at).toLocaleString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </InfoContent>
        </InfoRow>
        <InfoRow>
          <InfoTitle>Status:</InfoTitle>
          <InfoContent>{transaction.payment_status}</InfoContent>
        </InfoRow>
        <ItemList>
          {transaction.transaction_items.map((item) => (
            <Item key={item.transaction_item_id}>
              <ItemName>{item.product_name}</ItemName>
              <ItemQuantity>{item.quantity} x</ItemQuantity>
              <ItemPrice>Rp{item.price.toLocaleString("id-ID")}</ItemPrice>
            </Item>
          ))}
        </ItemList>
        <Total>
          Total: Rp
          {transaction.transaction_items
            .reduce((total, item) => total + item.quantity * item.price, 0)
            .toLocaleString("id-ID")}
        </Total>
      </ModalContainer>
    </>
  );
};

const Pembelian = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState(" ");
  const [playerID, setID] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [profilePic, setProfilePic] = useState(Profile);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    refreshToken();
  }, []);

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setID(decoded.playerID);
      setExpire(decoded.exp);
      setName(decoded.name);
      setEmail(decoded.email);
      fetchProfilePic(decoded.playerID);
    } catch (error) {
      if (error.response) navigate("/");
    }
  };

  useEffect(() => {
    if (token) {
      fetchTransactions();
    }
  }, [token]);

  const handleProfileClick = () => {
    if (dropdownOpen) {
      setDropdownOpen(false);
    } else {
      setDropdownOpen(true);
    }
  };

  const handleLogoutClick = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You will be logged out of the admin dashboard.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        Logout();
      }
    });
  };

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfilePic = async (playerID) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/players/${playerID}`
      );
      if (response.data.profile) {
        const fixedImagePath = response.data.profile.replace(/\\/g, "/");
        setProfilePic(`http://localhost:5000/${fixedImagePath}`);
      } else {
        setProfilePic(Profile);
      }
    } catch (error) {
      console.error("Error fetching player:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching transaction data:", error.message);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const filterTransactions = (status) => {
    setActiveFilter(status);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter =
      activeFilter === "all" ||
      transaction.payment_status.toLowerCase() === activeFilter;

    const matchesSearch =
      transaction.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.transaction_items.some((item) =>
        item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesFilter && matchesSearch;
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching transaction data: {error}</p>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };


  return (
    <Container className="-translate-y-20">
      <Header>
        <HeaderContent onClick={handleBackClick}>
          <svg
            width="22"
            height="22"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.707 11.293l-6-6a1 1 0 0 0-1.414 1.414L17.586 11H4a1 1 0 1 0 0 2h13.586l-4.293 4.293a1 1 0 0 0 1.414 1.414l6-6a1 1 0 0 0 0-1.414z" />
          </svg>
        </HeaderContent>
        <ProfileImage
          src={profilePic}
          alt="user photo"
          onClick={handleProfileClick}
        />
      </Header>
      <div
        className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
        ref={dropdownRef}
      >
        {dropdownOpen && (
          <DropdownMenu>
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {name}
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                {email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  to="/pembelian"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Pembelian
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to={`/profile/${playerID}`}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}
                >
                  Pengaturan
                </Link>
              </li>
              <li>
                <Link
                  onClick={handleLogoutClick}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Keluar
                </Link>
              </li>
            </ul>
          </DropdownMenu>
        )}
      </div>
      <FilterWrapper>
        <FilterContainer>
          <SearchInput
            type="text"
            placeholder="Cari Data"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FilterButtons>
            <FilterButton
              $active={activeFilter === "all"}
              onClick={() => filterTransactions("all")}
            >
              Semua
            </FilterButton>
            <FilterButton
              $active={activeFilter === "settlement"}
              onClick={() => filterTransactions("settlement")}
            >
              Settlement
            </FilterButton>
            <FilterButton
              $active={activeFilter === "cancel"}
              onClick={() => filterTransactions("cancel")}
            >
              Cancel
            </FilterButton>
            <FilterButton
              $active={activeFilter === "pending"}
              onClick={() => filterTransactions("pending")}
            >
              Pending
            </FilterButton>
            <FilterButton
              $active={activeFilter === "expired"}
              onClick={() => filterTransactions("expired")}
            >
              Expired
            </FilterButton>
          </FilterButtons>
        </FilterContainer>
      </FilterWrapper>
      <TransaksiContainer>
        <Header2>Transaksi</Header2>
        {filteredTransactions.length === 0 ? (
          <p>Tidak ada daftar transaksi dengan status "{activeFilter}".</p>
        ) : (
          filteredTransactions.map((transaction) => (
            <TransaksiItem key={transaction.transaction_id}>
              <div>
                <p className="text-md">
                  {transaction.order_id} -{" "}
                  <Status type={transaction.payment_status.toLowerCase()}>
                    {transaction.payment_status.toUpperCase()}
                  </Status>{" "}
                  -{" "}
                  {new Date(transaction.created_at).toLocaleString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <ItemDetails>
                  {transaction.transaction_items
                    .filter((item) => item.product_id !== 0)
                    .map((item) => (
                      <Item key={item.transaction_item_id}>
                        <ItemImage
                          src={item.product_image}
                          alt={item.product_name}
                        />
                        <ItemInfo>
                          <p className="text-2xl font-semibold">
                            {item.product_name}
                          </p>
                          <p className="text-slate-600 text-md">
                            {item.quantity} Barang x Rp
                            {item.price.toLocaleString("id-ID")}
                          </p>
                        </ItemInfo>
                      </Item>
                    ))}
                </ItemDetails>
              </div>
              <TotalContainer>
                <TotalText>
                  <span className="text-gray-500 text-lg">Total Belanja</span>
                  <br />
                  <span className="text-black font-bold text-xl">
                    {" "}
                    Rp
                    {transaction.transaction_items
                      .reduce(
                        (total, item) => total + item.quantity * item.price,
                        0
                      )
                      .toLocaleString("id-ID")}
                  </span>
                </TotalText>
                <ButtonContainer>
                  <ItemButton1 onClick={() => handleViewDetails(transaction)}>
                    Lihat detail transaksi
                  </ItemButton1>
                  <ItemButton2>Ulas</ItemButton2>
                  {transaction.payment_status.toLowerCase() === "pending" ? (
                    <ItemButton3
                      onClick={() => {
                        /* Logic untuk bayar */
                      }}
                    >
                      Bayar
                    </ItemButton3>
                  ) : (
                    <ItemButton3>Beli Lagi</ItemButton3>
                  )}
                </ButtonContainer>
              </TotalContainer>
            </TransaksiItem>
          ))
        )}
      </TransaksiContainer>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={selectedTransaction}
      />
    </Container>
  );
};

export default Pembelian;
