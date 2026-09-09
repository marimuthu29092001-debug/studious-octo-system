import React, { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  Sparkles,
  Palette,
  Save,
  CheckCircle2,
  Lock,
  Smartphone
} from 'lucide-react';

export default function Settings({ theme, toggleTheme, onTriggerToast }) {
  const [profileName, setProfileName] = useState('Alex Lawrence');
  const [profileEmail, setProfileEmail] = useState('alex.lawrence@stackly.io');
  const [profileRole, setProfileRole] = useState('Lead Architect');

  // Toggle Switches State
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slaBreachAlerts, setSlaBreachAlerts] = useState(true);
  const [microAnimations, setMicroAnimations] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  function handleSaveProfile(e) {
    e.preventDefault();
    onTriggerToast('User preferences updated successfully', 'success');
  }

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 860 }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          Account & System Settings
        </h1>
        <p style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 4 }}>
          Manage your personal profile, notification triggers, security controls, and visual preferences.
        </p>
      </div>

      {/* Profile Card */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <User size={18} color="var(--primary)" />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
            Personal Profile
          </h3>
        </div>

        <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
                Full Name
              </label>
              <input
                type="text"
                className="input-field"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
                Email Address
              </label>
              <input
                type="email"
                className="input-field"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
              Assigned Organization Role
            </label>
            <input
              type="text"
              className="input-field"
              value={profileRole}
              disabled
              style={{ backgroundColor: 'var(--bg-surface-subtle)', cursor: 'not-allowed' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
            <button type="submit" className="btn btn-primary">
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Micro-Animations & Interface Settings */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <Sparkles size={18} color="var(--primary)" />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
            Interface & Motion Preferences
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Micro animations toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)' }}>
                Subtle Micro-Animations & Spring Physics
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Enables 60fps GPU transforms, tactile button feedback, and modal transitions.
              </div>
            </div>
            <div
              className={`switch-track ${microAnimations ? 'active' : ''}`}
              onClick={() => {
                setMicroAnimations(!microAnimations);
                onTriggerToast(`Micro-animations ${!microAnimations ? 'enabled' : 'minimized'}`, 'info');
              }}
            >
              <div className="switch-thumb" />
            </div>
          </div>

          {/* Theme switcher row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)' }}>
                Dark Surface Mode
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                High-contrast dark mode tailored for low-light command center operations.
              </div>
            </div>
            <div
              className={`switch-track ${theme === 'dark' ? 'active' : ''}`}
              onClick={toggleTheme}
            >
              <div className="switch-thumb" />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications & Security */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <Bell size={18} color="var(--primary)" />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
            Notification Triggers & Security
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)' }}>
                SLA Breach & P1 Incident Webhooks
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Send instant alerts when uptime dips below 99.90% contractual threshold.
              </div>
            </div>
            <div
              className={`switch-track ${slaBreachAlerts ? 'active' : ''}`}
              onClick={() => setSlaBreachAlerts(!slaBreachAlerts)}
            >
              <div className="switch-thumb" />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)' }}>
                Enforce Two-Factor Authentication (2FA)
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Require time-based one-time password (TOTP) on all session authentications.
              </div>
            </div>
            <div
              className={`switch-track ${twoFactorAuth ? 'active' : ''}`}
              onClick={() => setTwoFactorAuth(!twoFactorAuth)}
            >
              <div className="switch-thumb" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
