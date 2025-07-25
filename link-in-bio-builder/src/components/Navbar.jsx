import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">ShareIt.bio</Link>
            <div className="space-x-4">
                <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            </div>
        </nav>
    )
}

export default Navbar
