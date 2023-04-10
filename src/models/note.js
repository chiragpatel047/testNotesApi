const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title :{
        type : String,
        require : true
    },
    desc: {
        type : String,
        require : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        require : true
    }
},{timestamps : true});

module.exports = mongoose.model("note",noteSchema);