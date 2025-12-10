# HomePulse: Smart Metering Super App

HomePulse is a comprehensive dashboard for monitoring and optimizing home energy consumption. It integrates real-time smart meter data simulation, Time-of-Day (ToD) tariff optimization, and appliance control.

## 🚀 Features

- **Real-time Monitoring**: Visualize Voltage, Current, and Power usage dynamically.
- **Smart Analytics**: Consumption history with "Today", "Week", and "Month" views.
- **IoT Simulation**: Realistic server-side simulation of electrical load and active appliances.
- **Appliance Control**: Toggle appliances remotely and see immediate impact on power draw.
- **ToD Insights**: Intelligent recommendations to shift load to off-peak hours for cost savings.

## 🛠️ Architecture

The project consists of two main parts:

### 1. Backend (`/server`)
- Built with **Node.js** & **Express**.
- Simulates smart meter readings and maintains history.
- Provides REST APIs for Auth, Meter Data, Appliances, and Insights.
- Runs on Port `3001`.

### 2. Frontend (`/`)
- Built with **React**, **Vite**, and **TailwindCSS**.
- Proxies API requests to the backend.
- Features glassmorphism UI design.

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Start the Backend
```bash
cd server
npm install
npm start
```
The server will start on `http://localhost:3001`. You should see `IoT Simulation Started...` in the console.

### 2. Start the Frontend
Open a new terminal:
```bash
# Root directory
npm install
npm run dev
```
The application will be available at `http://localhost:5173`.

## 🧪 Testing

- **Linting**: `npm run lint` (in both root and server directories)
- **CI/CD**: GitHub Actions workflow is configured in `.github/workflows/ci.yml`.

## 📝 License
MIT
