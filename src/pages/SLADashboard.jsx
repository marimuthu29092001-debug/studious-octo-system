import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Clock,
  Activity,
  CheckCircle2,
  RefreshCw,
  Server,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import SkeletonLoader from '../components/SkeletonLoader';

export default function SLADashboard({ isLoading, onTriggerToast }) {
  const [incidents, setIncidents] = useState([
    { id: 'INC-881', service: 'EU-West Auth Broker', severity: 'P2 - High', status: 'Investigating', duration: '14m', impact: '0.01% errors', owner: 'Devon Miles' },
    { id: 'INC-880', service: 'Global CDN Edge Cache', severity: 'P3 - Medium', status: 'Resolved', duration: '4m', impact: 'None (Failover OK)', owner: 'Alex Lawrence' },
    { id: 'INC-879', service: 'PostgreSQL Primary Replica', severity: 'P1 - Critical', status: 'Resolved', duration: '22m', impact: 'Queries queued', owner: 'Sarah Jenkins' }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  function handleRefresh() {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      onTriggerToast('SLA telemetry synchronized across all availability zones', 'success');
    }, 600);
  }

  function handleResolveIncident(id) {
    setIncidents(incidents.map(inc => inc.id === id ? { ...inc, status: 'Resolved' } : inc));
    onTriggerToast(`Incident ${id} marked as Resolved`, 'success');
  }

  if (isLoading) {
    return (
      <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <SkeletonLoader type="kpi" count={4} />
        <SkeletonLoader type="table" count={4} />
      </div>
    );
  }

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            SLA & Availability Telemetry
          </h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 4 }}>
            Monitor real-time system uptime, contractual SLA commitments, and active incident response.
          </p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={handleRefresh}
          disabled={isRefreshing}
          style={{ height: 38 }}
        >
          <RefreshCw size={15} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
          <span>{isRefreshing ? 'Polling Nodes...' : 'Sync Telemetry'}</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div className="card kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>System Uptime (30d)</span>
            <ShieldCheck size={18} color="var(--success)" />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--success)', letterSpacing: '-0.03em' }}>
            99.98%
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 4 }}>
            Commitment: 99.90% (+0.08% buffer)
          </div>
        </div>

        <div className="card kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Mean Time to Detect (MTTD)</span>
            <Activity size={18} color="var(--primary)" />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
            1.4 min
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--success-text)', marginTop: 4 }}>
            -35% vs previous quarter
          </div>
        </div>

        <div className="card kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Mean Time to Recover (MTTR)</span>
            <Clock size={18} color="#f59e0b" />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
            12.8 min
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 4 }}>
            Target: &lt; 20 minutes
          </div>
        </div>

        <div className="card kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Active Incidents</span>
            <AlertTriangle size={18} color="var(--warning)" />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--warning)', letterSpacing: '-0.03em' }}>
            1 Degraded
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 4 }}>
            Zero critical outages
          </div>
        </div>
      </div>

      {/* Service SLA Health Breakdown */}
      <div className="card" style={{ padding: 22 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>
          Service Tier SLA Compliance
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { service: 'Authentication & SSO Cluster', actual: 99.99, target: 99.95, status: 'Healthy' },
            { service: 'Core GraphQL API Gateway', actual: 99.97, target: 99.90, status: 'Healthy' },
            { service: 'PostgreSQL DB Multi-AZ Cluster', actual: 99.95, target: 99.90, status: 'Healthy' },
            { service: 'Async Job Queue & Redis Workers', actual: 99.92, target: 99.85, status: 'Healthy' }
          ].map((s, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.service}</span>
                <span style={{ fontWeight: 700, color: 'var(--success-text)' }}>{s.actual}% <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Target: {s.target}%)</span></span>
              </div>
              <div style={{ width: '100%', height: 6, backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${s.actual}%`, height: '100%', backgroundColor: 'var(--success)', borderRadius: 4, transition: 'width 0.6s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incidents Table */}
      <div className="table-container">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
            Recent Incident Triage
          </h3>
          <span className="badge badge-primary">3 Tracked</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Incident ID</th>
              <th>Service Affected</th>
              <th>Severity</th>
              <th>Duration</th>
              <th>Impact</th>
              <th>Incident Lead</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((inc) => (
              <tr key={inc.id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--primary)' }}>
                  {inc.id}
                </td>
                <td style={{ fontWeight: 600 }}>{inc.service}</td>
                <td>
                  <span className={`badge ${inc.severity.includes('P1') ? 'badge-danger' : inc.severity.includes('P2') ? 'badge-warning' : 'badge-neutral'}`}>
                    {inc.severity}
                  </span>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{inc.duration}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{inc.impact}</td>
                <td>{inc.owner}</td>
                <td>
                  <span className={`badge ${inc.status === 'Resolved' ? 'badge-success' : 'badge-warning'}`}>
                    {inc.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  {inc.status !== 'Resolved' ? (
                    <button
                      className="btn btn-subtle"
                      style={{ padding: '4px 10px', fontSize: 12 }}
                      onClick={() => handleResolveIncident(inc.id)}
                    >
                      <CheckCircle2 size={13} />
                      <span>Resolve</span>
                    </button>
                  ) : (
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Closed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
