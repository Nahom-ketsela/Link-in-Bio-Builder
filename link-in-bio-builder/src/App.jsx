// App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PublicProfile from './pages/PublicProfile';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext'; 
import ThemeToggle from './components/ThemeToggle'; 
import ErrorBoundary from './components/ErrorBoundary'; 

function App() {
  return (
    <ThemeProvider>
      <>
        <Navbar />
        <ThemeToggle />
        <div className="p-4">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/:username" element={<PublicProfile />} />
            </Routes>
          </ErrorBoundary>
        </div>
        <Footer />
      </>
    </ThemeProvider>
  );
}

export default App;