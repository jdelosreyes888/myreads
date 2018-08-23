import React, { Component } from "react";
import Book from "./Book";

 class Shelf extends Component {
  render() {
    return (
      <div>
        <div className="list-books-content">
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                 
                  {this.props.bookStatus.length > 0 &&
                    this.props.bookStatus.map((book, index) => (
                      <Book
                        book={book}
                        key={book.id}
                        id={book.id}
                        imgurl={book.imageLinks === undefined ? "" : book.imageLinks.thumbnail} 
                        title={book.title}
                        author={book.authors}
                        updateShelf={this.props.updateShelf.bind(this)} 
                      />
                    ))}
                </ol>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default Shelf