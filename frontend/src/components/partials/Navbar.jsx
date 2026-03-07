import { Link } from "react-router-dom";
import { Monitor } from "lucide-react";

export default function Navbar({ user }) {
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-[100]">
            <div className="bg-[#0f0b29]/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                <div className="flex-1">
                    <Link to="/" className="font-bold text-xl tracking-wide text-white flex items-center gap-3 hover:opacity-80 transition-opacity uppercase">
                        <Monitor className="w-6 h-6 text-white" />
                        DIGITECH
                    </Link>
                </div>

                <div className="flex items-center gap-6 text-white/90 text-sm font-medium">
                    {user ? (
                        <div className="flex-none ml-2 flex items-center gap-2">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white h-8 w-8 min-h-0">
                                    <div className="indicator">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                                        <span className="badge badge-sm indicator-item bg-[oklch(0.58_0.23_277.12)] border-none text-white w-4 h-4 text-[10px] p-0 flex items-center justify-center">8</span>
                                    </div>
                                </div>
                                <div
                                    tabIndex={0}
                                    className="card card-compact dropdown-content bg-[#0f0b29]/95 backdrop-blur-md border border-white/10 z-[100] mt-4 w-52 shadow-xl">
                                    <div className="card-body">
                                        <span className="text-lg font-bold text-white">8 Items</span>
                                        <span className="text-white/70">Subtotal: $999</span>
                                        <div className="card-actions">
                                            <button className="bg-[oklch(0.58_0.23_277.12)] hover:bg-[oklch(0.50_0.23_277.12)] text-white w-full py-2 rounded-lg text-sm font-medium transition-colors mt-2">View cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar h-8 w-8 min-h-0">
                                    <div className="w-8 rounded-full border border-[oklch(0.58_0.23_277.12)]">
                                        <img
                                            alt="User Avatar"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <ul
                                    tabIndex="-3"
                                    className="menu menu-sm dropdown-content bg-white rounded-box z-[100] mt-4 w-48 p-2 shadow-lg border border-gray-100">
                                    <li>
                                        <Link to={'/profile'} className="justify-between text-black hover:bg-slate-100">
                                            Profile
                                        </Link>
                                    </li>
                                    <li><Link className="text-red-600 hover:bg-red-50">Logout</Link></li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-3 ml-2 pl-4">
                            <Link to="/login" className="hover:text-white transition-colors py-1.5">Login</Link>
                            <Link to="/register" className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full transition-colors border border-white/10">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}