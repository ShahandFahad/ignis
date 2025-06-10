'use client'

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

// Context types
export type User = {
    createdAt: string;
    password: string;
    updatedAt: string;
    username: string;
    __v: number;
    _id: string;
}
type AuthContextType = {
    user: User | null;
    register: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    isUserLoggedIn: () => React.ReactNode;
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

        const username = email;
        // login request
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        });

        // get response result
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            router.push('/');
        } else {
            alert(data.error || 'Login failed');
        }
    }


    // Register user
    const register = async (email: string, password: string) => {

        const username = email;
        // register request
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        });

        // get response result
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            router.push('/');
        } else {
            alert(data.error || 'Registeration failed');
        }
    }

    // Check if user exists or not
    const isUserLoggedIn = () => {
        const userInfo = localStorage.getItem('user');
        if (!userInfo) {
            router.push('/auth')
        }

        return <p className="text-red-500 text-2xl">Redirecting to auth...</p>
    }

    // Logout user
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth');
    }


    return (
        <AuthContext.Provider value={{ user, register, login, isUserLoggedIn, logout }}>
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
