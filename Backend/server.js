require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hellow");
});

connectDB();

app.use("/api/v1/auth", authRoutes);

// app.use("/uploads",express.static(path.join(__dirname,"uploads")))


app.listen(PORT, () => {
  console.log(`Server is started on ${PORT}`);
});
