import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'

const socialPlatforms = {
    instagram: 'Instagram',
    tiktok: 'TikTok',
    facebook: 'Facebook',
    twitter: 'Twitter',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp'
}

const PublicProfile = () => {
    const { username } = useParams()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            const usersRef = collection(db, 'users')
            const q = query(usersRef, where('username', '==', username))
            const snapshot = await getDocs(q)

            if (!snapshot.empty) {
                const data = snapshot.docs[0].data()
                setProfile(data)
            } else {
                setNotFound(true)
            }
            setLoading(false)
        }

        fetchUser()
    }, [username])

    if (loading) return <div className="p-6">Loading...</div>
    if (notFound) return <div className="p-6 text-red-600">User not found 😢</div>

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
            <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gray-300 shadow mb-2" />
                <h1 className="text-2xl font-bold">@{profile.username}</h1>
                <p className="text-gray-600 text-sm">Tap a link to connect</p>
            </div>

            <div className="w-full max-w-md space-y-4">
                {Object.entries(profile.links || {}).map(([key, url]) => (
                    <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white text-center px-4 py-3 rounded-xl shadow hover:bg-gray-100 transition"
                    >
                        {socialPlatforms[key] || key}
                    </a>
                ))}
            </div>
        </div>
    )
}

export default PublicProfile
