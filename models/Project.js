// import mongoose from "mongoose";
// const {model, Schema, models} = require("mongoose");

import mongoose, {model, Schema, models} from "mongoose";

const ProjectSchema = new Schema({

    Title: {type:String, required:true},
    Description: String,
    Price: {type: Number, required: true},
    Images: [{type:String}], 
    category: {type: mongoose.Types.ObjectId, ref:'Category'},
}, {
    timestamps: true,
});

export const Project = models.Project || model('Project', ProjectSchema);