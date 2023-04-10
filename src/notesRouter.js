const express = require("express");
const notesRouter = express.Router();
const { getNote, createNote, deleteNote, updateNote } = require("./Controllers/noteController");
const auth = require("./Middlewares/auth");
 
notesRouter.get("/",auth,getNote);
notesRouter.post("/",auth,createNote);
notesRouter.delete("/:id",auth,deleteNote); 
notesRouter.put("/:id",auth,updateNote);

module.exports = notesRouter;