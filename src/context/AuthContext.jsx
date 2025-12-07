import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { name, email, isPremium, provider, meterId, walletBalance }
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted session
        const storedUser = localStorage.getItem('homepulse_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock Login
        const mockUser = {
            name: 'Safwan',
            email,
            isPremium: true,
            provider: 'MESCOM',
            meterId: 'KA-5692-BLR',
            walletBalance: 1250.50
        };
        setUser(mockUser);
        localStorage.setItem('homepulse_user', JSON.stringify(mockUser));
        return true;
    };

    const signup = (userData) => {
        // Mock Signup - initiates onboarding flow normally, but here we just set user
        const newUser = {
            ...userData,
            isPremium: false,
            walletBalance: 0
        };
        setUser(newUser);
        localStorage.setItem('homepulse_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('homepulse_user');
    };

    const updateWallet = (amount) => {
        const updatedUser = { ...user, walletBalance: user.walletBalance + amount };
        setUser(updatedUser);
        localStorage.setItem('homepulse_user', JSON.stringify(updatedUser));
    };

    const upgradeSubscription = () => {
        const updatedUser = { ...user, isPremium: true };
        setUser(updatedUser);
        localStorage.setItem('homepulse_user', JSON.stringify(updatedUser));
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        updateWallet,
        upgradeSubscription
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
