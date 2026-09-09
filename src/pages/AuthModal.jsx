import React, { useState } from 'react';
import {
  KeyRound,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
  ArrowLeft
} from 'lucide-react';
import Modal from '../components/Modal';

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess,
  onTriggerToast
}) {
  const [mode, setMode] = useState(initialMode); // 'login', 'forgot', 'otp', 'newpass', 'success'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleLoginSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({ name: 'Alex Lawrence', email: email || 'alex.lawrence@stackly.io' });
      onClose();
      onTriggerToast('Welcome back, Alex Lawrence', 'success');
    }, 600);
  }

  function handleForgotSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMode('otp');
      onTriggerToast(`Verification code dispatched to ${email}`, 'info');
    }, 600);
  }

  function handleOtpSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMode('newpass');
      onTriggerToast('OTP verified successfully', 'success');
    }, 500);
  }

  function handleNewPassSubmit(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      onTriggerToast('Passwords do not match', 'danger');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMode('success');
      onTriggerToast('Password updated successfully', 'success');
    }, 600);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        mode === 'login' ? 'Sign In to Stackly Enterprise' :
        mode === 'forgot' ? 'Reset Account Password' :
        mode === 'otp' ? 'Enter 6-Digit OTP Code' :
        mode === 'newpass' ? 'Set New Secure Password' :
        'Password Reset Complete'
      }
      subtitle={
        mode === 'login' ? 'Access your command center, telemetry logs, and SLA dashboards.' :
        mode === 'forgot' ? 'We will send a secure one-time verification code to your email.' :
        mode === 'otp' ? `Enter the verification code sent to ${email || 'your email'}.` :
        mode === 'newpass' ? 'Choose a strong password with at least 8 characters.' :
        'Your credentials have been securely updated.'
      }
      maxWidth={460}
    >
      {/* Step 1: Login Form */}
      {mode === 'login' && (
        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
              Work Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                className="input-field"
                placeholder="alex.lawrence@stackly.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: 36 }}
                required
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)' }}>
                Password
              </label>
              <button
                type="button"
                className="btn btn-ghost"
                style={{ padding: 0, fontSize: 12, color: 'var(--primary)' }}
                onClick={() => setMode('forgot')}
              >
                Forgot Password?
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                className="input-field"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: 36 }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 8, height: 42 }}
            disabled={isLoading}
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight size={15} />
          </button>
        </form>
      )}

      {/* Step 2: Forgot Password Email */}
      {mode === 'forgot' && (
        <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
              Corporate Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                className="input-field"
                placeholder="alex.lawrence@stackly.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: 36 }}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setMode('login')}
            >
              <ArrowLeft size={14} />
              <span>Back to Login</span>
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Sending Code...' : 'Send Verification OTP'}
            </button>
          </div>
        </form>
      )}

      {/* Step 3: OTP Verification */}
      {mode === 'otp' && (
        <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                className="input-field"
                style={{
                  width: 46,
                  height: 50,
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 700
                }}
                value={digit}
                onChange={(e) => {
                  const val = e.target.value;
                  const newOtp = [...otp];
                  newOtp[idx] = val;
                  setOtp(newOtp);
                  // auto advance
                  if (val && e.target.nextSibling) {
                    e.target.nextSibling.focus();
                  }
                }}
              />
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setMode('forgot')}
            >
              <ArrowLeft size={14} />
              <span>Change Email</span>
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>
          </div>
        </form>
      )}

      {/* Step 4: New Password */}
      {mode === 'newpass' && (
        <form onSubmit={handleNewPassSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
              New Password
            </label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
              Confirm New Password
            </label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 8, height: 42 }}
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Set New Password'}
          </button>
        </form>
      )}

      {/* Step 5: Success Confirmation */}
      {mode === 'success' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '16px 0' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: 'var(--success-subtle)',
              color: 'var(--success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16
            }}
          >
            <CheckCircle2 size={32} />
          </div>
          <h4 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
            Password Reset Successfully
          </h4>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 300, marginBottom: 20 }}>
            You can now sign in with your updated credentials.
          </p>
          <button
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={() => setMode('login')}
          >
            Return to Sign In
          </button>
        </div>
      )}
    </Modal>
  );
}
