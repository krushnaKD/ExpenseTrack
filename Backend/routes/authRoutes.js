const express = require("express")
const {protect }= require("../middleware/AuthMiddleware")
const {
    registerUser,
    loginUser,
    getUserInfo
} = require("../controllers/authController");

const Authrouter = express.Router()

Authrouter.post("/register",registerUser);
Authrouter.post("/login",loginUser);
Authrouter.get("/getUser",protect, getUserInfo);


module.exports = Authrouter