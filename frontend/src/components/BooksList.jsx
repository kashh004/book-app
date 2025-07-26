import React, { useEffect, useState } from "react";
import axios from "axios";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/books", {
        params: {
          page,
          page_size: pageSize,
          sort_by: sortBy,
          sort_order: sortOrder,
        },
      });
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, pageSize, sortBy, sortOrder]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      width: "100%",
      margin: 0,
      padding: 0,
      background: "linear-gradient(135deg, #ff6a00, #ee0979)",
      animation: "gradientShift 8s ease infinite",
      color: "#f5f5f5",
      fontFamily: "sans-serif",
      transition: "background 0.5s ease"
    }}>
      <style>
        {`
          html, body, #root {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
          }
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <h1 style={{
        fontSize: "3rem",
        marginBottom: "20px",
        textShadow: "0 0 15px #fff, 0 0 30px #ff0, 0 0 45px #f0f"
      }}>Book Management Application</h1>

      {/* Sorting */}
      <div style={{
        marginBottom: "20px",
        display: "flex",
        gap: "10px",
        backgroundColor: "#2c2c2c",
        padding: "10px 15px",
        borderRadius: "8px"
      }}>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: "5px", borderRadius: "5px" }}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publicationYear">Year</option>
          <option value="genre">Genre</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: "5px", borderRadius: "5px" }}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Book List */}
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "20px", width: "300px" }}>
        {books.map((book) => (
          <li key={book._id} style={{
            marginBottom: "10px",
            backgroundColor: "#333",
            padding: "15px 20px",
            borderRadius: "6px",
            fontSize: "1.4rem",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#555";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#333";
            e.currentTarget.style.transform = "scale(1)";
          }}>
            <strong>{book.title}</strong> by {book.author} ({book.publicationYear}) - {book.genre}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          style={{
            padding: "8px 16px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: page === 1 ? "not-allowed" : "pointer",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 0 10px #fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          style={{
            padding: "8px 16px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor:  page === totalPages ? "not-allowed" : "pointer",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 0 10px #fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BooksList;