import React, { useState } from 'react';
import {
  Download,
  Filter,
  Calendar,
  FileSpreadsheet,
  FileText,
  Search,
  CheckCircle2,
  TrendingUp,
  BarChart2,
  PieChart,
  ArrowUpDown
} from 'lucide-react';
import SkeletonLoader from '../components/SkeletonLoader';

export default function Reports({ isLoading, onTriggerToast }) {
  const [reportType, setReportType] = useState('sla');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const reportsData = [
    { id: 'REP-101', name: 'Q3 Enterprise SLA Compliance Audit', generated: '2026-09-08', author: 'Elena Rostov', status: 'Completed', size: '2.4 MB', score: '99.98%' },
    { id: 'REP-102', name: 'Micro-Animation Performance Profiling', generated: '2026-09-07', author: 'Alex Lawrence', status: 'Completed', size: '1.1 MB', score: '60 FPS' },
    { id: 'REP-103', name: 'Infrastructure Compute & Memory Usage', generated: '2026-09-05', author: 'Devon Miles', status: 'Completed', size: '4.8 MB', score: '78.4%' },
    { id: 'REP-104', name: 'Team Sprint Velocity & Milestone Deliveries', generated: '2026-09-02', author: 'Marcus Vance', status: 'Completed', size: '3.2 MB', score: '94.2%' },
    { id: 'REP-105', name: 'User Authentication & Session Security Log', generated: '2026-08-30', author: 'Sarah Jenkins', status: 'Archived', size: '8.6 MB', score: '100%' }
  ];

  const filteredReports = reportsData.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleExport(format) {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      onTriggerToast(`Exported ${format.toUpperCase()} report successfully`, 'success');
    }, 900);
  }

  if (isLoading) {
    return (
      <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <SkeletonLoader type="kpi" count={3} />
        <SkeletonLoader type="table" count={5} />
      </div>
    );
  }

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Reports & Analytics
          </h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 4 }}>
            Generate, query, and export cross-departmental SLA, telemetry, and performance dossiers.
          </p>
        </div>

        {/* Export Buttons with tactile micro-interactions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="btn btn-secondary"
            disabled={isExporting}
            onClick={() => handleExport('csv')}
          >
            <FileSpreadsheet size={15} color="var(--success)" />
            <span>CSV</span>
          </button>

          <button
            className="btn btn-secondary"
            disabled={isExporting}
            onClick={() => handleExport('pdf')}
          >
            <FileText size={15} color="var(--danger)" />
            <span>PDF</span>
          </button>

          <button
            className="btn btn-primary"
            disabled={isExporting}
            onClick={() => handleExport('full')}
          >
            <Download size={15} />
            <span>{isExporting ? 'Packaging...' : 'Export All'}</span>
          </button>
        </div>
      </div>

      {/* Report Categories Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 2,
          overflowX: 'auto'
        }}
      >
        {[
          { id: 'sla', label: 'SLA & Uptime Reports', count: '12' },
          { id: 'performance', label: 'Velocity & Delivery', count: '8' },
          { id: 'security', label: 'Security & Audits', count: '5' },
          { id: 'financial', label: 'Cost Allocation', count: '4' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setReportType(tab.id)}
            style={{
              padding: '10px 16px',
              border: 'none',
              background: 'transparent',
              color: reportType === tab.id ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: reportType === tab.id ? 700 : 500,
              fontSize: 13.5,
              cursor: 'pointer',
              borderBottom: reportType === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all var(--duration-fast) var(--ease-spring)'
            }}
          >
            <span>{tab.label}</span>
            <span
              className="badge"
              style={{
                fontSize: 11,
                background: reportType === tab.id ? 'var(--primary-subtle)' : 'var(--bg-surface-subtle)',
                color: reportType === tab.id ? 'var(--primary-text)' : 'var(--text-muted)'
              }}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <div style={{ position: 'relative', width: 300 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input-field"
            placeholder="Search report ID, title, author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: 36, height: 38 }}
          />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="btn btn-secondary"
            onClick={() => onTriggerToast('Filters applied: 2026-Q3 dataset', 'info')}
          >
            <Calendar size={14} />
            <span>Last 30 Days</span>
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => onTriggerToast('Applied status filter: Completed only', 'info')}
          >
            <Filter size={14} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Report Name</th>
              <th>Date Generated</th>
              <th>Author</th>
              <th>File Size</th>
              <th>KPI Metric</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--primary)' }}>
                  {report.id}
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{report.name}</div>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{report.generated}</td>
                <td>{report.author}</td>
                <td style={{ color: 'var(--text-muted)' }}>{report.size}</td>
                <td>
                  <span className="badge badge-primary">{report.score}</span>
                </td>
                <td>
                  <span className={`badge ${report.status === 'Completed' ? 'badge-success' : 'badge-neutral'}`}>
                    {report.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    className="btn btn-ghost"
                    style={{ padding: '4px 10px', fontSize: 12 }}
                    onClick={() => handleExport(report.id)}
                  >
                    <Download size={13} />
                    <span>Download</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
