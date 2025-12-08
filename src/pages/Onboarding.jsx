import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchBill } from '../services/db';
import { CheckCircle, Zap, Building2, Hash, AlertCircle } from 'lucide-react';

const steps = [
    { title: 'Provider', desc: 'Select Utility' },
    { title: 'Connect', desc: 'Meter ID' },
    { title: 'Verify', desc: 'Connection' },
];

const Onboarding = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [provider, setProvider] = useState('');
    const [meterId, setMeterId] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState('');
    const { updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const handleNext = async () => {
        setError('');

        if (currentStep === 2) {
            setIsVerifying(true);
            try {
                // Simulate fetching bill from Utility API (via our DB service)
                const bill = await fetchBill(provider, meterId);

                if (bill) {
                    // Success: Save Meter Details to User Profile
                    await updateUserProfile({
                        provider,
                        meterId,
                        lastBill: bill
                    });
                    setCurrentStep(3);
                } else {
                    setError('Invalid Consumer ID. Please check your bill.');
                }
            } catch (err) {
                console.error(err);
                setError('Connection failed. Try again.');
            } finally {
                setIsVerifying(false);
            }
        } else if (currentStep === 3) {
            navigate('/dashboard');
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
            <div className="absolute inset-0 bg-radial-gradient from-neon-blue/5 to-transparent pointer-events-none"></div>

            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-12">
                {steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-colors ${currentStep > i + 1 ? 'bg-green-500 border-green-500 text-black' :
                            currentStep === i + 1 ? 'bg-neon-blue border-neon-blue text-black' : 'border-gray-600 text-gray-600'
                            }`}>
                            {currentStep > i + 1 ? <CheckCircle className="w-5 h-5" /> : i + 1}
                        </div>
                        <div className={`text-sm ${currentStep === i + 1 ? 'text-white' : 'text-gray-600'}`}>
                            {step.title}
                        </div>
                        {i < steps.length - 1 && <div className="w-8 h-px bg-gray-700"></div>}
                    </div>
                ))}
            </div>

            <div className="w-full max-w-lg bg-glass-surface border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl animate-fade-in-up min-h-[400px] flex flex-col">

                {/* Step 1: Provider Selection */}
                {currentStep === 1 && (
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-6">Select your Provider</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {['BESCOM', 'MESCOM', 'TATA POWER', 'ADANI'].map(p => (
                                <button
                                    key={p}
                                    onClick={() => setProvider(p)}
                                    className={`p-6 rounded-xl border flex flex-col items-center gap-3 transition-all ${provider === p
                                        ? 'bg-neon-blue/20 border-neon-blue text-white shadow-[0_0_15px_rgba(0,243,255,0.25)]'
                                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    <Building2 className="w-8 h-8" />
                                    <span className="font-semibold">{p}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Meter ID */}
                {currentStep === 2 && (
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-2">Connect Smart Meter</h2>
                        <p className="text-gray-400 mb-8">Enter the unique 10-digit consumer ID found on your bill.</p>

                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
                            <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">Consumer ID / Meter ID</label>
                            <div className="flex items-center gap-3">
                                <Hash className="text-neon-blue w-6 h-6" />
                                <input
                                    type="text"
                                    placeholder="KA-XXXX-XXXX"
                                    value={meterId}
                                    onChange={(e) => setMeterId(e.target.value)}
                                    className="bg-transparent border-none text-xl text-white focus:outline-none w-full font-mono uppercase"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded-xl mb-4 text-sm">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        {isVerifying && (
                            <div className="flex items-center gap-3 text-neon-blue justify-center py-4 bg-neon-blue/10 rounded-xl">
                                <span className="animate-spin">⌛</span> Verifying connection with {provider}...
                            </div>
                        )}
                    </div>
                )}

                {/* Step 3: Success */}
                {currentStep === 3 && (
                    <div className="flex-1 text-center py-10">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                            <Zap className="w-10 h-10 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Connection Successful!</h2>
                        <p className="text-gray-400">Your smart meter is now linked to HomePulse.</p>
                        <div className="mt-8 p-4 bg-white/5 rounded-xl text-left border border-white/10">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-500">Provider</span>
                                <span className="text-white">{provider}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Consumer ID</span>
                                <span className="text-white font-mono">{meterId}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleNext}
                        disabled={(currentStep === 1 && !provider) || (currentStep === 2 && !meterId) || isVerifying}
                        className="px-8 py-3 bg-neon-blue text-black font-bold rounded-xl hover:shadow-[0_0_20px_#00f3ff] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {currentStep === 3 ? 'Go to Dashboard' : 'Continue'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
