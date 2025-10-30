// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { registerUser } from "./javascript/register.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/register", (req, res) => {
  registerUser(req.body);
  res.json({ message: "User registered successfully!" });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));