const express = require("express");
const router = express.Router();
const bookModel = require("../Models/bookModal");
const userModal = require("../Models/userModal");
const mongoose = require("mongoose");
router.post("/addBooks", async (req, res) => {
    const newBook = new bookModel(req.body)
    await newBook.save();
    res.send("Book Added successfully");
})
router.get("/getAllBooks", async (req, res) => {
    const response = await bookModel.find({});
    res.send(response);

});
router.post("/favourites", async (req, res) => {
    try {
        const { userDetail, data } = req.body;
        console.log(userDetail)
        const userSelect = await userModal.findOne({ uid: userDetail });

        const itemExist = userSelect.favorites.some(item => item.toString() === data._id.toString())
        console.log(itemExist)
        if (itemExist) {
            res.send("Already Added to Favorites");
        }
        else {
            userSelect.favorites.push(data._id);
            await userSelect.save();
            res.send("Favourite List added Successfully");
        }
    }
    catch (error) {
        res.send(error)
    }
});
router.get('/getFavourites', async (req, res) => {
    const uid = req.query.uid;
    try {

        const user = await userModal.findOne({ uid: uid });
        const favoriteBookIds = user.favorites

        const favoriteBooks = await bookModel.find({ _id: { $in: favoriteBookIds } });
        res.send(favoriteBooks);
    }
    catch (error) {
        res.status(401).send(error.message);
    }
});
router.delete('/deleteFavourites', async (req, res) => {
    console.log("Hello");
    try {
        const { uid, bookId } = req.query;

        console.log(bookId)
        const user = await userModal.findOne({ uid: uid });
        user.favorites = user.favorites.filter(fav => fav.toString() !== bookId);
        await user.save();
        res.send("Deleted Successfully");
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }



});
router.post('/purchaseBook', async (req, res) => {
    try {
        const { uid, data, counter } = req.body;
        const price = data.price * counter;
        const user = await userModal.findOne({ uid: uid });
        user.PurchasedBooks.push({ _id: data._id, bookCount: counter, amountPaid: price });

        await user.save();
        const book = await bookModel.findOne({ _id: data._id });
        book.No_of_Puchased = (book.No_of_Puchased) + counter;

        await book.save();
        res.send("Book Purchased Successfully");
    }
    catch (error) {
        console.log(error)
        res.send(error);
    }

})
module.exports = router