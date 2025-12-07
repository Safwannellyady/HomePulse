import React, { useState } from 'react';
import ApplianceCard from '../components/appliances/ApplianceCard';
import AddApplianceModal from '../components/appliances/AddApplianceModal';
import { Plus } from 'lucide-react';
import { useAppliances } from '../context/ApplianceContext';

const Appliances = () => {
    const { appliances, toggleAppliance } = useAppliances();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleToggle = (id, state) => {
        toggleAppliance(id, state);
    };

    return (
        <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Connected Devices</h2>
                    <p className="text-gray-400">Manage and automate your home appliances.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="p-3 bg-neon-blue/10 text-neon-blue border border-neon-blue/50 rounded-xl hover:bg-neon-blue hover:text-black transition-all flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    <span className="hidden md:inline font-medium">Add Device</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {appliances.map(app => (
                    <ApplianceCard key={app.id} appliance={app} onToggle={handleToggle} />
                ))}
            </div>

            <AddApplianceModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </div>
    );
};

export default Appliances;
