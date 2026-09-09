import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 520
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-dialog"
        style={{ maxWidth }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '20px 24px 16px',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div>
            <h3
              id="modal-title"
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em'
              }}
            >
              {title}
            </h3>
            {subtitle && (
              <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 4 }}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            className="btn btn-ghost btn-icon-only"
            onClick={onClose}
            aria-label="Close dialog"
            style={{ width: 32, height: 32 }}
          >
            <X size={17} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '20px 24px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
