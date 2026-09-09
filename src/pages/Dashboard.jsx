import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  FolderKanban,
  ShieldCheck,
  DollarSign,
  ArrowUpRight,
  Activity,
  Calendar,
  Filter,
  Plus,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import SkeletonLoader from '../components/SkeletonLoader';

export default function Dashboard({
  isLoading,
  onNavigate,
  onOpenNewProject,
  onOpenAddUser,
  onTriggerToast
}) {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeChartBar, setActiveChartBar] = useState(null);

  if (isLoading) {
    return (
      <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <SkeletonLoader type="kpi" count={4} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
          <SkeletonLoader type="chart" />
          <SkeletonLoader type="table" count={5} />
        </div>
      </div>
    );
  }

  const kpis = [
    {
      title: 'Total Active Users',
      value: '24,892',
      change: '+14.2%',
      isPositive: true,
      icon: Users,
      color: '#4f46e5',
      bgColor: 'rgba(79, 70, 229, 0.1)',
      target: 'users'
    },
    {
      title: 'Active Projects',
      value: '184',
      change: '+8.1%',
      isPositive: true,
      icon: FolderKanban,
      color: '#0ea5e9',
      bgColor: 'rgba(14, 165, 233, 0.1)',
      target: 'projects'
    },
    {
      title: 'Global SLA Compliance',
      value: '99.98%',
      change: '+0.04%',
      isPositive: true,
      icon: ShieldCheck,
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      target: 'sla'
    },
    {
      title: 'ARR Generated',
      value: '$1.42M',
      change: '-2.4%',
      isPositive: false,
      icon: DollarSign,
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      target: 'reports'
    }
  ];

  const chartData = [
    { month: 'Jan', val: 65, sla: 99.8 },
    { month: 'Feb', val: 78, sla: 99.9 },
    { month: 'Mar', val: 82, sla: 99.7 },
    { month: 'Apr', val: 94, sla: 100.0 },
    { month: 'May', val: 88, sla: 99.9 },
    { month: 'Jun', val: 105, sla: 99.8 },
    { month: 'Jul', val: 118, sla: 100.0 },
    { month: 'Aug', val: 125, sla: 99.95 }
  ];

  const recentActivities = [
    { id: 1, user: 'Devon Miles', action: 'Deployed v2.4 hotfix to US-East cluster', time: '12m ago', tag: 'Infrastructure' },
    { id: 2, user: 'Elena Rostov', action: 'Approved quarterly SLA performance report', time: '45m ago', tag: 'Compliance' },
    { id: 3, user: 'Marcus Vance', action: 'Created project: AI Observability Pipeline', time: '2h ago', tag: 'Engineering' },
    { id: 4, user: 'Sarah Jenkins', action: 'Invited 6 members to Platform Ops team', time: '4h ago', tag: 'Team' },
    { id: 5, user: 'Alex Lawrence', action: 'Updated security access controls for SSO', time: '6h ago', tag: 'Security' }
  ];

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Executive Dashboard
          </h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 4 }}>
            Real-time performance telemetry, SLA compliance, and cross-team productivity.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Time range pill selector */}
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-surface-subtle)',
              padding: 3,
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {['7d', '30d', '90d'].map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: timeRange === r ? 'var(--bg-surface)' : 'transparent',
                  color: timeRange === r ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: timeRange === r ? 700 : 500,
                  fontSize: 12,
                  boxShadow: timeRange === r ? 'var(--shadow-xs)' : 'none',
                  cursor: 'pointer',
                  transition: 'all var(--duration-fast) var(--ease-spring)'
                }}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            className="btn btn-primary"
            onClick={onOpenNewProject}
            style={{ height: 36 }}
          >
            <Plus size={15} />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="card card-interactive kpi-card"
              onClick={() => onNavigate(kpi.target)}
              title={`View ${kpi.title}`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {kpi.title}
                </span>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: kpi.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: kpi.color,
                    transition: 'transform var(--duration-fast) var(--ease-spring)'
                  }}
                >
                  <Icon size={18} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                  {kpi.value}
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    fontSize: 12,
                    fontWeight: 700,
                    color: kpi.isPositive ? 'var(--success-text)' : 'var(--danger-text)',
                    backgroundColor: kpi.isPositive ? 'var(--success-subtle)' : 'var(--danger-subtle)',
                    padding: '2px 7px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  {kpi.isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  <span>{kpi.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Interactive Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
        {/* Interactive Volume & Trend Chart */}
        <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                Activity & Throughput Trend
              </h3>
              <p style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                Monthly project execution velocity & SLA consistency
              </p>
            </div>
            <span className="badge badge-success">
              <CheckCircle2 size={12} /> Target Met
            </span>
          </div>

          {/* Interactive Bar Chart Visualization */}
          <div style={{ height: 210, display: 'flex', alignItems: 'flex-end', gap: 14, padding: '0 4px', position: 'relative' }}>
            {chartData.map((d, i) => {
              const heightPercent = (d.val / 130) * 100;
              const isHovered = activeChartBar === i;
              return (
                <div
                  key={d.month}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    height: '100%',
                    justifyContent: 'flex-end',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={() => setActiveChartBar(i)}
                  onMouseLeave={() => setActiveChartBar(null)}
                >
                  {isHovered && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        backgroundColor: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-subtle)',
                        boxShadow: 'var(--shadow-md)',
                        padding: '4px 10px',
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 600,
                        zIndex: 10,
                        color: 'var(--text-primary)',
                        animation: 'dropdownSlideIn 0.15s ease'
                      }}
                    >
                      {d.month}: {d.val}k tasks (SLA {d.sla}%)
                    </div>
                  )}
                  <div
                    style={{
                      width: '100%',
                      height: `${heightPercent}%`,
                      background: isHovered
                        ? 'linear-gradient(180deg, #6366f1 0%, #4338ca 100%)'
                        : 'linear-gradient(180deg, #818cf8 0%, #4f46e5 100%)',
                      borderRadius: '6px 6px 2px 2px',
                      transition: 'height 0.4s var(--ease-spring), transform 0.2s ease, background 0.2s ease',
                      transform: isHovered ? 'scaleY(1.04)' : 'scaleY(1)',
                      transformOrigin: 'bottom'
                    }}
                  />
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: isHovered ? 'var(--primary)' : 'var(--text-muted)' }}>
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Average monthly throughput: 94.2k events</span>
            <button
              className="btn btn-ghost"
              style={{ fontSize: 12, padding: '4px 8px' }}
              onClick={() => onNavigate('reports')}
            >
              <span>Detailed Report</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Activity size={18} color="var(--primary)" />
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                Live Activity Feed
              </h3>
            </div>
            <span className="pulse-dot pulse-dot-success" title="Live stream active" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1, overflowY: 'auto', maxHeight: 250 }}>
            {recentActivities.map((act) => (
              <div
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 12,
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-md)',
                  transition: 'background var(--duration-fast) ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-hover)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {act.user}{' '}
                    <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>
                      {act.action}
                    </span>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{act.time}</span>
                </div>
                <span className="badge badge-neutral" style={{ flexShrink: 0, fontSize: 11 }}>
                  {act.tag}
                </span>
              </div>
            ))}
          </div>

          <button
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: 14, fontSize: 12.5 }}
            onClick={() => onTriggerToast('Activity log synchronized', 'success')}
          >
            Refresh Stream
          </button>
        </div>
      </div>
    </div>
  );
}
