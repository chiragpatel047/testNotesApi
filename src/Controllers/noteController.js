const noteModel = require("../models/note");

const createNote = async (req,res)=>{
    const {title,desc} = req.body;

    const newNote = new noteModel({
        title : title,
        desc : desc,
        userId : req.userId
    });

    try {
        
        await newNote.save();
        res.status(201).json(newNote);

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "something went wrong"});
    }
}

const updateNote = async (req,res)=>{

    const id = req.params.id;

    const {title,desc} = req.body;

    const newNote ={
        title : title,
        desc : desc,
        userId : req.userId
    };

    try {
        
        await noteModel.findByIdAndUpdate(id,newNote,{new : true});
        res.status(200).json(newNote);

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "something went wrong"});
    }
}

const deleteNote = async (req,res)=>{
    const id = req.params.id;

    try {
        
        const note = await noteModel.findByIdAndRemove(id);
        res.status(200).json(note);

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "something went wrong"});
    }

}

const getNote = async (req,res)=>{

    try {
        
        const notes = await noteModel.find({userId : req.userId});
        res.status(200).json(notes);

    } catch (error) {
        console.log(error);        
        res.status(500).json({message : "something went wrong"});
    }
}

module.exports = {createNote,updateNote,deleteNote,getNote}