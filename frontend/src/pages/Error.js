import React from 'react';
import styled from 'styled-components';

const MaintenanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const MaintenanceMessage = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: #36133B;
  margin-bottom: 20px;
`;

const MaintenanceDescription = styled.p`
  font-size: 20px;
  color: #808080;
  text-align: center;
  max-width: 600px;
`;

const Error = () => {
  return (
    <MaintenanceContainer>
      <MaintenanceMessage>Under Maintenance</MaintenanceMessage>
      <MaintenanceDescription>
        Fitur ini akan Segera Hadir!!!
      </MaintenanceDescription>
    </MaintenanceContainer>
  );
}

export default Error;
