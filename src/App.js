import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import SearchBooks from './SearchBooks'
import Page404 from './Page404'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState({books})
    })
  }

  updateShelf = (book, shelf) => {
    if (this.state.books) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])
        }))
      })
    }
  }


  render() { 
    const books = this.state.books;
    
    const currently_reading = books.filter(book => {
      return book.shelf === "currentlyReading";
    });
    const want_to_read = books.filter(book => {
      return book.shelf === "wantToRead";
    });
    const already_read = books.filter(book => {
      return book.shelf === "read";
    });

    return (
      <div className="app">
        <Switch>
        {/* Show the main page if it is in the root folder*/}
          <Route exact path='/' render={({ history }) => (
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

              <Shelf shelfTitle="Currently Reading" bookStatus={currently_reading} updateShelf={this.updateShelf.bind(this)}  />
              <Shelf shelfTitle="Want To Read" bookStatus={want_to_read}  updateShelf={this.updateShelf.bind(this)} />
              <Shelf shelfTitle="Finish Reading" bookStatus={already_read} updateShelf={this.updateShelf.bind(this)} />
          
              </div> // end off app className
          )} />

          {/* Once the plus sign is click it will show search page */}  
          <Route exact path='/search' render={({ history }) => (
              <SearchBooks updateShelf={this.updateShelf.bind(this)} books={this.state.books}/>
          )} />

          {/* 404 page if the user accidentaly has the wrong url */}
          <Route path='/*' component={Page404} />

        </Switch>
      </div> // app div
    )
  }
}

export default BooksApp
