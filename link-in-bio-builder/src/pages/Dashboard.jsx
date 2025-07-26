import { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const socialPlatforms = [
    { id: 'instagram', label: 'Instagram', placeholder: 'yourusername' },
    { id: 'tiktok', label: 'TikTok', placeholder: '@yourname' },
    { id: 'facebook', label: 'Facebook', placeholder: 'yourname' },
    { id: 'twitter', label: 'Twitter', placeholder: 'yourhandle' },
    { id: 'telegram', label: 'Telegram', placeholder: 'yourchannel' },
    { id: 'whatsapp', label: 'WhatsApp', placeholder: '251912345678' }
]

const baseUrls = {
    instagram: 'https://instagram.com/',
    tiktok: 'https://tiktok.com/@',
    facebook: 'https://facebook.com/',
    twitter: 'https://twitter.com/',
    telegram: 'https://t.me/',
    whatsapp: 'https://wa.me/'
}

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [rawLinks, setRawLinks] = useState({})
    const [links, setLinks] = useState({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                const docRef = doc(db, 'users', currentUser.uid)
                const snap = await getDoc(docRef)
                if (snap.exists()) {
                    const data = snap.data()
                    setUsername(data.username || '')
                    setRawLinks(() => {
                        const raw = {}
                        for (const key in data.links || {}) {
                            raw[key] = extractUsername(data.links[key], key)
                        }
                        return raw
                    })
                    setLinks(data.links || {})
                }
            } else {
                navigate('/auth')
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const extractUsername = (url, platform) => {
        if (!url) return ''
        try {
            const prefix = baseUrls[platform]
            return url.replace(prefix, '').replace(/^@/, '')
        } catch {
            return ''
        }
    }

    const handleLinkChange = (platform, rawValue) => {
        const clean = rawValue.trim().replace(/^@/, '')
        const fullLink = clean.startsWith('http') ? clean : baseUrls[platform] + clean
        setRawLinks({ ...rawLinks, [platform]: rawValue })
        setLinks({ ...links, [platform]: fullLink })
    }

    const saveProfile = async () => {
        if (!username.trim()) return alert('Username is required')
        const docRef = doc(db, 'users', user.uid)
        await setDoc(docRef, {
            username: username.trim(),
            links
        })
        alert('Profile saved!')
    }

    if (loading) return <div className="p-6">Loading...</div>

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6">
            {/* Form Panel */}
            <div className="w-full md:w-1/2">
                <h2 className="text-xl font-bold mb-4">Edit Your Profile</h2>

                <label className="block mb-2 font-medium">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="yourname"
                    className="w-full p-2 border rounded mb-4"
                />

                {socialPlatforms.map(({ id, label, placeholder }) => (
                    <div key={id} className="mb-4">
                        <label className="block mb-1">{label}</label>
                        <input
                            type="text"
                            value={rawLinks[id] || ''}
                            onChange={(e) => handleLinkChange(id, e.target.value)}
                            placeholder={placeholder}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                ))}

                <button
                    onClick={saveProfile}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Save Profile
                </button>
            </div>

            {/* Live Preview */}
            <div className="w-full md:w-1/2 bg-gray-50 p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-4 text-center">Live Preview</h2>
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-300 mb-2" />
                    <h3 className="text-lg font-semibold mb-4">@{username || 'username'}</h3>
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
                            ) : null
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
