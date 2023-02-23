import React from 'react'
import Navigation from './components/Navigation'
import Home from "./pages/Home"
import About from "./pages/About"
import { Route, Routes } from 'react-router-dom'
import Leaderboards from './pages/Leaderboards'
import Footer from './components/Footer'

function App() {

  return (
    <div id="outer-container">
      <Navigation pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderbaords" element={<Leaderboards />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer/>
    </div>
  );
}


export default App;