import { db } from '../firebase';
import { doc, setDoc, getDoc, collection, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';

// User Profile
export const getUserProfile = async (uid) => {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
};

export const saveUserProfile = async (uid, data) => {
    await setDoc(doc(db, 'users', uid), data, { merge: true });
};

// Bill Integration (Mocking real utility API by storing/fetching from Firestore)
export const fetchBill = async (provider, consumerId) => {
    // In a real app, this would call an Edge Function or Utility API.
    // Here we simulate it or check if we have a "mock bill" stored.

    // Simulate API delay
    await new Promise(r => setTimeout(r, 1500));

    // Return mock data for demo purposes, but this function signature is ready for real API
    return {
        amount: Math.floor(Math.random() * 2000) + 500, // Random amount 500-2500
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
        status: 'Unpaid',
        provider,
        consumerId
    };
};

// Device Registry
export const getUserDevices = async (uid) => {
    const querySnapshot = await getDocs(collection(db, 'users', uid, 'devices'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addDevice = async (uid, device) => {
    // Add to subcollection
    const devicesRef = collection(db, 'users', uid, 'devices');
    await setDoc(doc(devicesRef), device);
};
