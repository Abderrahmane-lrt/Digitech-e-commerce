import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { User, Mail, Shield, Calendar, Moon, Sun, Edit, Save, X, Trash2 } from "lucide-react";
import { useState } from "react";
import { updateProfile, deleteAccount } from "../../api/services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const { user, setUser, logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        password: "",
        password_confirmation: ""
    });

    if (!user) return null;

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataToUpdate = { ...formData };
            if (!dataToUpdate.password) {
                delete dataToUpdate.password;
                delete dataToUpdate.password_confirmation;
            }
            
            const res = await updateProfile(dataToUpdate);
            setUser(res.data.user);
            toast.success("Profile updated successfully");
            setIsEditing(false);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you absolutely sure you want to delete your account? This action cannot be undone.")) return;
        
        try {
            await deleteAccount();
            toast.success("Account deleted successfully");
            await logout();
            navigate("/");
        } catch (err) {
            toast.error("Failed to delete account");
        }
    };

    return (
        <div className="bg-background min-h-screen font-geist pt-28 pb-20 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-wide">Account Settings</h1>
                        <p className="text-muted-foreground mt-2">Manage your personal information and security preferences.</p>
                    </div>
                    {!isEditing && (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 bg-primary/10 text-primary px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-primary/20 transition-all border border-primary/20"
                        >
                            <Edit className="w-4 h-4" />
                            Edit Profile
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left: Brief Info */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-card border border-border rounded-3xl p-8 text-center shadow-sm">
                            <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary font-bold text-2xl mx-auto mb-4 uppercase">
                                {user.first_name?.[0]}{user.last_name?.[0]}
                            </div>
                            <h2 className="text-xl font-bold text-foreground">{user.first_name} {user.last_name}</h2>
                            <p className="text-muted-foreground text-sm capitalize">{user.role}</p>
                        </div>

                        {/* Theme Selection */}
                        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-widest">Appearance</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button 
                                    onClick={() => setTheme('light')}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${theme === 'light' ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background text-muted-foreground hover:bg-muted'}`}
                                >
                                    <Sun className="w-5 h-5" />
                                    <span className="text-xs font-bold">Light</span>
                                </button>
                                <button 
                                    onClick={() => setTheme('dark')}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${theme === 'dark' ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background text-muted-foreground hover:bg-muted'}`}
                                >
                                    <Moon className="w-5 h-5" />
                                    <span className="text-xs font-bold">Dark</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Detailed Form/Info */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-primary" />
                                Personal Information
                            </h3>

                            {isEditing ? (
                                <form onSubmit={handleUpdate} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-muted-foreground text-[10px] font-black uppercase tracking-widest mb-2">First Name</label>
                                            <input 
                                                type="text"
                                                value={formData.first_name}
                                                onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                                                className="w-full bg-muted/50 border border-border px-4 py-3 rounded-xl text-foreground font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/30"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-muted-foreground text-[10px] font-black uppercase tracking-widest mb-2">Last Name</label>
                                            <input 
                                                type="text"
                                                value={formData.last_name}
                                                onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                                                className="w-full bg-muted/50 border border-border px-4 py-3 rounded-xl text-foreground font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/30"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-muted-foreground text-[10px] font-black uppercase tracking-widest mb-2">Email Address</label>
                                        <input 
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="w-full bg-muted/50 border border-border px-4 py-3 rounded-xl text-foreground font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/30"
                                            required
                                        />
                                    </div>

                                    <div className="h-px bg-border my-2"></div>

                                    <div>
                                        <label className="block text-muted-foreground text-[10px] font-black uppercase tracking-widest mb-2">New Password (Empty to keep current)</label>
                                        <input 
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                                            className="w-full bg-muted/50 border border-border px-4 py-3 rounded-xl text-foreground font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/30"
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-muted-foreground text-[10px] font-black uppercase tracking-widest mb-2">Confirm New Password</label>
                                        <input 
                                            type="password"
                                            value={formData.password_confirmation}
                                            onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                                            className="w-full bg-muted/50 border border-border px-4 py-3 rounded-xl text-foreground font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/30"
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    <div className="flex items-center gap-3 pt-2">
                                        <button 
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 bg-primary hover:opacity-90 text-white py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            <Save className="w-4 h-4" />
                                            {loading ? 'Saving...' : 'Save Changes'}
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="bg-muted hover:bg-muted/80 text-foreground px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-border"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-1">First Name</label>
                                            <div className="bg-muted border border-border/50 px-4 py-3 rounded-xl text-foreground font-medium">
                                                {user.first_name}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-1">Last Name</label>
                                            <div className="bg-muted border border-border/50 px-4 py-3 rounded-xl text-foreground font-medium">
                                                {user.last_name}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-1">Email Address</label>
                                        <div className="flex items-center gap-2 bg-muted border border-border/50 px-4 py-3 rounded-xl text-foreground font-medium">
                                            <Mail className="w-4 h-4 text-muted-foreground" />
                                            {user.email}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-1">Account Role</label>
                                        <div className="flex items-center gap-2 bg-muted border border-border/50 px-4 py-3 rounded-xl text-foreground font-medium capitalize">
                                            <Shield className="w-4 h-4 text-muted-foreground" />
                                            {user.role}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-1">Joined Since</label>
                                        <div className="flex items-center gap-2 bg-muted border border-border/50 px-4 py-3 rounded-xl text-foreground font-medium">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-3xl p-8">
                            <h3 className="text-lg font-bold text-red-900 dark:text-red-400 mb-2">Danger Zone</h3>
                            <p className="text-red-700/70 dark:text-red-400/60 text-sm mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                            <button 
                                onClick={handleDeleteAccount}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" />
                                Deactivate Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
