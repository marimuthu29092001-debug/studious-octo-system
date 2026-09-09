import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        let Icon = Info;
        let iconColor = 'var(--primary)';
        if (toast.type === 'success') {
          Icon = CheckCircle2;
          iconColor = 'var(--success)';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          iconColor = 'var(--warning)';
        } else if (toast.type === 'danger' || toast.type === 'error') {
          Icon = AlertCircle;
          iconColor = 'var(--danger)';
        }

        return (
          <div key={toast.id} className="toast-card">
            <Icon size={18} style={{ color: iconColor, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                {toast.message}
              </div>
              {toast.detail && (
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>
                  {toast.detail}
                </div>
              )}
            </div>
            <button
              className="btn btn-ghost btn-icon-only"
              style={{ width: 24, height: 24 }}
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss toast"
            >
              <X size={13} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
