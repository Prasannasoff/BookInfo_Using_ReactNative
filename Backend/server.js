const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); // Ensure this line is present
const dbConfig = require("./config/dbConfig"); // Assuming this file correctly sets up your MongoDB connection
app.use(express.json());
app.use(cors());
const bookDetailsRouter=require("./routes/bookDetailsRouter")
app.use("/api/bookDetails",bookDetailsRouter)
const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));