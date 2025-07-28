import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const Auth = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (isRegistering && password !== confirmPassword) {
            setError("Passwords don't match.");
            return;
        }

        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row transition-all">
                {/* Left Panel */}
                <div className="hidden md:block md:w-1/2 bg-blue-600 text-white p-8 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4 mt-20">Welcome to ShareIt.bio</h2>
                        <p className="text-lg leading-relaxed">One link. Every platform. Start building your online identity now.</p>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        {isRegistering ? 'Create Your Account' : 'Welcome Back'}
                    </h2>

                    {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-gray-700 mb-1">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute top-9 right-3 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                            </button>
                        </div>

                        {isRegistering && (
                            <div className="relative">
                                <label className="block text-gray-700 mb-1">Confirm Password</label>
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    placeholder="Re-enter your password"
                                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute top-9 right-3 text-gray-500"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                >
                                    {showConfirm ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                        >
                            {isRegistering ? 'Register' : 'Login'}
                        </button>
                    </form>

                    <div className="text-center mt-6 text-sm">
                        <span className="text-gray-600">
                            {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                        </span>
                        <button
                            type="button"
                            onClick={() => {
                                setIsRegistering(!isRegistering);
                                setError('');
                            }}
                            className="text-blue-600 font-medium ml-2 hover:underline transition"
                        >
                            {isRegistering ? 'Sign In' : 'Sign Up'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
