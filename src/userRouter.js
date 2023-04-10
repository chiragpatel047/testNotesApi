const express = require("express");
const { signUp, login } = require("./Controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup",signUp)

userRouter.post("/login",login)

module.exports = userRouter;