# FlowMind AI SaaS

A modern, full-featured SaaS application for managing and executing AI workflows. Built with React, TypeScript, and Tailwind CSS.


## ⚡ Product Preview

![FlowMind AI Demo](assets/flowmind-demo.gif)

## 🌟 Features

- **User Authentication**: Secure login and registration system
- **Workflow Management**: Create, manage, and organize AI workflows
- **Workflow Execution**: Execute workflows and monitor real-time progress
- **Results Dashboard**: View and analyze workflow execution results
- **Billing System**: Integrated billing and subscription management
- **Settings**: User preferences and account configuration
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Analytics**: Track workflow performance with interactive charts

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Bundler**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Routing**: React Router v7
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React

## 📦 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd build-flowmind-ai-saas
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🚀 Build & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   └── layout/
│       ├── DashboardLayout.tsx    # Main dashboard layout wrapper
│       └── Sidebar.tsx            # Navigation sidebar
├── pages/
│   ├── LandingPage.tsx           # Public landing page
│   ├── LoginPage.tsx             # User login
│   ├── RegisterPage.tsx          # User registration
│   ├── DashboardPage.tsx         # Dashboard home
│   ├── WorkflowsPage.tsx         # Workflows list
│   ├── NewWorkflowPage.tsx       # Create new workflow
│   ├── WorkflowExecutionPage.tsx # Execute workflow
│   ├── WorkflowResultPage.tsx    # View results
│   ├── BillingPage.tsx           # Billing & subscription
│   └── SettingsPage.tsx          # User settings
├── store/
│   ├── authStore.ts             # Authentication state
│   └── workflowStore.ts         # Workflow state
├── lib/
│   ├── mockData.ts              # Mock data for development
│   └── utils.ts                 # Utility functions
├── utils/
│   └── cn.ts                    # Class name utility
├── App.tsx                       # Main app component
├── main.tsx                      # Application entry point
└── index.css                     # Global styles
```

## 🔐 Authentication

The application uses a protected route system with Zustand for state management:

- **Public routes**: `/`, `/login`, `/register`
- **Protected routes**: All routes under `/dashboard`
- Unauthenticated users are redirected to login

## 🎨 Styling

The project uses Tailwind CSS with a custom configuration. Key styling utilities:

- Responsive design with Tailwind breakpoints
- Custom class name utility in `src/utils/cn.ts`
- Radix UI components for accessible UI elements

## 📊 State Management

Zustand is used for lightweight state management:

- `authStore.ts`: Manages authentication state and user session
- `workflowStore.ts`: Manages workflow data and operations

## 🔄 Workflow Features

- **Create Workflows**: Build custom AI workflows with an intuitive interface
- **Execute Workflows**: Run workflows and track execution progress
- **View Results**: Analyze results with detailed metrics and charts
- **Manage Workflows**: Edit, duplicate, or delete workflows

## 🧪 Development

### Code Structure
- React functional components with hooks
- TypeScript for type safety
- Component-based architecture
- Centralized state management with Zustand

### Best Practices
- Protected routes for authentication
- Responsive design patterns
- Modular component structure
- Separation of concerns (pages, components, stores)

## 📝 Environment Variables

Create a `.env.local` file in the project root if needed:

```
VITE_API_URL=http://localhost:3000
# Add other environment variables as needed
```

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

For development guidelines and contribution instructions, please contact the development team.

## 📞 Support

For issues, feature requests, or questions, please reach out to the development team.

## Current Status
Frontend MVP complete.
Backend + AI orchestration in progress.

## Tech Stack
Next.js 15
TypeScript
TailwindCSS
shadcn/ui


## 🎥  Full Demo Video

See FlowMind AI in action:

[Watch Product Demo on Loom](https://www.loom.com/share/1174efca7d5f4e4a92c58371656926e8)

## Roadmap
- [x] UI Foundation
- [ ] Authentication
- [ ] FastAPI backend
- [ ] LangGraph multi-agent engine
- [ ] Billing
