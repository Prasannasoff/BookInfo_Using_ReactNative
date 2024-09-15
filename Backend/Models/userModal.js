const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    uid: {
        type: String,
        unique: true
    },
    email: String,
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookModel'
    }],

    PurchasedBooks: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'bookModal'
            },

            userRating: {
                type: Number,
                default: null
            },
            Review: {
                type: String,
                default: null
            },
            bookCount: {
                type: Number
            },
            amountPaid: {
                type: Number
            }
        }
    ]
})
const userModel = mongoose.model("userDetails", userSchema);
module.exports = userModel;