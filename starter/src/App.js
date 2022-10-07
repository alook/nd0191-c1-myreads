import "./App.css";
import { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import { Routes, Route } from "react-router-dom";
import BookShelfList from "./BookShelfList";
import BookSearch from "./BookSearch";

function App() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };
    getBooks();
  }, []);

  const onChangeShelf = (book, shelf) => {
    const addOrUpdateBook = (book, shelf) => {
      let isBookOnShelf = false
      const updatedBooks = books.map((b) => {
        if (b.id === book.id) {
          isBookOnShelf = true
          return {
            ...b,
            shelf: shelf
          }
        }
        return b
      })

      // Optimistic update
      if (isBookOnShelf) {
        setBooks(updatedBooks)
      } else {
        setBooks([
          ...books, {
            ...book,
            shelf: shelf
          }
        ])
      }

      // Update on server, rollback on failure
      BooksAPI.update(book, shelf).catch((error) => {
        console.error("Request failed, reverting UI state.")
        setBooks(books)
        throw error
      })
    }
    addOrUpdateBook(book, shelf)
  }

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <BookShelfList books={books} onChangeShelf={onChangeShelf} />
          }
        />
        <Route path="/search" element={<BookSearch books={books} onChangeShelf={onChangeShelf} />} />
      </Routes>
    </div>
  );
}

export default App;
