import { useParams } from 'react-router-dom'

const PublicProfile = () => {
    const { username } = useParams()

    return (
        <div className="text-center mt-20">
            <h1 className="text-3xl font-bold">Welcome to {username}'s page</h1>
            <p className="text-gray-600 mt-2">This is a public profile. Links will show here.</p>
        </div>
    )
}

export default PublicProfile
