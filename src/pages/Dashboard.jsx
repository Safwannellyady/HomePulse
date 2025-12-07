import React from 'react';
import LiveMonitor from '../components/dashboard/LiveMonitor';
import CostEstimator from '../components/dashboard/CostEstimator';
import BudgetStatus from '../components/dashboard/BudgetStatus';
import ConsumptionGraph from '../components/dashboard/ConsumptionGraph';

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            <LiveMonitor />
            <CostEstimator />
            <BudgetStatus />

            <div className="lg:col-span-3 h-96">
                <ConsumptionGraph />
            </div>
        </div>
    );
};

export default Dashboard;
