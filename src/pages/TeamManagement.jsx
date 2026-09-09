import React, { useState } from 'react';
import {
  Users2,
  Plus,
  Search,
  ExternalLink,
  Shield,
  FolderKanban,
  UserCheck,
  Sparkles
} from 'lucide-react';
import Modal from '../components/Modal';
import SkeletonLoader from '../components/SkeletonLoader';

export default function TeamManagement({ isLoading, onTriggerToast }) {
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamLead, setTeamLead] = useState('');
  const [department, setDepartment] = useState('Engineering');

  const [teams, setTeams] = useState([
    {
      id: 1,
      name: 'Platform Infrastructure',
      lead: 'Devon Miles',
      department: 'Infrastructure',
      membersCount: 8,
      activeProjects: 4,
      slaHealth: '99.99%',
      avatars: ['DM', 'AL', 'SJ', 'JD'],
      tagColor: '#10b981'
    },
    {
      name: 'Core Application & Frontend',
      lead: 'Alex Lawrence',
      department: 'Engineering',
      membersCount: 12,
      activeProjects: 6,
      slaHealth: '99.95%',
      avatars: ['AL', 'MV', 'ER', 'RK'],
      tagColor: '#6366f1'
    },
    {
      id: 3,
      name: 'Security & Compliance Guard',
      lead: 'Sarah Jenkins',
      department: 'Security',
      membersCount: 5,
      activeProjects: 2,
      slaHealth: '100%',
      avatars: ['SJ', 'DM', 'TP'],
      tagColor: '#ec4899'
    },
    {
      id: 4,
      name: 'AI Observability & Data',
      lead: 'Elena Rostov',
      department: 'Product',
      membersCount: 7,
      activeProjects: 3,
      slaHealth: '99.92%',
      avatars: ['ER', 'MV', 'AL'],
      tagColor: '#8b5cf6'
    }
  ]);

  function handleCreateTeam(e) {
    e.preventDefault();
    if (!teamName.trim()) return;

    const newTeam = {
      id: Date.now(),
      name: teamName,
      lead: teamLead || 'Alex Lawrence',
      department,
      membersCount: 1,
      activeProjects: 0,
      slaHealth: '100%',
      avatars: ['AL'],
      tagColor: '#3b82f6'
    };

    setTeams([...teams, newTeam]);
    setTeamName('');
    setTeamLead('');
    setIsCreateTeamModalOpen(false);
    onTriggerToast(`Created squad: ${newTeam.name}`, 'success');
  }

  if (isLoading) {
    return (
      <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <SkeletonLoader type="card" count={4} />
      </div>
    );
  }

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Team Management
          </h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 4 }}>
            Organize engineering pods, assign team leaders, and monitor cross-squad SLA health.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setIsCreateTeamModalOpen(true)}
          style={{ height: 38 }}
        >
          <Plus size={16} />
          <span>Create New Team</span>
        </button>
      </div>

      {/* Teams Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        {teams.map((team) => (
          <div
            key={team.id}
            className="card card-interactive"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span className="badge badge-primary" style={{ fontSize: 11 }}>
                  {team.department}
                </span>
                <span className="badge badge-success" style={{ fontSize: 11 }}>
                  SLA {team.slaHealth}
                </span>
              </div>

              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
                {team.name}
              </h3>
              <div style={{ fontSize: 12.5, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <UserCheck size={14} color="var(--primary)" />
                <span>Squad Lead: <strong style={{ color: 'var(--text-primary)' }}>{team.lead}</strong></span>
              </div>
            </div>

            {/* Middle Stats & Avatars */}
            <div style={{ margin: '20px 0 16px', paddingTop: 14, borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FolderKanban size={14} color="var(--text-muted)" />
                  <span style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
                    <strong>{team.activeProjects}</strong> Active Projects
                  </span>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                  {team.membersCount} Members
                </div>
              </div>

              {/* Avatar Stack with micro-hover scale */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {team.avatars.map((av, i) => (
                  <div
                    key={i}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: `hsl(${i * 65 + 200}, 75%, 45%)`,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 700,
                      border: '2px solid var(--bg-surface)',
                      marginLeft: i === 0 ? 0 : -8,
                      boxShadow: 'var(--shadow-xs)',
                      transition: 'transform var(--duration-fast) var(--ease-spring), z-index 0s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px) scale(1.15)';
                      e.currentTarget.style.zIndex = '10';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.zIndex = '1';
                    }}
                    title={`Member ${av}`}
                  >
                    {av}
                  </div>
                ))}
              </div>
            </div>

            {/* Card Action */}
            <button
              className="btn btn-secondary"
              style={{ width: '100%', fontSize: 12.5 }}
              onClick={() => onTriggerToast(`Opened squad dashboard for ${team.name}`, 'info')}
            >
              <span>Manage Squad</span>
              <ExternalLink size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* Create Team Modal */}
      <Modal
        isOpen={isCreateTeamModalOpen}
        onClose={() => setIsCreateTeamModalOpen(false)}
        title="Form New Engineering Squad"
        subtitle="Establish squad ownership, leadership, and operational domain."
      >
        <form onSubmit={handleCreateTeam} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
              Squad Name *
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. AI Workflow Automation"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
                Department
              </label>
              <select
                className="input-field"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="Engineering">Engineering</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Product">Product</option>
                <option value="Security">Security</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
                Squad Lead
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Alex Lawrence"
                value={teamLead}
                onChange={(e) => setTeamLead(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsCreateTeamModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Initialize Squad
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
