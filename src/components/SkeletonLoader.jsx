import React from 'react';

export default function SkeletonLoader({ type = 'card', count = 1 }) {
  const items = Array.from({ length: count });

  if (type === 'kpi') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {items.map((_, i) => (
          <div key={i} className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div className="skeleton" style={{ width: 90, height: 16 }} />
              <div className="skeleton" style={{ width: 32, height: 32, borderRadius: 8 }} />
            </div>
            <div className="skeleton" style={{ width: 130, height: 28, marginBottom: 8 }} />
            <div className="skeleton" style={{ width: 80, height: 14 }} />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div className="skeleton" style={{ width: 180, height: 22 }} />
          <div className="skeleton" style={{ width: 110, height: 34, borderRadius: 8 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div className="skeleton" style={{ width: 36, height: 36, borderRadius: '50%' }} />
              <div className="skeleton" style={{ flex: 1, height: 20 }} />
              <div className="skeleton" style={{ width: 100, height: 20 }} />
              <div className="skeleton" style={{ width: 80, height: 20 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className="card" style={{ padding: 22, height: 320, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="skeleton" style={{ width: 150, height: 20 }} />
          <div className="skeleton" style={{ width: 80, height: 20 }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 180, padding: '0 10px' }}>
          {[60, 85, 45, 95, 75, 55, 90, 100, 70, 80].map((h, i) => (
            <div key={i} className="skeleton" style={{ flex: 1, height: `${h}%`, borderRadius: '6px 6px 0 0' }} />
          ))}
        </div>
        <div className="skeleton" style={{ width: '100%', height: 14 }} />
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
      {items.map((_, i) => (
        <div key={i} className="card" style={{ padding: 20 }}>
          <div className="skeleton" style={{ width: '60%', height: 22, marginBottom: 14 }} />
          <div className="skeleton" style={{ width: '100%', height: 16, marginBottom: 8 }} />
          <div className="skeleton" style={{ width: '80%', height: 16, marginBottom: 16 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="skeleton" style={{ width: 70, height: 24, borderRadius: 12 }} />
            <div className="skeleton" style={{ width: 85, height: 32, borderRadius: 8 }} />
          </div>
        </div>
      ))}
    </div>
  );
}
