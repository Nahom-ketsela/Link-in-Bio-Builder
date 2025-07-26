import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PublicProfile from './pages/PublicProfile';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext'; 
import ThemeToggle from './components/ThemeToggle'; 

function App() {
  return (
    <ThemeProvider> {/* Wrap the application with ThemeProvider */}
      <>
        <Navbar />
        <ThemeToggle />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/:username" element={<PublicProfile />} />
          </Routes>
        </div>
        <Footer />
      </>
    </ThemeProvider>
  );
}

export default App;