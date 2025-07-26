import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase'; // Ensure storage is imported
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import storage functions
import { useAuth } from '../context/AuthContext';

const socialPlatforms = [
    { id: 'instagram', label: 'Instagram', placeholder: 'yourusername' },
    { id: 'tiktok', label: 'TikTok', placeholder: '@yourname' },
    { id: 'facebook', label: 'Facebook', placeholder: 'yourname' },
    { id: 'twitter', label: 'Twitter', placeholder: 'yourhandle' },
    { id: 'telegram', label: 'Telegram', placeholder: 'yourchannel' },
    { id: 'whatsapp', label: 'WhatsApp', placeholder: '251912345678' }
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

const Dashboard = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [rawLinks, setRawLinks] = useState({});
    const [links, setLinks] = useState({});
    const [profilePic, setProfilePic] = useState('');
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('light'); // Default theme for profile
    const [selectedFont, setSelectedFont] = useState('sans-serif'); // Default font for profile

    useEffect(() => {
        if (!loading && !user) {
            navigate('/auth');
        }

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
                        setProfilePic(data.profilePic || '');
                        setSelectedTheme(data.theme || 'light'); // Set theme from database
                        setSelectedFont(data.font || 'sans-serif'); // Set font from database
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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        const storageRef = ref(storage, `avatars/${file.name}`);
        try {
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            setProfilePic(downloadURL);
            setError('');
        } catch (uploadError) {
            setError('Failed to upload avatar.');
        }
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
                profilePic,
                theme: selectedTheme, // Save selected theme
                font: selectedFont // Save selected font
            });
            alert('Profile saved!');
        } catch (err) {
            setError('Failed to save profile.');
        } finally {
            setIsLoading(false);
        }
    };

    if (loading || isLoading) return <div className="p-6">Loading...</div>;

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100">
            {/* Form Panel */}
            <div className="w-full md:w-1/2 rounded shadow p-6 bg-white">
                <h2 className="text-2xl font-bold mb-4">Edit Your Profile</h2>
                
                {error && <div className="mb-4 text-red-600">{error}</div>}

                <label className="block mb-2 font-medium">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="yourname"
                    className="w-full p-3 border rounded mb-4 focus:outline-none border-gray-300"
                />

                {/* Avatar Upload */}
                <div className="mb-4">
                    <label className="block mb-1">Upload Avatar</label>
                    <input type="file" onChange={handleFileChange} className="mb-2" />
                    <button onClick={handleUpload} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Upload</button>
                    {profilePic && (
                        <img src={profilePic} alt="Profile Avatar" className="w-24 h-24 rounded-full my-4" />
                    )}
                </div>

                {socialPlatforms.map(({ id, label, placeholder }) => (
                    <div key={id} className="mb-4">
                        <label className="block mb-1">{label}</label>
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

            {/* Live Preview */}
            <div className={`w-full md:w-1/2 p-4 rounded shadow ${themes.find(theme => theme.id === selectedTheme).background}`}>
                <h2 className={`text-2xl font-bold mb-4 text-center ${themes.find(theme => theme.id === selectedTheme).text}`}>Live Preview</h2>

                <div className="flex flex-col items-center" style={{ fontFamily: selectedFont }}>
                    <div className="w-24 h-24 rounded-full bg-gray-300 mb-2" style={{ backgroundImage: `url(${profilePic})`, backgroundSize: 'cover' }} />
                    <h3 className={`text-lg font-semibold mb-4 ${themes.find(theme => theme.id === selectedTheme).text}`}>@{username || 'username'}</h3>
                    <div className="w-full space-y-3">
                        {socialPlatforms.map(({ id, label }) =>
                            links[id] ? (
                                <a
                                    key={id}
                                    href={links[id]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-white text-center px-4 py-3 rounded-xl shadow hover:bg-gray-100 transition"
                                >
                                    {label}
                                </a>
                            ) : (
                                <div key={id} className="block bg-gray-200 text-center px-4 py-3 rounded-xl">
                                    {label} (link not added)
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;