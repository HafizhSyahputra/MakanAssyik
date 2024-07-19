import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import logoP from "./profile.jpg";

const MainContentContainer = styled.div`
  border-radius: 10px;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
`;

const ProfileImageContainer = styled.div`
  text-align: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  max-width: 300px;
  height: 450px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 60%;
  object-fit: cover;
`;

const Deec = styled.p`
  font-size: 12px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 20px;
  padding: 20px;
  width: 600px;
`;

const InfoTitle = styled.h2`
  font-size: 24px;
  color: #36133b;
  font-weight: 600;
  margin-bottom: 40px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  width: 150px;
  font-size: 16px;
  color: #666;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f7f7f7;
  color: #333;

  &:focus {
    border-color: #6200ea;
    background-color: #fff;
  }
`;

const Select = styled.select`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f7f7f7;
  color: #333;
`;

const Option = styled.option`
  padding: 10px;
`;

const UpdateButton = styled.button`
  background-color: #36133b;
  color: #fff;
  margin-top: 5px;
  border: none;
  padding: 7px 258px;
  font-size: 14px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: black;
  }
`;

const UploadButton = styled.label`
  margin-top:20px;
  margin-bottom:8px;
  display: inline-block;
  background-color: transparent;
  color: #000;
  padding: 8px 95px;
  font-size: 16px;
  border: 1px solid #AFAFAF;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #36133b;
    color:white;
  }

  input[type="file"] {
    display: none;
  }
`;

const Uploud = styled.button`
  font-size:10px;
  color:#36133b;
  border:1px solid grey;
  border-radius:5px;
  padding:7px 98px;
  font-weight:600;
  margin-bottom:7px;
`;

const Content = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(logoP);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();
  const { id_player } = useParams();

  useEffect(() => {
    getPlayerById();
  }, []);

  const getPlayerById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/players/${id_player}`
      );
      setName(response.data.name);
      setEmail(response.data.email);
      setBirth(response.data.birth);
      setGender(response.data.gender);
      setPhone(response.data.phone);
      setAddress(response.data.address);
      if (response.data.profile) {
        const fixedImagePath = response.data.profile.replace(/\\/g, "/");
        setProfileImage(fixedImagePath);
        setPreviewImage(`http://localhost:5000/${fixedImagePath}`);
      } else {
        setPreviewImage(logoP);
      }
    } catch (error) {
      console.error("Error fetching player:", error);
      alert("Failed to fetch player data!");
    }
  };

  const updatePlayer = async (e) => {
    e.preventDefault();
    const confirmed = await confirmUpdate();
    if (confirmed) {
      try {
        await axios.patch(`http://localhost:5000/players/${id_player}`, {
          name,
          email,
          birth,
          gender,
          phone,
          address,
        });
        navigate(`/profile/${id_player}`);
        alert("Berhasil melakukan perubahan");
      } catch (error) {
        console.log(error);
        alert("Failed to update player!");
      }
    }
  };

  const handleInputChange = (e) => {
    setIsDirty(true);
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "birth":
        setBirth(e.target.value);
        break;
      case "gender":
        setGender(e.target.value);
        break;
      case "phone":
        setPhone(e.target.value);
        break;
      case "address":
        setAddress(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsImageSelected(true);

    }
  };

  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append("profileImage", profileImage);

    try {
      const response = await axios.post(
        `http://localhost:5000/players/${id_player}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfileImage(response.data.path);
      setPreviewImage(`http://localhost:5000/${response.data.path}`);
      alert(response.data.msg);
    } catch (error) {
      console.error("Error uploading profile image:", error);
      alert("Failed to upload profile image!");
    }
  };

  const confirmUpdate = async () => {
    const result = await Swal.fire({
      title: "Konfirmasi",
      text: "Anda yakin ingin menyimpan perubahan?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, simpan perubahan!",
      cancelButtonText: "Batal",
    });
    return result.isConfirmed;
  };

  return (
    <MainContentContainer>
      <ProfileImageContainer>
        <ProfileImage src={previewImage} alt="Profile" />
        <UploadButton>
          Pilih Foto
          <input type="file" onChange={handleFileChange} />
        </UploadButton>
        {isImageSelected && (
          <>
            <Uploud onClick={uploadProfileImage}>Unggah Foto</Uploud>
          </>
        )}
        <Deec>
          Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi file
          yang diperbolehkan: .JPG .JPEG .PNG
        </Deec>
      </ProfileImageContainer>
      <InfoContainer>
        <InfoTitle>Ubah Biodata Diri</InfoTitle>
        <form onSubmit={updatePlayer}>
          <InputGroup>
            <Label>Nama</Label>
            <Input
              type="text"
              name="name"
              placeholder="Nama"
              value={name}
              onChange={handleInputChange}
            />
          </InputGroup>
          <InputGroup>
            <Label>Tanggal Lahir</Label>
            <Input
              type="date"
              name="birth"
              placeholder="Tanggal Lahir"
              value={birth}
              onChange={handleInputChange}
            />
          </InputGroup>
          <InputGroup>
            <Label>Jenis Kelamin</Label>
            <Select name="gender" value={gender} onChange={handleInputChange}>
              <Option value="Laki-laki">Laki-laki</Option>
              <Option value="Perempuan">Perempuan</Option>
            </Select>
          </InputGroup>
          <InfoTitle className="mt-10">Ubah Informasi Kontak</InfoTitle>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
            />
          </InputGroup>
          <InputGroup>
            <Label>Nomor HP</Label>
            <Input
              type="tel"
              name="phone"
              placeholder="Nomor HP"
              value={phone}
              onChange={handleInputChange}
            />
          </InputGroup>
          <InputGroup>
            <Label>Alamat</Label>
            <Input
              type="text"
              name="address"
              placeholder="Masukan alamat lengkap"
              value={address}
              onChange={handleInputChange}
            />
          </InputGroup>
          {isDirty && <UpdateButton type="submit">Update</UpdateButton>}
        </form>
      </InfoContainer>
    </MainContentContainer>
  );
};

export default Content;
