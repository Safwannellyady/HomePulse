import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { initializePayment } from '../services/paymentService'; // Import standard service
import { Check, Star, Zap, Shield, Smartphone, Loader2 } from 'lucide-react';

const Subscription = () => {
    const { user, upgradeSubscription } = useAuth();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'

    const PLANS = {
        monthly: { price: 199, duration: 1, label: '/mo' },
        yearly: { price: 1999, duration: 12, label: '/yr', save: 'Save ₹389' }
    };

    const currentPlan = PLANS[billingCycle];

    const handleSubscribe = async () => {
        setLoading(true);
        try {
            await initializePayment(currentPlan.price, user, async (paymentResponse) => {
                console.log("Payment Verified Client-Side:", paymentResponse.razorpay_payment_id);
                // Activate subscription for the selected duration
                await upgradeSubscription(currentPlan.duration);
                showToast(`Premium Activated for ${currentPlan.duration} Month${currentPlan.duration > 1 ? 's' : ''}!`, "success");
            });
        } catch (error) {
            console.error("Subscription Error:", error);
            showToast("Payment failed or cancelled.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in-up">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Upgrade to Premium</h2>
                <p className="text-gray-400 mb-8">Unlock advanced analytics, auto-scheduling, and priority support.</p>

                {/* Billing Toggle */}
                <div className="inline-flex bg-white/5 p-1 rounded-xl border border-white/10 relative">
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${billingCycle === 'monthly' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingCycle('yearly')}
                        className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Yearly
                        <span className="text-[10px] bg-green-500 text-black px-1.5 py-0.5 rounded-full font-bold">SAVE 17%</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Basic Plan (Free) */}
                <div className="bg-glass-surface border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all opacity-80 flex flex-col">
                    <div className="mb-auto">
                        <h3 className="text-xl font-bold text-white mb-2">Basic</h3>
                        <p className="text-gray-400 mb-6">Essential monitoring for your home.</p>
                        <div className="text-3xl font-bold text-white mb-8">Free</div>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-gray-300"><Check className="w-5 h-5 text-green-400" /> Real-time Monitoring</li>
                            <li className="flex items-center gap-3 text-gray-300"><Check className="w-5 h-5 text-green-400" /> Up to 5 Devices</li>
                            <li className="flex items-center gap-3 text-gray-300"><Check className="w-5 h-5 text-green-400" /> Basic Bill Estimates</li>
                            <li className="flex items-center gap-3 text-gray-500 line-through"><Check className="w-5 h-5 text-gray-600" /> Smart Scheduling</li>
                        </ul>
                    </div>

                    <button className="w-full py-3 rounded-xl border border-white/10 text-white cursor-default bg-white/5 font-semibold">
                        Your Default Plan
                    </button>
                </div>

                {/* Premium Plan (Dynamic) */}
                <div className={`bg-gradient-to-br from-neon-blue/10 to-purple-600/10 border ${user?.isPremium ? 'border-green-500' : 'border-neon-blue'} rounded-3xl p-8 relative overflow-hidden transform transition-all duration-300 flex flex-col ${!user?.isPremium && 'hover:-translate-y-2'}`}>
                    {billingCycle === 'yearly' && !user?.isPremium && (
                        <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                            BEST VALUE
                        </div>
                    )}

                    <div className="mb-auto">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            Premium <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        </h3>
                        <p className="text-gray-400 mb-6">Full power for smart homes.</p>
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-4xl font-bold text-white">₹{currentPlan.price}</span>
                            <span className="text-lg font-medium text-gray-500">{currentPlan.label}</span>
                        </div>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 bg-neon-blue/20 rounded-full"><Zap className="w-3 h-3 text-neon-blue" /></div> Smart Scheduling & Automation
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 bg-neon-blue/20 rounded-full"><Smartphone className="w-3 h-3 text-neon-blue" /></div> Unlimited Devices
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 bg-neon-blue/20 rounded-full"><Shield className="w-3 h-3 text-neon-blue" /></div> Advanced Analytics & Reports
                            </li>
                        </ul>
                    </div>

                    {user?.isPremium ? (
                        <div className="space-y-3">
                            <button disabled className="w-full py-3 rounded-xl bg-green-500 text-black font-bold flex items-center justify-center gap-2 cursor-default opacity-90">
                                <Check className="w-5 h-5" /> Active
                            </button>
                            <p className="text-center text-xs text-green-400">
                                Valid until: {user?.subscriptionExpiry ? new Date(user.subscriptionExpiry).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                    ) : (
                        <button
                            onClick={handleSubscribe}
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-blue to-purple-600 text-white font-bold hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Upgrade Now'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Subscription;
