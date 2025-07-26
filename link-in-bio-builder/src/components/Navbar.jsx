import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/auth')
    }

    return (
        <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">ShareIt.bio</Link>
            <div className="space-x-4">
                {user ? (
                    <>
                        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                        <button onClick={handleLogout} className="hover:underline">Logout</button>
                    </>
                ) : (
                    <Link to="/auth" className="hover:underline">Login</Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar
