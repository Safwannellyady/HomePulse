import React, { useState } from 'react';
import { Plus, Tv, Wind, Thermometer, Box, Smartphone, Speaker } from 'lucide-react';
import Modal from '../common/Modal';
import { useAppliances } from '../../context/ApplianceContext';

const AddApplianceModal = ({ isOpen, onClose }) => {
    const { addAppliance } = useAppliances();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('Living Room');
    const [type, setType] = useState('AC');
    const [consumption, setConsumption] = useState(1.0);

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
        setConsumption(1.0);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Device">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Device Name</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g., Bedroom Fan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue outline-none"
                        >
                            <option value="AC">AC</option>
                            <option value="TV">TV</option>
                            <option value="Geyser">Geyser</option>
                            <option value="Fridge">Refrigerator</option>
                            <option value="Speaker">Speaker</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Power (kW)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={consumption}
                            onChange={(e) => setConsumption(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-2">Location</label>
                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue outline-none"
                    >
                        <option>Living Room</option>
                        <option>Bedroom</option>
                        <option>Master Bedroom</option>
                        <option>Kitchen</option>
                        <option>Bathroom</option>
                        <option>Balcony</option>
                        <option>Office</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 mt-4 rounded-xl bg-neon-blue text-black font-bold hover:bg-[#00d0db] transition-colors"
                >
                    Add Device
                </button>
            </form>
        </Modal>
    );
};

export default AddApplianceModal;
