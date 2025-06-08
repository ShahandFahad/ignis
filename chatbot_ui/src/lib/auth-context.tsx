'use client'

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

// Context types
type User = { name: string; email: string; };
type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

// Define auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);


// Auth provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();


    useEffect(() => {
        // get user from local storage
        const userInfo = localStorage.getItem('user');
        if (userInfo) setUser(JSON.parse(userInfo));
    }, []);


    // Login user
    const login = async (email: string, password: string) => {

        // login request
        const res = await fetch(`${process.env.SERVER_URI}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        // get response result
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', data.user);
            router.push('/');
        } else {
            alert(data.error || 'Login failed');
        }
    }

    // Logout user
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};


// use auth hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth hook must be used inside AuthProvider');

    return context;
}
