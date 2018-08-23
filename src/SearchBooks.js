import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

// This component will show the result page of the search component
class SearchBooks extends Component {
  state = {
    query: '',
    results: [],
    error: false
  }
  
  updateQuery = (query) => {
    this.setState({
      query: query
    }, this.submitSearch);
  }

  clearQuery = (query) => {
    this.setState({
      query: ''
    });
  }

  clearSearchResults = (query) => {
    this.setState({
      results: []
    });
  }

  submitSearch() {
    if (this.state.query === '' || this.state.query === undefined) {
      // Reset
      this.clearSearchResults();
      return;
    }

    //Check the BooksAPI for the results of the search
    BooksAPI.search(this.state.query.trim(), 6).then((results) => {
      if (results.error && results.error === "empty query") {
        // Bad query; No Results
        this.setState({
          error: true,
          results: []
        });
      } else if (results) {
        results.map(result => {
          if (result.shelf === undefined) {
            result.shelf = 'none';
          }

          // Pass the shelf status from to the book results
          this.props.books.forEach(book => {
            if (book.id === result.id) {
              result.shelf = book.shelf;
            }
          });
          return true
        });
        this.setState({
          results: results,
          error: false
        });
      }
    })
  }

  render() {
   
    return (
      <div className="search-books">
       
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}   />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.length > 0 && this.state.results.map((book) => (
              <Book
                book={book} 
                shelf={book.shelf} 
                key={book.id} id={book.id} 
                imgurl={book.imageLinks === undefined ? "" : book.imageLinks.thumbnail} 
                title={book.title} 
                author={book.authors} 
                updateShelf={this.props.updateShelf.bind(this)} />
            ))}
          </ol>
          {this.state.error && <p>No Books Found ...</p>}
        </div>
      </div>
    )
  }
}

export default SearchBooks