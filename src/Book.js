import React, { Component } from 'react';
import './App.css'

// This component will show the details of book
// and will udate the result for every change in the shelf
class Book extends Component {

    render() {
     return (
      <li className="book-list-item" key={this.props.book.id}>
        <div className="book">
          <div className="book-top">
          <div className="book-cover" style={{width: 128, height: 193,  backgroundImage: `url(${this.props.imgurl})`}}></div>
          <div className="book-shelf-changer">
         
           {/* Pass the value of the target book in order to be added to the shelf  */}
            <select value={this.props.book.shelf} id="select-shelf" onChange={(event) => {this.props.updateShelf(this.props.book,event.target.value)}}>
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
            
            </select>
          </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          
          {/* Join the authors name together if there are multiple authors */}
          <div className="book-authors">{this.props.book.authors ? this.props.book.authors.join(', ') : ''}</div> 
        </div>
      </li>
     )
    }
  }
  
  export default Book