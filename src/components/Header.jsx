import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  Sparkles,
  User,
  Shield,
  KeyRound,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  RotateCw
} from 'lucide-react';

export default function Header({
  theme,
  toggleTheme,
  isLoadingSimulation,
  toggleLoadingSimulation,
  setIsMobileOpen,
  onOpenAuthModal,
  onOpenForgotPassword,
  onLogout,
  onTriggerToast
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: 'SLA Target Achieved', desc: 'Uptime maintained at 99.98% for 30 consecutive days', time: '10m ago', type: 'success' },
    { id: 2, title: 'New Team Member', desc: 'Sarah Jenkins joined the Core Infrastructure squad', time: '1h ago', type: 'info' },
    { id: 3, title: 'High Priority Alert', desc: 'API Gateway latency reached 142ms threshold', time: '2h ago', type: 'warning' }
  ];

  return (
    <header
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(8px)'
      }}
    >
      {/* Left Area: Mobile Toggle & Global Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          className="btn btn-ghost btn-icon-only mobile-toggle"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open mobile navigation"
        >
          <Menu size={20} />
        </button>

        <div style={{ position: 'relative', width: 280 }} className="search-container">
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }}
          />
          <input
            type="text"
            className="input-field"
            placeholder="Search projects, users, SLA..."
            style={{ paddingLeft: 36, paddingRight: 50, height: 38, fontSize: 13 }}
          />
          <div
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '2px 5px',
              borderRadius: 4,
              border: '1px solid var(--border-medium)',
              fontSize: 10,
              fontWeight: 700,
              color: 'var(--text-muted)'
            }}
          >
            ⌘K
          </div>
        </div>
      </div>

      {/* Right Area: Action Controls & Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Simulate Loading Animation Toggle */}
        <button
          className={`btn ${isLoadingSimulation ? 'btn-primary' : 'btn-secondary'}`}
          onClick={toggleLoadingSimulation}
          style={{ height: 36, fontSize: 12.5, padding: '0 12px' }}
          title="Toggle shimmer skeleton loading states to test micro-animations"
        >
          <RotateCw
            size={14}
            style={{
              animation: isLoadingSimulation ? 'spin 1s linear infinite' : 'none'
            }}
          />
          <span>{isLoadingSimulation ? 'Loading Mode (Active)' : 'Simulate Loading'}</span>
        </button>

        {/* Theme Switcher */}
        <button
          className="btn btn-ghost btn-icon-only"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          aria-label="Toggle theme"
          style={{
            transform: 'rotate(0deg)',
            transition: 'transform var(--duration-normal) var(--ease-spring), background-color var(--duration-fast) ease'
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'rotate(45deg) scale(0.9)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'rotate(0deg) scale(1)'; }}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} style={{ color: '#fbbf24' }} />}
        </button>

        {/* Notification Dropdown Container */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            className="btn btn-ghost btn-icon-only"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell size={18} />
            <span
              className="pulse-dot pulse-dot-danger"
              style={{
                position: 'absolute',
                top: 8,
                right: 9,
                width: 8,
                height: 8
              }}
            />
          </button>

          {showNotifications && (
            <div
              className="dropdown-menu"
              style={{ width: 320, right: 0, top: 'calc(100% + 8px)' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px 10px',
                  borderBottom: '1px solid var(--border-subtle)'
                }}
              >
                <span style={{ fontWeight: 700, fontSize: 13 }}>Notifications</span>
                <span className="badge badge-primary">3 New</span>
              </div>

              <div style={{ maxHeight: 280, overflowY: 'auto', padding: '6px 0' }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      transition: 'background var(--duration-fast) ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-hover)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    onClick={() => {
                      onTriggerToast('Notification dismissed', 'info');
                      setShowNotifications(false);
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {n.type === 'success' && <CheckCircle2 size={13} color="var(--success)" />}
                        {n.type === 'warning' && <AlertTriangle size={13} color="var(--warning)" />}
                        {n.type === 'info' && <Sparkles size={13} color="var(--primary)" />}
                        <span style={{ fontSize: 12.5, fontWeight: 600 }}>{n.title}</span>
                      </div>
                      <span style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{n.time}</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', marginTop: 4, paddingLeft: 19 }}>
                      {n.desc}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ padding: '8px 4px 4px', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  className="btn btn-ghost"
                  style={{ width: '100%', fontSize: 12, height: 32 }}
                  onClick={() => {
                    setShowNotifications(false);
                    onTriggerToast('All notifications marked as read', 'success');
                  }}
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div style={{ position: 'relative' }} ref={profileRef}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'transparent',
              border: 'none',
              padding: '4px 6px',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer'
            }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-label="User account menu"
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 13,
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform var(--duration-fast) var(--ease-spring)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              AL
            </div>
            <div className="profile-text" style={{ textAlign: 'left', lineHeight: 1.2 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Alex Lawrence</div>
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>Lead Architect</div>
            </div>
          </button>

          {showProfileMenu && (
            <div
              className="dropdown-menu"
              style={{ width: 220, right: 0, top: 'calc(100% + 8px)' }}
            >
              <div style={{ padding: '8px 12px 10px', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>Alex Lawrence</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>alex.lawrence@stackly.io</div>
              </div>

              <div style={{ padding: '6px 0' }}>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setShowProfileMenu(false);
                    onOpenAuthModal();
                  }}
                >
                  <KeyRound size={15} />
                  <span>Switch Account / Login</span>
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setShowProfileMenu(false);
                    onOpenForgotPassword();
                  }}
                >
                  <Shield size={15} />
                  <span>Reset / Forgot Password</span>
                </button>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '6px 0 2px' }}>
                <button
                  className="dropdown-item danger-item"
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
