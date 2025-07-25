import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import PublicProfile from './pages/PublicProfile'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/:username" element={<PublicProfile />} />
        </Routes>
      </div>
    </>
  )
}

export default App
