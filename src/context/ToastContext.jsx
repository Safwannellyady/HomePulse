import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-24 right-6 z-50 flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            layout
                            className={`pointer-events-auto min-w-[300px] p-4 rounded-xl shadow-2xl backdrop-blur-md border border-white/10 flex items-start gap-3 
                                ${toast.type === 'success' ? 'bg-green-900/80 text-green-100' :
                                    toast.type === 'error' ? 'bg-red-900/80 text-red-100' :
                                        'bg-gray-800/90 text-white'}`}
                        >
                            <div className="mt-0.5">
                                {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-400" />}
                                {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
                                {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-sm">{toast.message}</p>
                            </div>
                            <button onClick={() => removeToast(toast.id)} className="text-white/50 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
