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

});
router.get('/getPurchasedBook', async (req, res) => {

    try {
        const uid = req.query.uid;
        const user = await userModal.findOne({ uid: uid });

        //Promise.all allows all the fetch operations to happen in parallel, which is much faster.
        //Promise.all combined with await allows you to efficiently handle multiple asynchronous operations and ensures that you only proceed once all the necessary data has been fetched.
        const purchasedBook = await Promise.all(
            user.PurchasedBooks.map(async (book) => {
                const bookPurchased = await bookModel.findOne({ _id: book._id }).lean()//lean(): This method is used to return plain JavaScript objects instead of Mongoose documents
                if (bookPurchased) {
                    const bookDetails = {
                        bookName: bookPurchased.bookName,
                        author: bookPurchased.author,
                        image: bookPurchased.image,
                        category: bookPurchased.category,
                        rating:bookPurchased.rating
                    };
                    // Include the additional purchase details
                    return {

                        ...bookDetails,//The spread operator (...) is used to take all the properties of the book object and "spread" them into a new object.
                        bookCount: book.bookCount,
                        amountPaid: book.amountPaid
                    };
                }
            })
        )
        console.log(purchasedBook)
        res.send(purchasedBook);
    }
    catch (error) {
        console.log(error)
        res.send(error);
    }
})
module.exports = router