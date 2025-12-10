import { render, screen, waitFor } from '@testing-library/react';
import LiveMonitor from './LiveMonitor';
import { useSimulation } from '../../context/SimulationContext';
import { useAppliances } from '../../context/ApplianceContext';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the hooks
vi.mock('../../context/SimulationContext');
vi.mock('../../context/ApplianceContext');

// Mock RealtimeGauge
vi.mock('./RealtimeGauge', () => ({
    default: () => "GaugeMock"
}));

describe('LiveMonitor', () => {
    beforeEach(() => {
        useSimulation.mockReturnValue({ loadOffset: 0 });
        useAppliances.mockReturnValue({ appliances: [] });
        global.fetch = vi.fn();
    });

    it('renders and displays initial state', () => {
        render(<LiveMonitor />);
        expect(screen.getByText('Live Monitor')).toBeInTheDocument();
        expect(screen.getByText('Current Load')).toBeInTheDocument();
    });

    it('fetches and updates metrics', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ voltage: 235, current: 4.5, power: 1.05, pf: 0.95 })
        });

        render(<LiveMonitor />);

        await waitFor(() => {
            // Check for mock text
            expect(screen.getByText('GaugeMock')).toBeInTheDocument();
            expect(screen.getByText('235')).toBeInTheDocument(); // Voltage
        });
    });
});
