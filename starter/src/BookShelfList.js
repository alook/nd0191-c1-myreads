import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useMemo } from "react";

const BookShelfList = ({ books, onChangeShelf }) => {

  const currentlyReading = useMemo(() => { return books.filter(book => book.shelf === "currentlyReading") }, [books])
  const wantToRead = useMemo(() => { return books.filter(book => book.shelf === "wantToRead") }, [books])
  const read = useMemo(() => { return books.filter(book => book.shelf === "read") }, [books])

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf title="Currently Reading" books={currentlyReading} onChangeShelf={onChangeShelf} />
          <BookShelf title="Want to Read" books={wantToRead} onChangeShelf={onChangeShelf} />
          <BookShelf title="Read" books={read} onChangeShelf={onChangeShelf} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          Add a book
        </Link>
      </div>
    </div>
  )
}

BookShelfList.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default BookShelfList