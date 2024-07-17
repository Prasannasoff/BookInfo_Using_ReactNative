const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    uid: {
        type: String,
        unique: true
    },
    email: String,
    favorites: [String],
    PurchasedBooks: [String]
})
const userModel = mongoose.model("userDetails", userSchema);
module.exports = userModel;