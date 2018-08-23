import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div>
      <h1>Ooops.  It looks you are in the wrong page.</h1>
      <Link to="/">Click here to return to the main page.</Link>    
    </div>
  )
}
