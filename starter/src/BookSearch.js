import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Book from "./Book";
import { useState, useMemo, useCallback } from "react";
import * as BooksAPI from "./BooksAPI";
import debounce from 'lodash.debounce';

const BookSearch = ({ books, onChangeShelf }) => {

    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const mergeSearchResultAndShelfs = (searchResultBooks, shelfBooks) => {
        return searchResultBooks.map((searchResultBook) => {
            const bookOnShelf = shelfBooks.find((bookOnShelf) => bookOnShelf.id === searchResultBook.id)
            if (bookOnShelf) {
                return bookOnShelf
            } else {
                searchResultBook.shelf = "none"
                return searchResultBook
            }
        })
    }

    const search = useCallback((searchTerm) => {
        try {
            BooksAPI.search(searchTerm, 10).then((res) => {
                if (Array.isArray(res)) {
                    const enhancedSearchResult = mergeSearchResultAndShelfs(res, books)
                    setSearchResults(enhancedSearchResult);
                } else {
                    setSearchResults([])
                }
            })
        } catch (error) {
            console.error("Request failed", error)
            setSearchResults([])
        }
    }, [books])

    const debouncedSearch = useMemo(() => debounce(search, 500), [search]);

    const onSeachTermChanged = (event) => {
        event.preventDefault()
        const searchTerm = event.target.value
        setSearchTerm(searchTerm)
        if (searchTerm.length > 0) {
            debouncedSearch(searchTerm)
        } else {
            setSearchResults([])
        }
    };

    const onSearchChangeShelf = (book, shelf) => {
        setSearchResults(searchResults.map((b) => {
            if (b.id === book.id) {
                return {
                    ...b,
                    shelf: shelf
                }
            }
            return b
        }));
        onChangeShelf(book, shelf)
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={searchTerm}
                        onInput={onSeachTermChanged}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchTerm.length > 0 &&
                        searchResults.map((book) => {
                            return (
                                <li key={book.id}>
                                    <Book book={book} onChangeShelf={onSearchChangeShelf} />
                                </li>
                            )
                        })
                    }
                </ol>
            </div>
        </div>
    )
}

BookSearch.propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
};

export default BookSearch