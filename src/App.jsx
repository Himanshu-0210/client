import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import { Routes, Route, } from "react-router-dom"
import Courses from './pages/Courses'
import Login from './pages/Login'
import Register from './pages/Register'
import CourseDetail from './pages/CourseDetail'
import MyBooking from './pages/MyBooking'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mybooking" element={<MyBooking />} />
        <Route path="/coursedetails/:id" element={<CourseDetail />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App
