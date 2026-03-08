import { Link, useNavigate } from "react-router-dom";
import { Monitor, ShoppingBag } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getCart } from "../../api/services";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        if (user) {
            getCart().then(res => {
                const count = res.data.reduce((acc, item) => acc + item.quantity, 0);
                setCartCount(count);
            }).catch(() => setCartCount(0));
        } else {
            setCartCount(0);
        }
    }, [user]);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className={`fixed left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-[100] transition-all duration-300 top-6`}>
            <div className="bg-card/80 backdrop-blur-md border border-border rounded-full px-6 py-3 flex items-center justify-between shadow-xl">
                <div className="flex-1 flex items-center gap-8">
                    <Link to="/" className="font-bold text-xl tracking-wide text-foreground flex items-center gap-3 hover:opacity-80 transition-opacity uppercase">
                        <Monitor className="w-6 h-6 text-[oklch(0.58_0.23_277.12)]" />
                        DIGITECH
                    </Link>
                    
                    <div className="hidden md:flex items-center gap-6 text-sm font-bold  tracking-widest text-muted-foreground">
                        <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
                        {user && <Link to="/orders" className="hover:text-foreground transition-colors transition-all duration-300">Orders</Link>}
                    </div>
                </div>

                <div className="flex items-center gap-4 text-foreground text-sm font-medium">
                    {user ? (
                        <>
                            <Link to="/cart" className="relative p-2 hover:bg-muted rounded-full transition-colors group">
                                <ShoppingBag className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[oklch(0.58_0.23_277.12)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-background animate-in zoom-in-50 duration-300 shadow-lg shadow-[oklch(0.58_0.23_277.12)]/20">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar h-8 w-8 min-h-0 ml-2 border-0 focus:ring-2 focus:ring-primary/20">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/50 flex items-center justify-center text-primary font-black text-xs uppercase shadow-sm">
                                        {user.first_name?.[0]}{user.last_name?.[0]}
                                    </div>
                                </div>
                                 <ul tabIndex="-3" className="menu menu-md dropdown-content bg-card border border-border rounded-2xl z-[100] mt-4 p-2 shadow-2xl backdrop-blur-md min-w-[200px] transition-all duration-300">
                                    <div className="px-4 py-3 border-b border-border mb-2">
                                        <p className="text-sm text-foreground font-black truncate">{user.first_name} {user.last_name}</p>
                                        <p className="text-[10px] text-muted-foreground font-bold tracking-widest mt-0.5 opacity-60 truncate">{user.email}</p>
                                    </div>
                                    <li className="mb-1"><Link to="/profile" className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl py-2 px-4 transition-all duration-200 font-bold text-xs uppercase tracking-widest">Profile Settings</Link></li>
                                    <li className="mb-1"><Link to="/orders" className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl py-2 px-4 transition-all duration-200 font-bold text-xs uppercase tracking-widest">My Orders</Link></li>
                                    {user.role === 'admin' && (
                                        <li className="mb-1"><Link to="/admin" className="text-primary hover:bg-primary/10 rounded-xl py-2 px-4 transition-all duration-200 font-bold text-xs uppercase tracking-widest border border-primary/20 bg-primary/5">Admin Dashboard</Link></li>
                                    )}
                                    <div className="h-px bg-border my-2 mx-2"></div>
                                    <li><button onClick={handleLogout} className="text-red-500 hover:text-white hover:bg-red-500 rounded-xl py-2 px-4 transition-all duration-200 font-bold text-xs uppercase tracking-widest mt-1">Logout</button></li>
                                </ul>
                            </div>
                        </>
                    ) : (
                         <div className="flex gap-4 ml-2 pl-4 border-l border-border">
                            <Link to="/login" className="hover:text-primary transition-colors py-1.5 px-2 py-2.5 font-bold text-xs uppercase tracking-widest">Login</Link>
                            <Link to="/register" className="bg-primary hover:opacity-90 text-white px-6 py-2.5 rounded-full transition-all text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}