import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// Supabase connection
const SUPABASE_URL = "https://xjjrqxycufaqxzjhrnyw.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqanJxeHljdWZhcXh6amhybnl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTUxNzIsImV4cCI6MjA3OTQ3MTE3Mn0.xNcCqTO4MeUzJNCSAVH5Zs-TQnZ7ZS4R13Sn2GM_9z8";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// Default route
app.get("/", (req, res) => {
  res.send("CPE Backend Running with Supabase ✔");
});

// Insert competitor
app.post("/add-competitor", async (req, res) => {
  const { name, url } = req.body;

  const { data, error } = await supabase
    .from("competitors")
    .insert([{ name, url }]);

  if (error) return res.status(400).json({ error });
  res.json({ success: true, data });
});

// Get all competitors
app.get("/competitors", async (req, res) => {
  const { data, error } = await supabase.from("competitors").select("*");

  if (error) return res.status(400).json({ error });
  res.json(data);
});

// Render-compatible server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => cons
