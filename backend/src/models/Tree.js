import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const treeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    commonNames: {
        type: String,
    },
    type: {
        type: String,
    },
    description: {
        type: String,
        unique: true,
    },
    image:{
        type: String,
        required: false,
    },
    Toxicity:{
        type: String,
        required: false,
    },
    Humidity:{
        type: String,
        required: false,
    },
    Sunlight:{
        type: String,
        required: false,
    },
    Location:{
        type: String,
        required: false,
    },
    Water:{
        type: String,
        required: false,
    },
    FertilizerType:{
        type: String,
        required: false,
    },
    FertilizeEvery:{
        type: String,
        required: false,
    },
    Temperature:{
        type: String,
        required: false,
    },
    ResistanceZone:{
        type: String,
        required: false,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
}, {
    timestamps: true,
});


const Tree = mongoose.model('Tree', treeSchema);
export default Tree;