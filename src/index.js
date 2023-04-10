const express = require("express");
const app = express();
const mongoose = require("mongoose");

const notesRouter = require("./notesRouter");
const userRouter = require("./userRouter");

const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

app.use(express.json());

app.use(cors());

app.use("/users",userRouter);
app.use("/notes",notesRouter);

const PORT = process.env.PORT || 5000;

app.get("/"),(req,res)=>{
    res.send("Notes API");
}

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("server stared at port : "+ PORT);
    })
    
}).catch((error)=>{
    console.log(error);
})
