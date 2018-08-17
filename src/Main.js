import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

{/* This component will show the books after passing the props to the Book component */}
class Main extends Component {
  // Assign a state to the variable with an empty array
  state = {
    currently_reading: [],
    want_to_read: [],
    already_read: []
  };

  // Retrive all the books from the BooksApi
  getAllBooks() {
    BooksAPI.getAll().then(books => {
      
      var currently_reading = books.filter(book => {
        return book.shelf === "currentlyReading";
      });
      var want_to_read = books.filter(book => {
        return book.shelf === "wantToRead";
      });
      var already_read = books.filter(book => {
        return book.shelf === "read";
      });

      this.setState({
        currently_reading: currently_reading,
        want_to_read: want_to_read,
        already_read: already_read,
        showLoading: "none"
      });
    });
  }

  resetMain() {
    this.getAllBooks();
  }

  componentDidMount() {
    this.getAllBooks();
  }

  render() {
    return (
      <div>
        <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>Udacity MyReads</h1>
            </div>
          </div>

          <div className="list-books-content" />
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>

          <div className="list-books-content">
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {/* Pass the props of the books that is currently being read*/}
                  {this.state.currently_reading.length > 0 &&
                    this.state.currently_reading.map((book, index) => (
                      <Book
                        book={book}
                        key={book.id}
                        id={book.id}
                        imgurl={book.imageLinks.thumbnail}
                        title={book.title}
                        author={book.authors}
                        resetMain={this.resetMain.bind(this)}
                      />
                    ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Finish Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {/* Pass the props of the books that has already been read*/}
                {this.state.already_read.length > 0 &&
                  this.state.already_read.map((book, index) => (
                    <Book
                      book={book}
                      key={book.id}
                      id={book.id}
                      imgurl={book.imageLinks === undefined ? "" : book.imageLinks.thumbnail}
                      title={book.title}
                      author={book.authors}
                      resetMain={this.resetMain.bind(this)}
                    />
                  ))}
              </ol>
            </div>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {/* Pass the props of the books for future reading */}
                {this.state.want_to_read.length > 0 &&
                  this.state.want_to_read.map((book, index) => (
                    <Book
                      book={book}
                      key={book.id}
                      id={book.id}
                      imgurl={book.imageLinks.thumbnail}
                      title={book.title}
                      author={book.authors}
                      resetMain={this.resetMain.bind(this)}
                    />
                  ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
