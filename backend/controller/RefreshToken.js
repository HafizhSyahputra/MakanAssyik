import Player from "../models/PlayerModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        
        const player = await Player.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        
        if (!player[0]) return res.sendStatus(403);
        
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            
            const playerID = player[0].id_player;
            const name = player[0].name;
            const email = player[0].email;
            const address = player[0].address;
            const phone = player[0].phone;
            
            const accessToken = jwt.sign({ playerID, name, email, address, phone }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500); 
    }
}
