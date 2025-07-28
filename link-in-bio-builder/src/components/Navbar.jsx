import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/auth');
    };

    return (
        <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between rounded-full shadow-md mx-4 my-4">
            <Link to="/" className="text-2xl font-bold tracking-tight hover:text-blue-400 transition">
                ShareIt.bio
            </Link>

            <div className="flex items-center space-x-4">
                {user && (
                    <span className="hidden sm:inline text-sm font-medium text-gray-300">
                        {user.email}
                    </span>
                )}

                {user ? (
                    <>
                        <Link
                            to="/dashboard"
                            className="px-4 py-1 rounded-full bg-gray-700 hover:bg-blue-600 transition text-sm"
                        >
                            Dashboard
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-1 rounded-full bg-red-600 hover:bg-red-700 transition text-sm"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link
                        to="/auth"
                        className="px-4 py-1 rounded-full bg-blue-600 hover:bg-blue-700 transition text-sm"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
