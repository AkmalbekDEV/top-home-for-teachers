import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Even14 from './pages/Even14'
import Even16 from './pages/Even16'
import Odd09 from './pages/Odd09'
import Odd11 from './pages/Odd11'
import Odd16 from './pages/Odd16'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/even14' element={<Even14 />} />
        <Route path='/even16' element={<Even16 />} />
        <Route path='/odd9' element={<Odd09 />} />
        <Route path='/odd11' element={<Odd11 />} />
        <Route path='/odd16' element={<Odd16 />} /> 
      </Routes>
    </div>
  )
}

export default App