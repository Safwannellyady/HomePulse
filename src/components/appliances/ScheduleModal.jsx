import React from 'react';
import Modal from '../common/Modal';
import { Clock } from 'lucide-react';

const ScheduleModal = ({ isOpen, onClose, applianceName }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Schedule ${applianceName}`}>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Start Time</label>
                    <div className="flex gap-2">
                        <input
                            type="time"
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:outline-none transition-colors"
                            defaultValue="22:00"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-2">Duration</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:outline-none transition-colors">
                        <option>30 mins</option>
                        <option>1 hour</option>
                        <option>2 hours</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-2">Repeat</label>
                    <div className="flex gap-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                            <button
                                key={i}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${i === 1 || i === 3 ? 'bg-neon-blue text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pt-4 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl bg-neon-blue text-black font-semibold hover:bg-[#00d0db] transition-colors shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                    >
                        Save Schedule
                    </button>
                </div>

                <div className="bg-neon-blue/10 border border-neon-blue/20 p-3 rounded-xl flex gap-3 items-start">
                    <Clock className="w-5 h-5 text-neon-blue shrink-0 mt-0.5" />
                    <p className="text-xs text-neon-blue/80">
                        Tip: Scheduling this appliance after 10 PM can save you approx ₹250/month on current tariff rates.
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default ScheduleModal;
