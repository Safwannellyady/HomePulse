export const login = async (req, res) => {
    const { email, password } = req.body;

    // Mock Authentication Logic
    if (email === 'demo@homepulse.app' && password === 'demo123') {
        return res.status(200).json({
            success: true,
            token: 'mock-jwt-token-xyz-123',
            user: {
                id: 'user-001',
                name: 'Demo User',
                email: 'demo@homepulse.app',
                role: 'user'
            }
        });
    }

    // Guest Login
    if (email === 'guest@homepulse.app') {
        return res.status(200).json({
            success: true,
            token: 'guest-token-abc-789',
            user: {
                id: 'guest-user',
                name: 'Guest User',
                email: 'guest@homepulse.app',
                role: 'guest'
            }
        });
    }

    return res.status(401).json({ success: false, message: 'Invalid credentials' });
};
