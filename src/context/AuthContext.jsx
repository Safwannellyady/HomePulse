import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getUserProfile, saveUserProfile } from '../services/db';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Fetch Profile from Firestore
                let profile = await getUserProfile(firebaseUser.uid);

                if (!profile) {
                    // New User: Create default profile
                    profile = {
                        isPremium: false,
                        provider: null,
                        meterId: null,
                        walletBalance: 0,
                        createdAt: new Date().toISOString()
                    };
                    await saveUserProfile(firebaseUser.uid, profile);
                }

                setUser({
                    uid: firebaseUser.uid,
                    name: firebaseUser.displayName,
                    email: firebaseUser.email,
                    photoURL: firebaseUser.photoURL,
                    ...profile
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            return { success: true };
        } catch (error) {
            console.error("Google Sign In Error", error);
            return { success: false, error: error.message };
        }
    };

    const loginGuest = () => {
        const guestUser = {
            uid: 'guest-' + Date.now(),
            name: 'Guest User',
            email: 'guest@homepulse.app',
            photoURL: null,
            isPremium: false,
            walletBalance: 1000,
            provider: 'BESCOM'
        };
        setUser(guestUser);
        // Persist guest session locally only
        localStorage.setItem(`homepulse_user_guest`, JSON.stringify(guestUser));
        return true;
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        localStorage.removeItem(`homepulse_user_guest`);
    };

    // Update Wallet in Firestore
    const updateWallet = async (amount) => {
        if (!user) return;
        const newBalance = (user.walletBalance || 0) + amount;

        // Optimistic UI Update
        const updatedUser = { ...user, walletBalance: newBalance };
        setUser(updatedUser);

        // Save to Cloud
        await saveUserProfile(user.uid, { walletBalance: newBalance });
    };

    // Upgrade Subscription in Firestore
    const upgradeSubscription = async () => {
        if (!user) return;

        const updatedUser = { ...user, isPremium: true };
        setUser(updatedUser);

        await saveUserProfile(user.uid, { isPremium: true });
    };

    // Save Onboarding Data in Firestore
    const updateUserProfile = async (data) => {
        if (!user) return;

        const updatedUser = { ...user, ...data };
        setUser(updatedUser);

        await saveUserProfile(user.uid, data);
    };

    const value = {
        user,
        loading,
        loginWithGoogle,
        logout,
        updateWallet,
        upgradeSubscription,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
