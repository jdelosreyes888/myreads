import React from 'react'
import './App.css'
import { Link, Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import Main from './Main'

// This class component serves as a container for the two 
// component, the main and the search components

class BooksApp extends React.Component {


  render() {
    return (
      <div className="app">
       {/* Show the main page if it is in the root folder*/}
        <Route exact path='/' render={({ history }) => (
          <Main />
        )} />

      {/* Once the plus sign is click it will show search page */}  
      <Route exact path='/search' render={({ history }) => (
          <SearchBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp
