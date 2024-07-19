import React from 'react';
import styled from 'styled-components';
import Content from './Content';
import Sidebar from './SideBar';

const Container = styled.div`
  display: flex;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
`;

const Profile = () => {
  return (
    <Container>
      <Sidebar />
    </Container>
  );
};

export default Profile;
