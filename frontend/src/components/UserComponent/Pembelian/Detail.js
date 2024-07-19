import React from "react";

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 600px;
  max-width: 100%;
  z-index: 1001;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
  color:#36133b;
  font-weight:500;

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

const Detail = () => {

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
          <InfoContent>{new Date(transaction.created_at).toLocaleString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}</InfoContent>
        </InfoRow>
        <InfoRow>
          <InfoTitle>Status:</InfoTitle>
          <InfoContent>{transaction.payment_status}</InfoContent>
        </InfoRow>
        <ItemList>
          {transaction.transaction_items.map(item => (
            <Item key={item.transaction_item_id}>
              <ItemName>{item.product_name}</ItemName>
              <ItemQuantity>{item.quantity} x</ItemQuantity>
              <ItemPrice>Rp{item.price.toLocaleString('id-ID')}</ItemPrice>
            </Item>
          ))}
        </ItemList>
        <Total>
          Total: Rp{transaction.transaction_items.reduce((total, item) => total + item.quantity * item.price, 0).toLocaleString('id-ID')}
        </Total>
      </ModalContainer>
    </>
  );
};

export default Modal;