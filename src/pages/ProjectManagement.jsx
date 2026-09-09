import React, { useState } from 'react';
import {
  FolderKanban,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Flag,
  User,
  MoreVertical,
  Filter
} from 'lucide-react';
import Modal from '../components/Modal';
import SkeletonLoader from '../components/SkeletonLoader';

export default function ProjectManagement({
  isLoading,
  onTriggerToast,
  isNewProjectModalOpen,
  setIsNewProjectModalOpen
}) {
  const [projects, setProjects] = useState([
    {
      id: 'PRJ-201',
      title: 'Micro-Animations & UI/UX Refresh',
      description: 'Implement silky smooth 60fps micro-animations, skeleton shimmers, and responsive states across Stackly.',
      priority: 'High',
      status: 'In Progress',
      progress: 88,
      lead: 'Alex Lawrence',
      dueDate: '2026-09-15',
      tasks: '18/20'
    },
    {
      id: 'PRJ-202',
      title: 'Multi-Region SLA Gateway Failover',
      description: 'Zero-downtime routing automation across EU-Central and US-East data planes.',
      priority: 'Critical',
      status: 'In Progress',
      progress: 65,
      lead: 'Devon Miles',
      dueDate: '2026-09-22',
      tasks: '12/18'
    },
    {
      id: 'PRJ-203',
      title: 'Audit Logging & SOC2 Type II Compliance',
      description: 'Structured SIEM event export and immutable ledger integration.',
      priority: 'Medium',
      status: 'Completed',
      progress: 100,
      lead: 'Sarah Jenkins',
      dueDate: '2026-09-04',
      tasks: '14/14'
    },
    {
      id: 'PRJ-204',
      title: 'AI Predictive Telemetry & Anomaly Detection',
      description: 'Machine learning forecasting model for preemptive SLA degradation alerting.',
      priority: 'High',
      status: 'In Progress',
      progress: 42,
      lead: 'Elena Rostov',
      dueDate: '2026-10-01',
      tasks: '6/15'
    }
  ]);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('High');
  const [dueDate, setDueDate] = useState('');

  function handleCreateProject(e) {
    e.preventDefault();
    if (!title.trim()) return;

    const newPrj = {
      id: `PRJ-${Math.floor(Math.random() * 800 + 200)}`,
      title,
      description: desc || 'Standard enterprise initiative with continuous milestone integration.',
      priority,
      status: 'In Progress',
      progress: 10,
      lead: 'Alex Lawrence',
      dueDate: dueDate || '2026-10-15',
      tasks: '1/10'
    };

    setProjects([newPrj, ...projects]);
    setTitle('');
    setDesc('');
    setIsNewProjectModalOpen(false);
    onTriggerToast(`Created project: ${newPrj.title}`, 'success');
  }

  if (isLoading) {
    return (
      <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <SkeletonLoader type="kpi" count={3} />
        <SkeletonLoader type="card" count={4} />
      </div>
    );
  }

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Project Portfolio
          </h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 4 }}>
            Track sprint delivery milestones, resource bandwidth, and execution progress.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setIsNewProjectModalOpen(true)}
          style={{ height: 38 }}
        >
          <Plus size={16} />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        {projects.map((prj) => (
          <div
            key={prj.id}
            className="card card-interactive"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 11.5, fontWeight: 700, color: 'var(--primary)' }}>
                  {prj.id}
                </span>
                <span className={`badge ${
                  prj.priority === 'Critical' ? 'badge-danger' :
                  prj.priority === 'High' ? 'badge-warning' : 'badge-primary'
                }`}>
                  <Flag size={11} />
                  <span>{prj.priority}</span>
                </span>
              </div>

              <h3 style={{ fontSize: 16.5, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
                {prj.title}
              </h3>
              <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>
                {prj.description}
              </p>
            </div>

            {/* Progress and Delivery Bar */}
            <div style={{ paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Progress ({prj.tasks} tasks)</span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)' }}>{prj.progress}%</span>
              </div>

              {/* Animated Progress Bar */}
              <div
                style={{
                  width: '100%',
                  height: 7,
                  borderRadius: 9999,
                  backgroundColor: 'var(--bg-surface-subtle)',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${prj.progress}%`,
                    borderRadius: 9999,
                    backgroundColor: prj.progress === 100 ? 'var(--success)' : 'var(--primary)',
                    transition: 'width 0.8s var(--ease-spring)'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                  <User size={13} />
                  <span>{prj.lead}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)' }}>
                  <Calendar size={13} />
                  <span>{prj.dueDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Project Modal */}
      <Modal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        title="Initialize New Project"
        subtitle="Specify timeline, priority classification, and technical milestones."
      >
        <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
              Project Title *
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Edge Cloud Caching Architecture"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
              Description
            </label>
            <textarea
              className="input-field"
              rows={3}
              placeholder="Key objectives, architectural dependencies, and delivery outcomes..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
                Priority
              </label>
              <select
                className="input-field"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
                Target Delivery Date
              </label>
              <input
                type="date"
                className="input-field"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsNewProjectModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Project
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
