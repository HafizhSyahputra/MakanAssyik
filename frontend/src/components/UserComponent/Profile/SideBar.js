import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Content from './Content';
const MySwal = withReactContent(Swal);

const SidebarContainer = styled.div`
  width: 250px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: fixed;
  top: 20px;
  left: 20px;
  height: calc(100% - 40px);
`;

const SidebarItem = styled.div`
  margin: 20px 0;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: ${props => (props.$isActive ? '#36133B' : '#787578')};
  cursor: pointer;

  &:hover {
    color: #36133B;
  }

  svg {
    margin-right: 10px;
  }
`;

const LogoutButton = styled.button`
  background-color: #f44336;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);

  &:hover {
    background-color: #d32f2f;
  }
`;

const BackButton = styled.button`
  color: #36133B;
  padding: 7px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #bbb;
  }

  svg {
    transform: rotate(180deg);
    margin-right: 5px;
  }
`;

const ContentContainer = styled.div`
  margin-left: 130px;
  padding: 20px;
`;

const Notifikasi = () => <div>Segera Hadir</div>;
const Favorit = () => <div>Segera Hadir</div>;

const Sidebar = () => {
    const navigate = useNavigate();
    const [activeComponent, setActiveComponent] = useState('profile');

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

    const handleBackClick = () => {
      navigate(-1); 
    };

    const renderContent = () => {
      switch (activeComponent) {
        case 'profile':
          return <Content />;
        case 'Notifikasi':
          return <Notifikasi />;
        case 'Favorit':
          return <Favorit />;
        default:
          return <Content />;
      }
    };

    return (
      <div>
        <SidebarContainer>
          <BackButton onClick={handleBackClick}>
            <svg width="22" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.707 11.293l-6-6a1 1 0 0 0-1.414 1.414L17.586 11H4a1 1 0 1 0 0 2h13.586l-4.293 4.293a1 1 0 0 0 1.414 1.414l6-6a1 1 0 0 0 0-1.414z"/>
            </svg>
          </BackButton>
          <SidebarItem $isActive={activeComponent === 'profile'} onClick={() => setActiveComponent('profile')}>
            <svg width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Data Akun
          </SidebarItem>
          <SidebarItem $isActive={activeComponent === 'Notifikasi'} onClick={() => setActiveComponent('Notifikasi')}>
            <svg width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm-1 13h2v-2h-2v2zm0-4h2V7h-2v6z"/>
            </svg>
            Notifikasi
          </SidebarItem>
          <SidebarItem $isActive={activeComponent === 'Favorit'} onClick={() => setActiveComponent('Favorit')}>
            <svg width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4.5l6 4.5h-3v5.25L18 18v1.5h-1.5v-1.5h-9v1.5H6V18l3-3.75V9H6l6-4.5zm0-2.25L3.75 8.25H6V15.75l-3 3.75H6v1.5h12v-1.5h3l-3-3.75V8.25h2.25L12 2.25z"/>
            </svg>
            Favorit
          </SidebarItem>
          <LogoutButton onClick={handleLogoutClick}>Keluar</LogoutButton>
        </SidebarContainer>
        <ContentContainer>
          {renderContent()}
        </ContentContainer>
      </div>
    );
};

export default Sidebar;
