const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

console.log("Starting server.js file...");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Book Schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publicationYear: Number,
  genre: String
});
const Book = mongoose.model("Book", bookSchema);

// GET Books with pagination & sorting
app.get("/books", async (req, res) => {
  try {
    let { page = 1, page_size = 10, sort_by = "title", sort_order = "asc" } = req.query;
    page = parseInt(page);
    page_size = parseInt(page_size);

    const allowedSortFields = ["title", "author", "publicationYear", "genre"];
    if (!allowedSortFields.includes(sort_by)) return res.status(400).json({ error: "Invalid sort_by field" });
    if (!["asc", "desc"].includes(sort_order)) return res.status(400).json({ error: "Invalid sort_order" });

    const skip = (page - 1) * page_size;
    const books = await Book.find()
      .sort({ [sort_by]: sort_order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(page_size);

    const totalBooks = await Book.countDocuments();

    res.json({
      page,
      page_size,
      totalBooks,
      totalPages: Math.ceil(totalBooks / page_size),
      books
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
console.log("PORT from .env or default is:", PORT);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log(`Server is now listening on http://localhost:${PORT}`);