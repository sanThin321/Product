import pool from "../middleware/db.js";

// Get all Dzongkhags
export const getDzongkhags = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM dzongkhags ORDER BY name ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching Dzongkhags:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all Gewogs under a specific Dzongkhag
export const getGewogsByDzongkhag = async (req, res) => {
  const { dzongkhagId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM gewogs WHERE dzongkhag_id = $1 ORDER BY name ASC", [dzongkhagId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching Gewogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all Chiwogs under a specific Gewog
export const getChiwogsByGewog = async (req, res) => {
  const { gewogId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM chiwogs WHERE gewog_id = $1 ORDER BY name ASC", [gewogId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching Chiwogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
