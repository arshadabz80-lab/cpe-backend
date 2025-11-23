import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// ENV variables from Render
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 🔵 Health Check
app.get("/", (req, res) => {
  res.send("CPE Backend is running successfully 🚀");
});

// 🔵 Add Competitor
app.post("/add-competitor", async (req, res) => {
  try {
    const { compname } = req.body;

    if (!compname) {
      return res.status(400).json({ error: "compname is required" });
    }

    const { data, error } = await supabase
      .from("competitors")
      .insert([{ compname }]);

    if (error) return res.status(400).json({ error });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔵 Get Competitor List
app.get("/competitors", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("competitors")
      .select("*")
      .order("id", { ascending: false });

    if (error) return res.status(400).json({ error });

    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Render Port
const PORT = process.env.PORT || 3000;

// ✅ Fixed listen function (This was the bug earlier)
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
