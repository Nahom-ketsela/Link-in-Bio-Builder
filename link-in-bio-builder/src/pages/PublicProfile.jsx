import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Helmet } from 'react-helmet';
import { FaInstagram, FaTiktok, FaFacebook, FaTwitter, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const socialPlatforms = {
    instagram: { label: 'Instagram', icon: <FaInstagram className="inline mr-2" /> },
    tiktok: { label: 'TikTok', icon: <FaTiktok className="inline mr-2" /> },
    facebook: { label: 'Facebook', icon: <FaFacebook className="inline mr-2" /> },
    twitter: { label: 'Twitter', icon: <FaTwitter className="inline mr-2" /> },
    telegram: { label: 'Telegram', icon: <FaTelegram className="inline mr-2" /> },
    whatsapp: { label: 'WhatsApp', icon: <FaWhatsapp className="inline mr-2" /> }
};

const themeBackgrounds = {
    light: 'bg-white',
    dark: 'bg-gray-800',
    blue: 'bg-blue-100',
    green: 'bg-green-100'
};

const PublicProfile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const usersRef = collection(db, 'users');
                const q = query(usersRef, where('username', '==', username));
                const snapshot = await getDocs(q);

                if (!snapshot.empty) {
                    const data = snapshot.docs[0].data();
                    setProfile(data);
                } else {
                    setNotFound(true);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [username]);

    const handleShare = () => {
        const profileUrl = `${window.location.origin}/${username}`;
        navigator.clipboard.writeText(profileUrl)
            .then(() => {
                alert('Profile link copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    if (loading) return <div className="p-10">Loading...</div>;
    if (notFound) return <div className="p-6 text-red-600">User not found 😢</div>;

    const fontStyle = { fontFamily: profile.font || 'sans-serif' };
    const themeClass = themeBackgrounds[profile.theme] || 'bg-gray-50';

    return (
        <div className={`min-h-screen flex flex-col items-center ${themeClass} text-black p-4`} style={fontStyle}>
            <Helmet>
                <title>{profile.username}'s Profile</title>
                <meta name="description" content={`Visit the profile of ${profile.username}`} />
                <meta property="og:title" content={`${profile.username}'s Profile`} />
                <meta property="og:description" content={`Tap a link to connect with ${profile.username}.`} />
                <meta property="og:image" content={profile.profilePic || 'default-avatar.png'} />
                <meta property="og:url" content={`https://yourapp.com/${profile.username}`} />
            </Helmet>

            <div className="flex flex-col items-center mb-6">
                <UserCircleIcon className="w-24 h-24 text-gray-400 mb-2" />
                <h1 className="text-2xl font-bold">@{profile.username}</h1>
                <p className="text-gray-600 text-sm">Tap a link to connect</p>
                <button
                    onClick={handleShare}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                >
                    Share Profile
                </button>
            </div>

            <div className="w-full max-w-md space-y-4">
                {Object.entries(profile.links || {}).map(([key, url]) => (
                    <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-white text-black text-center px-4 py-3 rounded-xl shadow hover:bg-gray-100 transition"
                    >
                        {socialPlatforms[key]?.icon}{socialPlatforms[key]?.label || key}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default PublicProfile;
