import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-20">
            <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
                {/* Column 1: Brand */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-2">ShareIt.bio</h2>
                    <p className="text-gray-400">
                        One link to rule your content. Share your world with one click.
                    </p>
                </div>

                {/* Column 2: Links */}
                <div className="flex flex-col space-y-2">
                    <span className="text-white font-medium">Navigation</span>
                    <Link to="/" className="hover:text-blue-400 transition">Home</Link>
                    <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
                    <Link to="/auth" className="hover:text-blue-400 transition">Login</Link>
                </div>

                {/* Column 3: Connect */}
                <div className="flex flex-col space-y-2">
                    <span className="text-white font-medium">Connect</span>
                    <a
                        href="https://github.com/your-repo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition"
                    >
                        GitHub
                    </a>
                    <a
                        href="mailto:support@shareit.bio"
                        className="hover:text-blue-400 transition"
                    >
                        support@shareit.bio
                    </a>
                </div>
            </div>

            <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-700">
                © {new Date().getFullYear()} ShareIt.bio
            </div>
        </footer>
    )
}

export default Footer
