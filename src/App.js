import React from 'react';
import {Route, BrowserRouter,Link } from 'react-router-dom'
import './App.css';
import JobForm from './Job_Application'
import Admin from './AdminPage'


function App() {
  return (
    <BrowserRouter>
       <Link to ='/JobForm'> <button> Apply Job</button> </Link>
       <Link to ='/Admin Page'> <button> Admin Page </button> </Link>
      <Route path = '/JobForm' component = {JobForm} />
      <Route path = '/Admin Page' component = {Admin} />
     </BrowserRouter>  
  )
}

 
export default App;
