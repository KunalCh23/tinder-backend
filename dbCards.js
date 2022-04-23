// const mongoose = require('mongoose')
import mongoose from 'mongoose'

const cardSchema= mongoose.Schema({
    name: String,
    imgUrl: String
});

// module.exports= mongoose.model('cards',cardSchema);
export default mongoose.model('cards',cardSchema);