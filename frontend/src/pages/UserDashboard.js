import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'; 
import { FaClock, FaFastForward, FaLeaf, FaStar } from "react-icons/fa";
import MainLogo from "./img/MainPage.png";
import ProductImage from "./img/MainPage.png";
import SignaturePastaImage from "./img/pasta.png";  

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 7fr 1fr;
  align-items: center;
  transform: translateY(-130px);
  padding: 130px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const TextSection = styled.div`
  text-align: left;
  max-width: 700px;
  transform: translateY(-34px);
`;

const ProductButton = styled.button`
  background-color: #36133B;
  color: white;
  padding: 10px 80px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;

  &:hover {
    background-color: #19376D;
  }
`;

const MainImage = styled.img`
  width: 620px;
  height: auto;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  margin-right: 40px;
  align-items: center;
  transform: translateY(-20px);
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeatureCircle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #36133B;
  color: white;
  padding: 20px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  justify-content: center;
`;

const FeatureIcon = styled.div`
  font-size: 24px;
`;

const FeatureText = styled.div`
  margin-top: 10px; 
  font-size: 18px; 
  font-weight: bold;
  text-align: left; 
  color: #36133B;
`;

const Tagline = styled.h1`
  font-size: 38px; 
  font-weight: bold;
  color: #36133B;
  margin-bottom: 25px; 
`;

const WelcomeText = styled.p`
  font-size: 13px; 
  font-weight: 600;
  color: #808080;
  margin-bottom: 30px; 
`;

const TopSellingSection = styled.div`
  text-align: left;
  transform: translateY(-150px);
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  margin-left:130px;
  font-weight: 600;
  color: #36133B;
  margin-bottom: 50px;
`;

const ProductsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 80px;
`;

const ProductCard = styled.div`
  background-color: #4A2B4D;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  text-align: left;
  width: 370px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const ProductImageWrapper = styled.div`
  flex: 1;
`;

const ProductDetails = styled.div`
  flex: 2;
`;

const ProductName = styled.div`
  font-weight: 500;
  color:#FFFFFF;
  margin-bottom: 10px;
`;

const ProductRating = styled.div`
  color: #FFCB45;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
`;

const ProductPrice = styled.div`
  font-weight: 500;
  color:#FFC94D;
  font-size:14px;
  margin-left: 17px;
`;

const AddToCartButton = styled.button`
  background-color: #FFC94D;
  color: #36133B;
  border: none;
  padding: 5px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 10px;
  font-weight:500;

  &:hover {
    background-color: #FFC700;
  }
`;

const NewReleaseSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
  background-color: #FDFAF4;
  padding: 10px;
  border-radius: 20px;
`;

const NewReleaseTextSection = styled.div`
  max-width: 500px;
  margin-left: 50px;
`;

const NewReleaseTitle = styled.h3`
  font-size: 52px;
  font-weight:bold;
  color: #36133B;
  margin-bottom: 10px;
`;

const NewReleaseDescription = styled.p`
  font-size: 17px;
  color: #707070;
  line-height: 1.5;
  margin-bottom:30px;
`;

const ViewMenuButton = styled.button`
  background-color: #36133B;
  color: white;
  padding: 10px 80px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;

  &:hover {
    background-color: #19376D;
  }
`;

const UserDashboard = () => {
  const navigate = useNavigate(); 

  const handleViewProducts = () => {
    navigate('/menu'); 
  };

  const handleViewMenu = () => {
    navigate('/menu'); 
  };

  return (
    <>
      <DashboardContainer>
        <TextSection>
          <Tagline>Frozen Food. Gizi Segar dalam Genggaman Anda!</Tagline>
          <WelcomeText>
            Selamat datang di Makan Asyik! Nikmati makanan beku berkualitas tinggi
            yang praktis, lezat, dan bergizi. Setiap produk kami dibuat dari bahan
            segar untuk rasa maksimal. Praktis dan lezat setiap hari!
          </WelcomeText>
          <ProductButton onClick={handleViewProducts}>Lihat Produk</ProductButton>
        </TextSection>
        <MainImage src={MainLogo} alt="Main Logo" />
        <Features>
          <FeatureItem>
            <FeatureCircle>
              <FeatureIcon>
                <FaClock />
              </FeatureIcon>
            </FeatureCircle>
            <FeatureText>Mudah</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureCircle>
              <FeatureIcon>
                <FaFastForward />
              </FeatureIcon>
            </FeatureCircle>
            <FeatureText>Cepat</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureCircle>
              <FeatureIcon>
                <FaLeaf />
              </FeatureIcon>
            </FeatureCircle>
            <FeatureText>Nikmat</FeatureText>
          </FeatureItem>
        </Features>
      </DashboardContainer>

      <TopSellingSection>
        <SectionTitle>Penjualan Terbanyak</SectionTitle>
        <ProductsContainer>
          <ProductCard>
            <ProductImageWrapper>
              <img src={ProductImage} alt="Bakso Kanzler" />
            </ProductImageWrapper>
            <ProductDetails>
              <ProductName>BAKSO KANZLER</ProductName>
              <ProductRating>
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
              </ProductRating>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AddToCartButton>ADD TO CART</AddToCartButton>
                <ProductPrice>Rp 20.000</ProductPrice>
              </div>
            </ProductDetails>
          </ProductCard>

          <ProductCard>
            <ProductImageWrapper>
              <img src={ProductImage} alt="Bakso Kanzler" />
            </ProductImageWrapper>
            <ProductDetails>
              <ProductName>BAKSO KANZLER</ProductName>
              <ProductRating>
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
              </ProductRating>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AddToCartButton>ADD TO CART</AddToCartButton>
                <ProductPrice>Rp 20.000</ProductPrice>
              </div>
            </ProductDetails>
          </ProductCard>

          <ProductCard>
            <ProductImageWrapper>
              <img src={ProductImage} alt="Bakso Kanzler" />
            </ProductImageWrapper>
            <ProductDetails>
              <ProductName>BAKSO KANZLER</ProductName>
              <ProductRating>
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
              </ProductRating>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AddToCartButton>ADD TO CART</AddToCartButton>
                <ProductPrice>Rp 20.000</ProductPrice>
              </div>
            </ProductDetails>
          </ProductCard>
        </ProductsContainer>
      </TopSellingSection>

      <NewReleaseSection>
        <img src={SignaturePastaImage} alt="Signature Taste Pasta" style={{ width: '400px', height: 'auto' }} />
        <NewReleaseTextSection>
          <NewReleaseTitle>Signature Taste Pasta</NewReleaseTitle>
          <NewReleaseDescription>
            Dibuat dari bahan-bahan berkualitas tinggi dan segar, pasta beku kami menawarkan tekstur sempurna dan rasa yang kaya. Dengan berbagai pilihan saus lezat, Anda bisa menikmati hidangan restoran di rumah Anda sendiri.
          </NewReleaseDescription>
          <ViewMenuButton onClick={handleViewMenu}>Lihat Menu</ViewMenuButton>
        </NewReleaseTextSection>
      </NewReleaseSection>
      
    </>
  );
};

export default UserDashboard;
