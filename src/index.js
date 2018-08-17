import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Install the BrowserRouter modules using npm 
ReactDOM.render(
    <BrowserRouter><App /></BrowserRouter>, document.getElementById('root')
    )
