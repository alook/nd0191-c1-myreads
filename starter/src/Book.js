import PropTypes from "prop-types";

const Book = ({ book, onChangeShelf }) => {

    const onBookChangeShelf = (event) => {
        onChangeShelf(book, event.target.value)
    }

    return (
        <div className="book">
            <div className="book-top">
                {book.imageLinks?.thumbnail
                    ? <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                                'url("' + book.imageLinks.thumbnail + '")',
                        }}
                    ></div>
                    : <div>
                        <p>no thumbnail</p>
                    </div>
                }
                <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={onBookChangeShelf}>
                        <option disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
};

export default Book