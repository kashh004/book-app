# book-app
# Book Management Application – Pagination & Sorting

A full-stack **Book Management Application** with **pagination** and **sorting** features. Users can view books, sort by title/author/year/genre, and navigate through pages. Built using **Node.js, Express, MongoDB Atlas (Mongoose)** for backend and **React (Vite) with Axios** for frontend.

---

## **Live Demo**

- **Frontend (Vercel):** [Book Management Frontend](https://book-app-frontend-5l1w03orv-akash-n-s-projects.vercel.app/)
- **Backend (Render API):** [Books API](https://book-app-3hiu.onrender.com/books)  

---

## **Features**

- View all books with pagination
- Sort books by Title, Author, Year, or Genre
- Cloud database using **MongoDB Atlas**
- Responsive and animated UI with gradient background
- Deployed on **Render** (backend) and **Vercel** (frontend)

---

## **Tech Stack**

### **Frontend**
- React (Vite)
- Axios

### **Backend**
- Node.js
- Express
- Mongoose

### **Database**
- MongoDB Atlas (Cloud)

---

## **Project Structure**
book-app/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
├── src/
│   ├── App.jsx
│   └── components/BooksList.jsx
├── package.json
└── vite.config.js
---
MONGO_URI=mongodb+srv://akashngowda2004:6XiY6Htbz5IdIh6T@cluster0.nz99qzc.mongodb.net/books?retryWrites=true&w=majority
PORT=4000
### Frontend Setup
cd frontend
npm install
npm run dev
Deployment

Backend (Render)
	•	Push backend code to GitHub
	•	Create Web Service on Render
	•	Add MONGO_URI in Environment Variables
	•	Deploy to get live API URL

Frontend (Vercel)
	•	Push frontend code to GitHub
	•	Deploy via Vercel (or use CLI: npx vercel --prod)
	•	Update API URLs to point to Render backend

⸻

API Endpoint

GET /books

Query Parameters:
	•	page (default: 1)
	•	page_size (default: 10)
	•	sort_by (title, author, publicationYear, genre)
	•	sort_order (asc, desc)
