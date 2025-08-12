import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Dashboard from './Pages/Dashboard'
import Workouts from './Pages/Workouts'
import Profile from './Pages/Profile'
import Progress from './Pages/Progress'
import About from './Pages/About'
import Contact from './Pages/Contact'

function App() {
  const location = useLocation()
  const hideHeaderPaths = ['/contact'] 

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/workouts' element={<Workouts />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/progress' element={<Progress />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
