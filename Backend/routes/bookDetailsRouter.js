const express = require("express");
const router = express.Router();
const bookModel = require("../Models/bookModal")
router.post("/addBooks", async (req, res) => {
    const newBook = new bookModel(req.body)
    await newBook.save();
    res.send("Book Added successfully");
})
router.get("/getAllBooks", async (req, res) => {
    const response = await bookModel.find({});
    res.send(response);

});
module.exports = router