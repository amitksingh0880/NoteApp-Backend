const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body : {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }

},{timestamps: true},{versionKey: false});

const NoteModel = mongoose.model("NoteModel", noteSchema);

module.exports = {
    NoteModel,
}