import express from "express";
import {getPlayers, Register, Login, Logout, deletePlayer, editPlayer, getPlayerById, uploadProfileImage, updatePlayerAddress} from "../controller/PlayerController.js"
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();

router.get('/players', verifyToken, getPlayers);
router.get('/players/:id', getPlayerById);
router.post('/players', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.patch('/players/:id', editPlayer);
router.delete('/players/:id', deletePlayer);
router.post('/players/:id/upload', uploadProfileImage);
router.put('/players/:id', updatePlayerAddress);



export default router;