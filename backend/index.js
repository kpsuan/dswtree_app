import express from 'express';
import cors from 'cors';
import "dotenv/config";

import authRoutes from "./src/routes/authRoutes.js";
import treesRoutes from "./src/routes/treesRoutes.js";

import { connectDB } from './src/lib/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


app.use("api/auth", authRoutes)
app.use("api/trees", treesRoutes)


app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
    connectDB();
    }
);