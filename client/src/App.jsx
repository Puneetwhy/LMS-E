import { useState } from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Homepage from './pages/HomePage'
import AboutUs from './pages/AboutUs'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'
// import Footer from './components/Footer'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <Homepage /> }></Route>
        <Route path="/about" element={ <AboutUs /> }></Route>
        <Route path="/signup" element={ <Signup /> }></Route>


        <Route path="*" element={ <NotFound /> }></Route>

      </Routes>

    </>
  )
}

export default App
