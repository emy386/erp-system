/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Login } from './components/Login';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Orders } from './components/Orders';
import { Inventory } from './components/Inventory';
import { Production } from './components/Production';
import { Staff } from './components/Staff';
import { Accounts } from './components/Accounts';
import { motion } from 'motion/react';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Protected Route component to check permissions
const ProtectedRoute: React.FC<{ children: React.ReactNode; permission: string }> = ({ children, permission }) => {
  const { currentUser } = useApp();
  
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  const perms = currentUser.permissions || [];
  
  // If permissions array is empty or undefined, deny access
  if (!perms || perms.length === 0) {
    return <Navigate to="/" replace />;
  }
  
  // If user has "all" permission, allow access
  if (perms.includes("all")) {
    return <>{children}</>;
  }
  
  // Check if user has the specific permission
  if (perms.includes(permission)) {
    return <>{children}</>;
  }
  
  // Deny access and redirect to dashboard
  return <Navigate to="/" replace />;
};

function AppContent() {
  const { currentUser } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If no user is logged in, show the Login/Register screens
  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-slate-50/60 flex text-right font-sans selection:bg-blue-100 selection:text-blue-900" dir="rtl">
      
      {/* Slide-over Sidebar drawer navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Panel Content Area */}
      {/* On desktop view, lg:mr-64 offset makes space on the right for the RTL fix-docked Sidebar */}
      <div className="flex-1 flex flex-col lg:mr-64 min-w-0 transition-all duration-300">
        
        {/* Top Header bar with search & profiles info */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Dynamic Client Routing Pages wrapper */}
        <main className="p-4 md:p-8 flex-1 overflow-y-auto w-full max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<ProtectedRoute permission="dashboard"><PageTransition><Dashboard /></PageTransition></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute permission="orders"><PageTransition><Orders /></PageTransition></ProtectedRoute>} />
            <Route path="/inventory" element={<ProtectedRoute permission="inventory"><PageTransition><Inventory /></PageTransition></ProtectedRoute>} />
            <Route path="/production" element={<ProtectedRoute permission="production"><PageTransition><Production /></PageTransition></ProtectedRoute>} />
            <Route path="/staff" element={<ProtectedRoute permission="staff"><PageTransition><Staff /></PageTransition></ProtectedRoute>} />
            <Route path="/accounts" element={<ProtectedRoute permission="accounts"><PageTransition><Accounts /></PageTransition></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}
