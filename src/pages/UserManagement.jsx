import React, { useState } from 'react';
import {
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  Shield,
  CheckCircle,
  Clock,
  Ban,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Modal from '../components/Modal';
import SkeletonLoader from '../components/SkeletonLoader';

export default function UserManagement({
  isLoading,
  onTriggerToast,
  isAddUserModalOpen,
  setIsAddUserModalOpen
}) {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alex Lawrence', email: 'alex.lawrence@stackly.io', role: 'Lead Architect', department: 'Engineering', status: 'Active', initials: 'AL', color: '#6366f1' },
    { id: 2, name: 'Elena Rostov', email: 'elena.rostov@stackly.io', role: 'VP of Product', department: 'Product', status: 'Active', initials: 'ER', color: '#ec4899' },
    { id: 3, name: 'Devon Miles', email: 'devon.miles@stackly.io', role: 'DevOps Lead', department: 'Infrastructure', status: 'Active', initials: 'DM', color: '#10b981' },
    { id: 4, name: 'Marcus Vance', email: 'marcus.vance@stackly.io', role: 'Frontend Engineer', department: 'Engineering', status: 'Pending', initials: 'MV', color: '#f59e0b' },
    { id: 5, name: 'Sarah Jenkins', email: 'sarah.jenkins@stackly.io', role: 'Security Analyst', department: 'Security', status: 'Active', initials: 'SJ', color: '#8b5cf6' },
    { id: 6, name: 'Julian Drake', email: 'julian.drake@stackly.io', role: 'QA Automation Lead', department: 'Engineering', status: 'Inactive', initials: 'JD', color: '#64748b' }
  ]);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [deleteUserId, setDeleteUserId] = useState(null);

  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Frontend Engineer');
  const [newUserDept, setNewUserDept] = useState('Engineering');

  function handleCreateUser(e) {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      onTriggerToast('Please fill in all required fields', 'warning');
      return;
    }

    const initials = newUserName
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const newUser = {
      id: Date.now(),
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      department: newUserDept,
      status: 'Active',
      initials,
      color: '#4f46e5'
    };

    setUsers([newUser, ...users]);
    setNewUserName('');
    setNewUserEmail('');
    setIsAddUserModalOpen(false);
    onTriggerToast(`Created user account for ${newUser.name}`, 'success');
  }

  function handleDeleteUser() {
    if (!deleteUserId) return;
    const userToDelete = users.find(u => u.id === deleteUserId);
    setUsers(users.filter(u => u.id !== deleteUserId));
    setDeleteUserId(null);
    onTriggerToast(`User ${userToDelete ? userToDelete.name : ''} removed successfully`, 'danger');
  }

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                          u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (isLoading) {
    return (
      <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <SkeletonLoader type="table" count={6} />
      </div>
    );
  }

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            User Management
          </h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 4 }}>
            Control directory access, team credentials, role-based privileges, and account lifecycles.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setIsAddUserModalOpen(true)}
          style={{ height: 38 }}
        >
          <UserPlus size={16} />
          <span>Add New User</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <div style={{ position: 'relative', width: 320 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input-field"
            placeholder="Search by full name or email address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: 36, height: 38 }}
          />
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)' }}>Role:</label>
          <select
            className="input-field"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={{ width: 170, height: 38 }}
          >
            <option value="All">All Roles</option>
            <option value="Lead Architect">Lead Architect</option>
            <option value="VP of Product">VP of Product</option>
            <option value="DevOps Lead">DevOps Lead</option>
            <option value="Frontend Engineer">Frontend Engineer</option>
            <option value="Security Analyst">Security Analyst</option>
          </select>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Role & Access</th>
              <th>Department</th>
              <th>Status</th>
              <th>Authentication</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        backgroundColor: user.color,
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 13,
                        boxShadow: 'var(--shadow-xs)'
                      }}
                    >
                      {user.initials}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Shield size={14} color="var(--primary)" />
                    <span style={{ fontWeight: 600 }}>{user.role}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{user.department}</td>
                <td>
                  <span className={`badge ${
                    user.status === 'Active'
                      ? 'badge-success'
                      : user.status === 'Pending'
                      ? 'badge-warning'
                      : 'badge-neutral'
                  }`}>
                    {user.status === 'Active' && <CheckCircle size={11} />}
                    {user.status === 'Pending' && <Clock size={11} />}
                    {user.status === 'Inactive' && <Ban size={11} />}
                    <span>{user.status}</span>
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>2FA Enforced</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                    <button
                      className="btn btn-ghost btn-icon-only"
                      style={{ width: 32, height: 32 }}
                      title="Edit User"
                      onClick={() => onTriggerToast(`Editing privileges for ${user.name}`, 'info')}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      className="btn btn-ghost btn-icon-only"
                      style={{ width: 32, height: 32, color: 'var(--danger)' }}
                      title="Delete User"
                      onClick={() => setDeleteUserId(user.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        title="Invite New Team Member"
        subtitle="Configure account credentials and role privileges."
      >
        <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
              Full Name *
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Rachel Foster"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
              Corporate Email *
            </label>
            <input
              type="email"
              className="input-field"
              placeholder="rachel.foster@stackly.io"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
                Role
              </label>
              <select
                className="input-field"
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
              >
                <option value="Lead Architect">Lead Architect</option>
                <option value="DevOps Lead">DevOps Lead</option>
                <option value="Frontend Engineer">Frontend Engineer</option>
                <option value="QA Automation Lead">QA Automation Lead</option>
                <option value="Security Analyst">Security Analyst</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
                Department
              </label>
              <select
                className="input-field"
                value={newUserDept}
                onChange={(e) => setNewUserDept(e.target.value)}
              >
                <option value="Engineering">Engineering</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Product">Product</option>
                <option value="Security">Security</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsAddUserModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Send Invite
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete User Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteUserId)}
        onClose={() => setDeleteUserId(null)}
        title="Revoke Member Access"
        subtitle="Are you sure you want to remove this user from the directory?"
        maxWidth={440}
      >
        <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', marginBottom: 20 }}>
          This will immediately invalidate active session tokens and revoke repository, cloud, and SLA dashboard access permissions.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button
            className="btn btn-secondary"
            onClick={() => setDeleteUserId(null)}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDeleteUser}
          >
            Revoke Access
          </button>
        </div>
      </Modal>
    </div>
  );
}
