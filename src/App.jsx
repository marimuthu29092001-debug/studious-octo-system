import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Toast from './components/Toast';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import UserManagement from './pages/UserManagement';
import TeamManagement from './pages/TeamManagement';
import ProjectManagement from './pages/ProjectManagement';
import SLADashboard from './pages/SLADashboard';
import Settings from './pages/Settings';
import AuthModal from './pages/AuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('light');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoadingSimulation, setIsLoadingSimulation] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // Sync theme attribute with document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    triggerToast(`Switched to ${theme === 'light' ? 'Dark' : 'Light'} Mode`, 'info');
  }

  function toggleLoadingSimulation() {
    setIsLoadingSimulation(prev => !prev);
    triggerToast(
      !isLoadingSimulation
        ? 'Skeleton loading animation enabled'
        : 'Restored real-time data view',
      'info'
    );
  }

  function triggerToast(message, type = 'info', detail = null) {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, detail };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }

  function removeToast(id) {
    setToasts(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
      {/* Collapsible Animated Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onLogout={() => {
          setAuthModalMode('login');
          setIsAuthModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Sticky Header with Controls */}
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          isLoadingSimulation={isLoadingSimulation}
          toggleLoadingSimulation={toggleLoadingSimulation}
          setIsMobileOpen={setIsMobileOpen}
          onOpenAuthModal={() => {
            setAuthModalMode('login');
            setIsAuthModalOpen(true);
          }}
          onOpenForgotPassword={() => {
            setAuthModalMode('forgot');
            setIsAuthModalOpen(true);
          }}
          onLogout={() => {
            setAuthModalMode('login');
            setIsAuthModalOpen(true);
          }}
          onTriggerToast={triggerToast}
        />

        {/* Page Content Container with Smooth Transition */}
        <main
          key={activeTab}
          style={{
            flex: 1,
            padding: '28px 32px',
            maxWidth: 1400,
            width: '100%',
            margin: '0 auto'
          }}
        >
          {activeTab === 'dashboard' && (
            <Dashboard
              isLoading={isLoadingSimulation}
              onNavigate={setActiveTab}
              onOpenNewProject={() => setIsNewProjectModalOpen(true)}
              onOpenAddUser={() => setIsAddUserModalOpen(true)}
              onTriggerToast={triggerToast}
            />
          )}

          {activeTab === 'reports' && (
            <Reports
              isLoading={isLoadingSimulation}
              onTriggerToast={triggerToast}
            />
          )}

          {activeTab === 'users' && (
            <UserManagement
              isLoading={isLoadingSimulation}
              onTriggerToast={triggerToast}
              isAddUserModalOpen={isAddUserModalOpen}
              setIsAddUserModalOpen={setIsAddUserModalOpen}
            />
          )}

          {activeTab === 'teams' && (
            <TeamManagement
              isLoading={isLoadingSimulation}
              onTriggerToast={triggerToast}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectManagement
              isLoading={isLoadingSimulation}
              onTriggerToast={triggerToast}
              isNewProjectModalOpen={isNewProjectModalOpen}
              setIsNewProjectModalOpen={setIsNewProjectModalOpen}
            />
          )}

          {activeTab === 'sla' && (
            <SLADashboard
              isLoading={isLoadingSimulation}
              onTriggerToast={triggerToast}
            />
          )}

          {activeTab === 'settings' && (
            <Settings
              theme={theme}
              toggleTheme={toggleTheme}
              onTriggerToast={triggerToast}
            />
          )}
        </main>
      </div>

      {/* Global Toast Stack */}
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Authentication & Forgot Password Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onLoginSuccess={(user) => {
          triggerToast(`Authenticated as ${user.name}`, 'success');
        }}
        onTriggerToast={triggerToast}
      />
    </div>
  );
}
