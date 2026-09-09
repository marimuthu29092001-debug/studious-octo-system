import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Users2,
  FolderKanban,
  ShieldCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  HelpCircle,
  LogOut
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
  onLogout
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, badge: 'New' },
    { id: 'users', label: 'User Management', icon: Users, badge: '24' },
    { id: 'teams', label: 'Team Management', icon: Users2, badge: '5' },
    { id: 'projects', label: 'Project Portfolio', icon: FolderKanban, badge: '8' },
    { id: 'sla', label: 'SLA Tracking', icon: ShieldCheck, badge: '99.9%' },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="modal-overlay"
          style={{ zIndex: 90 }}
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        style={{
          width: isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-expanded-width)',
          backgroundColor: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-subtle)',
          height: '100vh',
          position: 'sticky',
          top: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'width var(--duration-normal) var(--ease-spring), transform var(--duration-normal) var(--ease-spring)',
          zIndex: 95,
          overflowX: 'hidden',
          transform: isMobileOpen ? 'translateX(0)' : undefined
        }}
        className={`sidebar-root ${isMobileOpen ? 'mobile-open' : ''}`}
      >
        {/* Brand Header */}
        <div>
          <div
            style={{
              height: 'var(--header-height)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'space-between',
              padding: isCollapsed ? '0 12px' : '0 20px',
              borderBottom: '1px solid var(--border-subtle)'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer'
              }}
              onClick={() => setActiveTab('dashboard')}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.35)',
                  flexShrink: 0,
                  transition: 'transform var(--duration-fast) var(--ease-spring)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08) rotate(4deg)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) rotate(0deg)'; }}
              >
                <Zap size={20} />
              </div>
              {!isCollapsed && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                    Stackly<span style={{ color: 'var(--primary)' }}>.io</span>
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Enterprise Suite
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Collapse Toggle */}
            {!isCollapsed && (
              <button
                className="btn btn-ghost btn-icon-only"
                style={{ width: 30, height: 30 }}
                onClick={() => setIsCollapsed(true)}
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft size={16} />
              </button>
            )}
          </div>

          {/* Navigation Menu */}
          <nav style={{ padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (isMobileOpen) setIsMobileOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isCollapsed ? 'center' : 'space-between',
                    width: '100%',
                    padding: isCollapsed ? '12px 0' : '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: isActive ? 'var(--primary-subtle)' : 'transparent',
                    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: 13.5,
                    cursor: 'pointer',
                    transition: 'all var(--duration-fast) var(--ease-spring)',
                    position: 'relative'
                  }}
                  title={isCollapsed ? item.label : undefined}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                      e.currentTarget.style.transform = 'translate3d(3px, 0, 0)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.transform = 'translate3d(0, 0, 0)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Icon
                      size={19}
                      style={{
                        color: isActive ? 'var(--primary)' : 'inherit',
                        transition: 'transform var(--duration-fast) var(--ease-spring)',
                        transform: isActive ? 'scale(1.1)' : 'scale(1)'
                      }}
                    />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>

                  {!isCollapsed && item.badge && (
                    <span
                      className="badge"
                      style={{
                        background: isActive ? 'var(--primary)' : 'var(--bg-surface-subtle)',
                        color: isActive ? '#ffffff' : 'var(--text-muted)',
                        fontSize: 10.5,
                        padding: '2px 7px'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '15%',
                        bottom: '15%',
                        width: 3,
                        borderRadius: '0 4px 4px 0',
                        backgroundColor: 'var(--primary)'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer & Collapse Expand Button when collapsed */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border-subtle)' }}>
          {isCollapsed ? (
            <button
              className="btn btn-ghost btn-icon-only"
              style={{ width: '100%', height: 38 }}
              onClick={() => setIsCollapsed(false)}
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <ChevronRight size={18} />
            </button>
          ) : (
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid rgba(79, 70, 229, 0.15)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff'
                  }}
                >
                  <Sparkles size={16} />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>Stackly Pro</div>
                  <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>v2.4 Active</div>
                </div>
              </div>
              <button
                className="btn btn-ghost btn-icon-only"
                style={{ width: 28, height: 28 }}
                onClick={onLogout}
                title="Sign out"
              >
                <LogOut size={14} />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
