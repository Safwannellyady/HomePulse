
# HomePulse: Smart Metering Super App 🚀

HomePulse is a comprehensive dashboard for monitoring and optimizing home energy consumption. It integrates real-time smart meter data simulation, Time-of-Day (ToD) tariff optimization, and appliance control.

---

## 🤝 We Need Your Help (Open Source Contribution)!
We want to take HomePulse to the next level, and we are looking for public contributors to help build new features, squash bugs, and polish the user experience. Whether you are a frontend designer, backend developer, or technical writer, we have a place for you!

### 💡 Help Us & Get a New Project Idea!
To show our deep appreciation for your time, skills, and contribution:
* **Every contributor who submits a valid Pull Request (PR) or resolves an open issue will receive a brand-new, unique startup/side-project idea curated just for you!** 
* Once your code changes are merged or reviewed, we will send you your custom project idea as a thank-you gift.

---

## 🛠️ Open Tasks & Feature Roadmap
Want to contribute but don't know where to start? Here is a list of features and fixes we are actively looking for:

### 1. Frontend Enhancements (React, Vite, TailwindCSS)
* 📊 **Advanced Charts**: Upgrade current visualizations to include interactive historical tooltips or zoom-in capabilities for "Week" and "Month" views.
* 🌓 **Dark Mode Support**: Implement a seamless system theme toggle for the Glassmorphism UI.
* 📱 **Mobile Responsiveness**: Audit and patch layouts to guarantee a flawless mobile app experience.

### 2. Backend Improvements (Node.js & Express)
* 🔌 **WebSocket Integration**: Replace current polling methods with a real-time WebSocket server to stream simulated meter data continuously.
* 🔐 **Enhanced Authentication**: Add secure JWT-based user login/logout states to the API server endpoints.
* 🎛️ **Complex Load Algorithms**: Build a more dynamic server-side algorithm to calculate realistic appliance surges or grid spikes.

### 3. Documentation & DevOps
* 🧪 **Unit Tests**: Write testing suites for backend API routes or frontend component rendering.
* 📝 **Code Comments**: Help document the structure of the `/server` code files for future developers.

---

## 🚀 How to Get Started

1. **Fork** this repository to your profile.
2. **Clone** the repo locally: `git clone https://github.com`
3. **Install Dependencies** in both the root folder and `/server` directory via `npm install`.
4. Create a new branch: `git checkout -b feature/your-feature-name`
5. Open a **Pull Request** against our main branch when your changes are ready!

*Please check our [Issues Page](https://github.com) for a breakdown of active tasks tagged with `good first issue`!*
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
