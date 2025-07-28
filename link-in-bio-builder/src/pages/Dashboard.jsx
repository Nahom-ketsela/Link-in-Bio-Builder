import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { UserCircleIcon, ShareIcon } from '@heroicons/react/24/solid';
import { FaInstagram, FaTiktok, FaFacebook, FaTwitter, FaTelegram, FaWhatsapp } from 'react-icons/fa';

const socialPlatforms = [
    { id: 'instagram', label: 'Instagram', placeholder: 'yourusername', icon: <FaInstagram className="inline mr-2" /> },
    { id: 'tiktok', label: 'TikTok', placeholder: '@yourname', icon: <FaTiktok className="inline mr-2" /> },
    { id: 'facebook', label: 'Facebook', placeholder: 'yourname', icon: <FaFacebook className="inline mr-2" /> },
    { id: 'twitter', label: 'Twitter', placeholder: 'yourhandle', icon: <FaTwitter className="inline mr-2" /> },
    { id: 'telegram', label: 'Telegram', placeholder: 'yourchannel', icon: <FaTelegram className="inline mr-2" /> },
    { id: 'whatsapp', label: 'WhatsApp', placeholder: '251912345678', icon: <FaWhatsapp className="inline mr-2" /> }
];

const themes = [
    { id: 'light', label: 'Light', background: 'bg-white', text: 'text-black' },
    { id: 'dark', label: 'Dark', background: 'bg-gray-800', text: 'text-white' },
    { id: 'blue', label: 'Blue', background: 'bg-blue-100', text: 'text-blue-800' },
    { id: 'green', label: 'Green', background: 'bg-green-100', text: 'text-green-800' }
];

const fonts = [
    { id: 'sans-serif', label: 'Sans Serif' },
    { id: 'serif', label: 'Serif' },
    { id: 'monospace', label: 'Monospace' },
    { id: 'cursive', label: 'Cursive' },
    { id: 'fantasy', label: 'Fantasy' }
];

const baseUrls = {
    instagram: 'https://www.instagram.com/',
    tiktok: 'https://www.tiktok.com/@',
    facebook: 'https://www.facebook.com/',
    twitter: 'https://twitter.com/',
    telegram: 'https://t.me/',
    whatsapp: 'https://wa.me/'
};

const Dashboard = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [rawLinks, setRawLinks] = useState({});
    const [links, setLinks] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('light');
    const [selectedFont, setSelectedFont] = useState('sans-serif');

    useEffect(() => {
        if (!loading && !user) navigate('/auth');

        const fetchData = async () => {
            if (user) {
                try {
                    setIsLoading(true);
                    const docRef = doc(db, 'users', user.uid);
                    const snap = await getDoc(docRef);
                    if (snap.exists()) {
                        const data = snap.data();
                        setUsername(data.username || '');
                        setRawLinks(() => {
                            const raw = {};
                            for (const key in data.links || {}) {
                                raw[key] = extractUsername(data.links[key], key);
                            }
                            return raw;
                        });
                        setLinks(data.links || {});
                        setSelectedTheme(data.theme || 'light');
                        setSelectedFont(data.font || 'sans-serif');
                    }
                } catch (err) {
                    setError('Failed to fetch user data.');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, [user, loading]);

    const extractUsername = (url, platform) => {
        if (!url) return '';
        const prefix = baseUrls[platform];
        return url.replace(prefix, '').replace(/^@/, '');
    };

    const handleLinkChange = (platform, rawValue) => {
        const clean = rawValue.trim().replace(/^@/, '');
        const fullLink = clean.startsWith('http') ? clean : baseUrls[platform] + clean;
        setRawLinks({ ...rawLinks, [platform]: rawValue });
        setLinks({ ...links, [platform]: fullLink });
    };

    const saveProfile = async () => {
        if (!username.trim()) {
            setError('Username is required.');
            return;
        }

        try {
            setIsLoading(true);
            const docRef = doc(db, 'users', user.uid);
            await setDoc(docRef, {
                username: username.trim(),
                links,
                theme: selectedTheme,
                font: selectedFont
            });
            alert('Profile saved!');
        } catch (err) {
            setError('Failed to save profile.');
        } finally {
            setIsLoading(false);
        }
    };

    const shareProfileUrl = `${window.location.origin}/${username}`;

    if (loading || isLoading) return <div className="p-6">Loading...</div>;

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100">
            <div className="w-full md:w-1/2 rounded-xl shadow-lg p-6 bg-white">
                <h2 className="text-2xl font-bold mb-6">Edit Your Profile</h2>

                {error && <div className="mb-4 text-red-600">{error}</div>}

                <label className="block mb-2 font-medium">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="yourname"
                    className="w-full p-3 border rounded mb-6 focus:outline-none border-gray-300"
                />

                {socialPlatforms.map(({ id, label, placeholder, icon }) => (
                    <div key={id} className="mb-4">
                        <label className="block mb-1">{icon}{label}</label>
                        <input
                            type="text"
                            value={rawLinks[id] || ''}
                            onChange={(e) => handleLinkChange(id, e.target.value)}
                            placeholder={placeholder}
                            className="w-full p-3 border rounded focus:outline-none border-gray-300"
                        />
                    </div>
                ))}

                <label className="block mb-2 font-medium">Select Theme</label>
                <select
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="w-full p-3 border rounded mb-4"
                >
                    {themes.map(theme => (
                        <option key={theme.id} value={theme.id}>{theme.label}</option>
                    ))}
                </select>

                <label className="block mb-2 font-medium">Select Font</label>
                <select
                    value={selectedFont}
                    onChange={(e) => setSelectedFont(e.target.value)}
                    className="w-full p-3 border rounded mb-4"
                >
                    {fonts.map(font => (
                        <option key={font.id} value={font.id}>{font.label}</option>
                    ))}
                </select>

                <button
                    onClick={saveProfile}
                    className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                >
                    Save Profile
                </button>
            </div>

            <div className={`w-full md:w-1/2 p-6 rounded-xl shadow-lg ${themes.find(theme => theme.id === selectedTheme).background}`}>
                <h2 className={`text-2xl font-bold mb-6 text-center ${themes.find(theme => theme.id === selectedTheme).text}`}>
                    Live Preview
                </h2>

                <div className="flex flex-col items-center gap-4" style={{ fontFamily: selectedFont }}>
                    <UserCircleIcon className="w-20 h-20 text-gray-400" />
                    <h3 className={`text-xl font-semibold ${themes.find(theme => theme.id === selectedTheme).text}`}>
                        @{username || 'username'}
                    </h3>

                    <div className="w-full space-y-3 mt-4">
                        {socialPlatforms.map(({ id, label, icon }) =>
                            links[id] ? (
                                <a
                                    key={id}
                                    href={links[id]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-white text-center px-4 py-3 rounded-xl shadow hover:bg-gray-100 transition justify-center"
                                >
                                    {icon}{label}
                                </a>
                            ) : null
                        )}
                    </div>

                    <button
                        onClick={() => navigator.clipboard.writeText(shareProfileUrl)}
                        className="mt-6 flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        <ShareIcon className="w-5 h-5" /> Share Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
