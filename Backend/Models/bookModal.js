const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    bookName: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    authorImage:{
        type:String,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: null
    },
    overview: {
        type: String,
        required: true
    },
    No_of_Puchased: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    }


},
    {
        timestamps: true,
    }
);

const bookModel = mongoose.model("bookDetails", bookSchema);
module.exports = bookModel; // Export as default
