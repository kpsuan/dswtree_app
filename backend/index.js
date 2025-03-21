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


app.use("/api/auth", authRoutes)
app.use("/api/trees", treesRoutes)

app.get('/', (req, res) => {
    res.send('Server is running!');
  });

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  });

app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
    connectDB();
    }
);