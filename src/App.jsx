import React from 'react'
import { useState } from 'react'
import {Routes, Route} from "react-router-dom"
import Home from './Pages/Home'
import BookDetails from './Pages/Details'


function App() {


  return (
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/book/:id" element={<BookDetails/>} />
    </Routes>
  )
}

export default App
