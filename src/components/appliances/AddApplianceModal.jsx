import React, { useState } from 'react';
import { Plus, Tv, Wind, Thermometer, Box, Smartphone, Speaker } from 'lucide-react';
import Modal from '../common/Modal';
import { useAppliances } from '../../context/ApplianceContext';

const AddApplianceModal = ({ isOpen, onClose }) => {
    const { addAppliance } = useAppliances();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('Living Room');
    const [type, setType] = useState('AC');
    const [consumption, setConsumption] = useState(1.5); // Default 1.5 kW for AC

    // Update default consumption based on type
    const handleTypeChange = (newType) => {
        setType(newType);
        switch (newType) {
            case 'AC': setConsumption(1.5); break;
            case 'TV': setConsumption(0.15); break;
            case 'Geyser': setConsumption(2.0); break;
            case 'Fridge': setConsumption(0.3); break;
            case 'Fan': setConsumption(0.075); break;
            case 'Light': setConsumption(0.02); break;
            default: setConsumption(0.1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addAppliance({
            name,
            location,
            type,
            consumption: parseFloat(consumption)
        });
        onClose();
        // Reset form
        setName('');
        setLocation('Living Room');
        setType('AC');
        setConsumption(1.5);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Smart Device">
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Device Name</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g., Bedroom AC"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue outline-none transition-colors"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Device Type</label>
                        <div className="relative">
                            <select
                                value={type}
                                onChange={(e) => handleTypeChange(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue outline-none appearance-none cursor-pointer transition-colors"
                            >
                                <option value="AC">Air Conditioner</option>
                                <option value="TV">Smart TV</option>
                                <option value="Geyser">Water Heater</option>
                                <option value="Fridge">Refrigerator</option>
                                <option value="Fan">Ceiling Fan</option>
                                <option value="Light">Smart Light</option>
                                <option value="Speaker">Speaker</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                ▼
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Power Rating (kW)</label>
                        <input
                            type="number"
                            step="0.001"
                            min="0"
                            required
                            value={consumption}
                            onChange={(e) => setConsumption(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue outline-none transition-colors"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-2">Room / Location</label>
                    <div className="relative">
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue outline-none appearance-none cursor-pointer transition-colors"
                        >
                            <option>Living Room</option>
                            <option>Master Bedroom</option>
                            <option>Kids Bedroom</option>
                            <option>Kitchen</option>
                            <option>Bathroom</option>
                            <option>Office</option>
                            <option>Balcony</option>
                            <option>Garage</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            ▼
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-neon-blue to-blue-600 text-white font-bold hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all transform hover:scale-[1.02]"
                >
                    Add Device Integration
                </button>
            </form>
        </Modal>
    );
};

export default AddApplianceModal;
