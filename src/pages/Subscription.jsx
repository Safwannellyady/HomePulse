import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Check, Star, Zap, Shield, Smartphone } from 'lucide-react';

const Subscription = () => {
    const { user, upgradeSubscription } = useAuth();

    React.useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
        script.dataset.payment_button_id = 'pl_RpCWbSA65mppqj';
        script.async = true;

        const form = document.getElementById('razorpay-form');
        if (form) {
            form.appendChild(script);
        }

        return () => {
            // Cleanup if needed (though Razorpay scripts are tricky to cleanup perfectly)
            if (form && form.contains(script)) {
                form.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="animate-fade-in-up">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-2">Upgrade to Premium</h2>
                <p className="text-gray-400">Unlock advanced analytics, auto-scheduling, and priority support.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Basic Plan */}
                <div className="bg-glass-surface border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all opacity-80">
                    <h3 className="text-xl font-bold text-white mb-2">Basic</h3>
                    <p className="text-gray-400 mb-6">Essential monitoring for your home.</p>
                    <div className="text-3xl font-bold text-white mb-8">Free</div>

                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-3 text-gray-300">
                            <Check className="w-5 h-5 text-green-400" />
                            Real-time Monitoring
                        </li>
                        <li className="flex items-center gap-3 text-gray-300">
                            <Check className="w-5 h-5 text-green-400" />
                            Up to 5 Devices
                        </li>
                        <li className="flex items-center gap-3 text-gray-300">
                            <Check className="w-5 h-5 text-green-400" />
                            Basic Bill Estimates
                        </li>
                        <li className="flex items-center gap-3 text-gray-500 line-through">
                            <Check className="w-5 h-5 text-gray-600" />
                            Smart Scheduling
                        </li>
                    </ul>

                    <button className="w-full py-3 rounded-xl border border-white/10 text-white cursor-default bg-white/5">
                        Current Plan
                    </button>
                </div>

                {/* Premium Plan */}
                <div className={`bg-gradient-to-br from-neon-blue/10 to-purple-600/10 border ${user?.isPremium ? 'border-green-500' : 'border-neon-blue'} rounded-3xl p-8 relative overflow-hidden transform hover:-translate-y-2 transition-transform duration-300`}>
                    <div className="absolute top-0 right-0 bg-neon-blue text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                        POPULAR
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        Premium <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </h3>
                    <p className="text-gray-400 mb-6">Full power for smart homes.</p>
                    <div className="text-3xl font-bold text-white mb-8">₹199<span className="text-sm font-medium text-gray-500">/mo</span></div>

                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-3 text-white">
                            <div className="p-1 bg-neon-blue/20 rounded-full"><Zap className="w-3 h-3 text-neon-blue" /></div>
                            Smart Scheduling & Automation
                        </li>
                        <li className="flex items-center gap-3 text-white">
                            <div className="p-1 bg-neon-blue/20 rounded-full"><Smartphone className="w-3 h-3 text-neon-blue" /></div>
                            Unlimited Devices
                        </li>
                        <li className="flex items-center gap-3 text-white">
                            <div className="p-1 bg-neon-blue/20 rounded-full"><Shield className="w-3 h-3 text-neon-blue" /></div>
                            Advanced Analytics & Reports
                        </li>
                    </ul>

                    {user?.isPremium ? (
                        <button className="w-full py-3 rounded-xl bg-green-500 text-black font-bold flex items-center justify-center gap-2 cursor-default">
                            <Check className="w-5 h-5" /> Active
                        </button>
                    ) : (
                        <form id="razorpay-form"></form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Subscription;
