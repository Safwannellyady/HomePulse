import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ApplianceProvider } from './context/ApplianceContext'
import { SimulationProvider } from './context/SimulationContext'
import { ToastProvider } from './context/ToastContext'
import ErrorBoundary from './components/common/ErrorBoundary'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ToastProvider>
        <SimulationProvider>
          <AuthProvider>
            <ApplianceProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ApplianceProvider>
          </AuthProvider>
        </SimulationProvider>
      </ToastProvider>
    </ErrorBoundary>
  </StrictMode>,
)
