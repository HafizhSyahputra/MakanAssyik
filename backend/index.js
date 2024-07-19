import express from "express";
import dotenv from "dotenv";
import ProductRoute from "./routes/ProductRoute.js";
import PlayerRoute from "./routes/PlayerRoute.js";
import CartRoute from "./routes/CartRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import MidtransRoute from "./routes/MidtransRoute.js";
import TransactionRoute from "./routes/TransactionRoute.js";
import Pusher from "pusher";

dotenv.config();
const app = express();

const pusher = new Pusher({
    appId: "1835149",
    key: "f36a4f52d1b6ee242c96",
    secret: "db2d8edb1f57a88d8a3f",
    cluster: "ap1",
    useTLS: true
  });
  
  pusher.trigger("transaction-channel", "transaction-event", {
    message: "ada data transaksi baru"
});
  

// // // Make Table With Schema
// try {
//     await db.authenticate();
//     console.log('Database Connect...')
//     await Profile.sync();
// } catch (error) {
//     console.error(error);
// }


app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000', 'https://app.sandbox.midtrans.com'],
  credentials: true
}));

app.use(express.json());
app.use(CartRoute);
app.use(PlayerRoute);
app.use(ProductRoute);
app.use('/uploads', express.static('uploads'));
app.use('/profile-img', express.static('profile-img'));
app.use('/api', MidtransRoute);
app.use(MidtransRoute);
app.use('/api', TransactionRoute);

app.listen(5000, () => console.log('Server up and running at Port 5000'));
