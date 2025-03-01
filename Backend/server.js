import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Neon
});

// Check DB Connection
async function checkDBConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Connected to Neon! Current Time:", result.rows[0].now);
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
}

checkDBConnection();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
