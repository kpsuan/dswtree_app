import express from 'express';
import "dotenv/config";
import authRoutes from "./src/routes/authRoutes.js";
import treesRoutes from "./src/routes/treesRoutes.js";
import { connectDB } from './src/lib/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("api/auth", authRoutes)
app.use("api/trees", treesRoutes)


app.listen(3000, () => {    
    console.log(`Server is running on port ${PORT}`);
    connectDB();
    }
);