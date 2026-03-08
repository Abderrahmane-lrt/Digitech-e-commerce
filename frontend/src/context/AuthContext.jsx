import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user on mount
    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async () => {
        try {
            const res = await api.get('/api/user');
            setUser(res.data);
        } catch {
            setUser(null);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    const login = async (formData) => {
        const res = await api.post('/api/login', formData);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return res;
    };

    const register = async (formData) => {
        const res = await api.post('/api/register', formData);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return res;
    };

    const logout = async () => {
        try {
            await api.post('/api/logout');
        } catch (e) {
            // ignore error on logout
        } finally {
            setUser(null);
            localStorage.removeItem('token');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
