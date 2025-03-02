import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Dzongkhag from "./routes/dzongkhagRoute.js"
import ProductRoute from "./routes/productRoute.js"
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/product', Dzongkhag)
app.use('/product', ProductRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
