import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DemoControls from '../common/DemoControls';

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-transparent text-white font-sans selection:bg-neon-blue/30 overflow-x-hidden">
            <Sidebar />

            <div className="pl-20 lg:pl-64 flex flex-col min-h-screen">
                <Header />

                <main className="flex-1 p-6 lg:p-10 relative">
                    {/* Background Atmosphere */}
                    <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
                        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[120px]"></div>
                        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[120px]"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
            <DemoControls />
        </div>
    );
};

export default DashboardLayout;
