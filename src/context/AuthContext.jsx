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
                try {
                    let profile = await getUserProfile(firebaseUser.uid);
                    if (!profile) {
                        profile = {
                            isPremium: false,
                            provider: null,
                            walletBalance: 0,

                            monthlyBudget: 1500,
                            transactionHistory: [],
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
                } catch (e) {
                    console.error("Error fetching user profile", e);
                }
            } else {
                // Restore Guest Session if exists
                const guestSession = localStorage.getItem('homepulse_user_guest');
                if (guestSession) {
                    try {
                        setUser(JSON.parse(guestSession));
                    } catch (e) {
                        console.error("Invalid guest session", e);
                        localStorage.removeItem('homepulse_user_guest');
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
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
            let message = "Failed to sign in via Google.";

            if (error.code === 'auth/popup-blocked') {
                message = "Pop-up blocked. Please allow pop-ups for this site.";
            } else if (error.code === 'auth/popup-closed-by-user') {
                message = "Sign-in cancelled.";
            } else if (error.code === 'auth/network-request-failed') {
                message = "Network error. Check your connection.";
            } else if (error.code === 'auth/account-exists-with-different-credential') {
                message = "Account exists with a different provider.";
            } else if (error.code === 'auth/operation-not-allowed') {
                message = "Google Sign-In is not enabled in Firebase Console.";
            } else if (error.message) {
                message = error.message;
            }

            return { success: false, error: message };
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
            monthlyBudget: 1500,
            transactionHistory: [
                { id: 1, type: 'Credit', desc: 'Welcome Bonus', amount: 1000, date: new Date().toISOString().split('T')[0], status: 'Success' }
            ],
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
    const updateWallet = async (amount, description = 'Wallet Top-up') => {
        if (!user) return;
        const newBalance = (user.walletBalance || 0) + amount;

        const newTransaction = {
            id: Date.now(),
            type: amount > 0 ? 'Credit' : 'Debit',
            desc: description,
            amount: Math.abs(amount),
            date: new Date().toISOString().split('T')[0],
            status: 'Success'
        };

        const updatedHistory = [newTransaction, ...(user.transactionHistory || [])];

        // Optimistic UI Update
        const updatedUser = { ...user, walletBalance: newBalance, transactionHistory: updatedHistory };
        setUser(updatedUser);

        // Guest Handling: Local Persistence Only
        if (user.uid.startsWith('guest-')) {
            localStorage.setItem('homepulse_user_guest', JSON.stringify(updatedUser));
            return;
        }

        // Save to Cloud
        await saveUserProfile(user.uid, { walletBalance: newBalance, transactionHistory: updatedHistory });
    };

    // Update Budget
    const updateBudget = async (newBudget) => {
        if (!user) return;
        const updatedUser = { ...user, monthlyBudget: newBudget };
        setUser(updatedUser);

        // Guest Handling: Local Persistence Only
        if (user.uid.startsWith('guest-')) {
            localStorage.setItem('homepulse_user_guest', JSON.stringify(updatedUser));
            return;
        }

        await saveUserProfile(user.uid, { monthlyBudget: newBudget });
    };

    // Upgrade Subscription in Firestore
    const upgradeSubscription = async (months = 1) => {
        if (!user) return;

        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + months);
        const isoExpiry = expiryDate.toISOString();

        const updatedUser = { ...user, isPremium: true, subscriptionExpiry: isoExpiry };
        setUser(updatedUser);

        // Guest Handling: Local Persistence Only
        if (user.uid.startsWith('guest-')) {
            localStorage.setItem('homepulse_user_guest', JSON.stringify(updatedUser));
            return;
        }

        await saveUserProfile(user.uid, { isPremium: true, subscriptionExpiry: isoExpiry });
    };

    // Save Onboarding Data in Firestore
    const updateUserProfile = async (data) => {
        if (!user) return;

        const updatedUser = { ...user, ...data };
        setUser(updatedUser);

        // Guest Handling: Local Persistence Only
        if (user.uid.startsWith('guest-')) {
            localStorage.setItem('homepulse_user_guest', JSON.stringify(updatedUser));
            return;
        }

        await saveUserProfile(user.uid, data);
    };

    const value = {
        user,
        loading,
        loginWithGoogle,
        loginGuest,
        logout,
        updateWallet,
        updateBudget,
        upgradeSubscription,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
