import { useNavigate } from 'react-router-dom'
import { RocketLaunchIcon, LinkIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

const heroImage = 'https://api.blog.production.linktr.ee/wp-content/uploads/2021/06/lsp_Blog-1_070621-084608.png'

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-white text-gray-900 px-4 py-10 md:px-10">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
                {/* Text Side */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        All your links in one sleek profile.
                    </h1>
                    <p className="text-gray-600 text-lg mb-6">
                        Create a personalized landing page to connect your audience to all your content —
                        socials presence and more.
                    </p>
                    <button
                        onClick={() => navigate('/auth')}
                        className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded hover:bg-blue-700 transition"
                    >
                        Get Started Free
                    </button>
                </div>

                {/* Image Side */}
                <div className="flex-1">
                    <img
                        src={heroImage}
                        alt="Preview"
                        className="w-full max-w-md mx-auto rounded-xl shadow-lg"
                    />
                </div>
            </div>

            {/* Feature Highlights */}
            <div className="mt-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
                    <RocketLaunchIcon className="w-10 h-10 mx-auto text-blue-600 mb-2" />
                    <h3 className="font-semibold mb-1">Launch in seconds</h3>
                    <p className="text-sm text-gray-600">Create and share your profile in under 2 minutes.</p>
                </div>

                <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
                    <LinkIcon className="w-10 h-10 mx-auto text-blue-600 mb-2" />
                    <h3 className="font-semibold mb-1">All your links</h3>
                    <p className="text-sm text-gray-600">Instagram, TikTok, WhatsApp, YouTube — all in one.</p>
                </div>

                <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
                    <GlobeAltIcon className="w-10 h-10 mx-auto text-blue-600 mb-2" />
                    <h3 className="font-semibold mb-1">Share anywhere</h3>
                    <p className="text-sm text-gray-600">Share your link on any platform or bio instantly.</p>
                </div>
            </div>
        </div>
    )
}

export default Home
