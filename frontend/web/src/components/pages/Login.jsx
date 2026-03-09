import { Link, useNavigate } from 'react-router-dom';
import { Monitor, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(formData);
            toast.success('Welcome back!');
            navigate('/')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid email or password')
        }

    };

    return (
        <div className="fixed inset-0 z-[999] bg-[#030014]/80 backdrop-blur-lg font-geist flex items-center justify-center p-4 cursor-default">
            {/* Back to Home Link */}
            <Link
                to="/"
                className="absolute top-6 left-6 text-white/50 hover:text-white flex items-center gap-2 transition-colors z-50 bg-[#0f0b29]/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Home</span>
            </Link>

            
            <div className="w-full max-w-5xl h-[600px] flex rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10">
                {/* Left Side: Image / Branding */}
                <div className="hidden md:flex flex-col justify-between w-1/2 bg-[#0f0b29] p-12 relative overflow-hidden inner-shadow">
                    {/* Background Graphic/Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&h=1000&auto=format&fit=crop"
                            alt="Login background"
                            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-[oklch(0.58_0.23_277.12)]/10 mix-blend-overlay"></div>
                    </div>

                    <div className="relative z-10">
                        <Link to="/" className="font-bold text-2xl tracking-wide text-white flex items-center gap-3 uppercase">
                            <Monitor className="w-8 h-8 text-primary" />
                            DIGITECH
                        </Link>
                    </div>

                    <div className="relative z-10 text-white mt-auto">
                        <h2 className="text-3xl font-bold mb-4 drop-shadow-md">Welcome Back.</h2>
                        <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                            Access your personalized dashboard, track your latest orders, and discover new technology tailored just for you.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center relative shadow-2xl">
                    <div className="w-full max-w-md mx-auto relative z-10">
                        <div className="mb-10 text-center md:text-left">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Sign in to your account</h3>
                            <p className="text-gray-500 text-sm">
                                Enter your email and password to access your account.
                            </p>
                        </div>

                        <form className="space-y-5" method='post' onSubmit={handleSubmit} >
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder="you@example.com"
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-400"
                                    required
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-gray-700 text-sm font-medium">Password</label>
                                    <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                                </div>
                                <input
                                    type="password"
                                    name='password'
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-400"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:opacity-90 text-white font-semibold py-3.5 rounded-xl transition-all mt-4 shadow-lg shadow-primary/20"
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="mt-8 text-center bg-gray-50 border border-gray-100 p-4 rounded-xl">
                            <p className="text-sm text-gray-600">
                                Don't have an account yet?{' '}
                                <Link to="/register" className="text-primary font-medium hover:underline">
                                    Create one here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
