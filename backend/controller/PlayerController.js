import Player from "../models/PlayerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'profile-img/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, 
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('profileImage');

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

export const updatePlayerAddress = async (req, res) => {
  const { address } = req.body;
  const { id } = req.params;

  try {
    await Player.update({ address: address }, {
      where: {
        id_player: id
      }
    });
    res.status(200).json({ msg: 'Address updated successfully' });
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ msg: 'Error updating address' });
  }
};


export const uploadProfileImage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).json({ msg: err });
    } else {
      if (req.file == undefined) {
        res.status(400).json({ msg: 'No file selected!' });
      } else {
        try {
          await Player.update({ profile: req.file.path }, {
            where: {
              id_player: req.params.id
            }
          });
          res.status(200).json({ msg: 'Berhasil menambah foto profil', path: req.file.path });
        } catch (error) {
          console.log(error);
          res.status(500).json({ msg: 'Error uploading profile image!' });
        }
      }
    }
  });
};
export const getPlayers = async (req, res) => {
    try {
        const response = await Player.findAll({
            attributes: ['id_player', 'name', 'email', 'password', 'role']
        });
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

export const getPlayerById = async (req, res) => {
    try {
      const response = await Player.findOne({
        where: {
          id_player: req.params.id,
        },
      });
      if (response && response.profile) {
        response.profile = response.profile.replace(/\\/g, '/');
      }
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  

export const Register = async (req, res) => {
    const { name, email, password, confirmPassword, birth, gender, phone, role } = req.body;
    if (password !== confirmPassword) return res.status(400).json({ msg: "Password tidak cocok" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Player.create({
            name: name,
            email: email,
            password: hashPassword,
            birth: birth,
            gender: gender,
            phone: phone,
            role: role || 'user'  
        });
        res.json({ msg: "Berhasil Registrasi" });
    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req, res) => {
    try {
        const player = await Player.findAll({
            where: {
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, player[0].password);
        if (!match) return res.status(404).json({ msg: "Wrong Password" });
        const playerID = player[0].id_player;
        const name = player[0].name;
        const email = player[0].email;
        const address = player[0].address;
        const role = player[0].role;
        const accessToken = jwt.sign({ playerID, name, email, role, address }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({ playerID, name, email, role,address }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        });
        await Player.update({ refresh_token: refreshToken }, {
            where: {
                id_player: playerID
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production'
        });
        res.json({ accessToken, role });
    } catch (error) {
        res.status(404).json({ msg: "Email not found" });
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    
    const player = await Player.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    
    if (!player[0]) return res.sendStatus(204);
    const playerID = player[0].id_player;
    await Player.update({ refresh_token: null }, {
        where: {
            id_player: playerID
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

export const deletePlayer = async (req, res) => {
    try {
        await Player.destroy({
            where: {
                id_player: req.params.id,
            },
        });
        res.status(200).json({ msg: 'Player Deleted' });
    } catch (error) {
        console.log(error.message);
    }
};

export const editPlayer = async (req, res) => {
    try {
        await Player.update(req.body, {
            where: {
                id_player: req.params.id
            }
        });
        res.status(200).json({ msg: "Player Updated" });
    } catch (error) {
        console.log(error.message);
    }
}
