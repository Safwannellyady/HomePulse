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

// IoT Device Integration
export const verifyIoTConnection = async (iotKey) => {
    // Simulate finding the device on the cloud
    await new Promise(r => setTimeout(r, 1200));

    // Validation: Check if key format is valid (e.g., must be > 6 chars)
    if (!iotKey || iotKey.length < 6) {
        return { success: false };
    }

    // Return mock initial data on success
    return {
        success: true,
        lastBill: {
            amount: 0, // Reset for new device
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: 'Synched',
        }
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
