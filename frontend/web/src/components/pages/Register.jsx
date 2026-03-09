import { Link, useNavigate } from 'react-router-dom';
import { Monitor, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
    const { register, login } = useAuth();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
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
            await register(formData);
            toast.success('Account created successfully!');
            navigate('/')
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || 'Registration failed')
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

            <div className="w-full max-w-5xl h-[600px] flex rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10 flex-row-reverse">
                {/* Left (visually Right) Side: Image / Branding */}
                <div className="hidden md:flex flex-col justify-between w-1/2 bg-[#0f0b29] p-12 relative overflow-hidden inner-shadow">
                    {/* Background Graphic/Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&h=1000&auto=format&fit=crop"
                            alt="Register background"
                            className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-x-[-1]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-[oklch(0.58_0.23_277.12)]/10 mix-blend-overlay"></div>
                    </div>

                    <div className="relative z-10 flex justify-end">
                        <Link to="/" className="font-bold text-2xl tracking-wide text-white flex items-center gap-3 uppercase">
                            <Monitor className="w-8 h-8 text-primary" />
                            DIGITECH
                        </Link>
                    </div>

                    <div className="relative z-10 text-white mt-auto text-right">
                        <h2 className="text-3xl font-bold mb-4 drop-shadow-md">Join the Future.</h2>
                        <p className="text-white/70 text-sm leading-relaxed max-w-sm ml-auto">
                            Create a free account to unlock exclusive deals, save your favorite products, and experience ultra-fast checkout.
                        </p>
                    </div>
                </div>

                {/* Right (visually Left) Side: Form */}
                <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center relative shadow-2xl">
                    <div className="w-full max-w-md mx-auto relative z-10">
                        <div className="mb-8 text-center md:text-left">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Create an account</h3>
                            <p className="text-gray-500 text-sm">
                                Enter your details below to get started.
                            </p>
                        </div>

                        <form method='post' onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1.5">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="John"
                                        name='first_name'
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1.5">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        name='last_name'
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-400"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    name='email'
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1.5">Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    name='password'
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-400"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:opacity-90 text-white font-semibold py-3.5 rounded-xl transition-all mt-6 shadow-lg shadow-primary/20"
                            >
                                Create Account
                            </button>
                        </form>

                        <div className="mt-6 text-center bg-gray-50 border border-gray-100 p-4 rounded-xl">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-primary font-medium hover:underline">
                                    Sign in instead
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
