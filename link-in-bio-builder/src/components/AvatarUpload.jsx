import { useState } from 'react';
import { storage } from '../firebase'; 

const AvatarUpload = ({ onUpload }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const storageRef = storage.ref(`avatars/${file.name}`);
        await storageRef.put(file);

        const downloadURL = await storageRef.getDownloadURL();
        onUpload(downloadURL); // Pass the URL to the parent
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
                Upload Avatar
            </button>
        </div>
    );
};

export default AvatarUpload;