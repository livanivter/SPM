import { mockMonitoring } from "../../mock/data";
import { StatCard } from "../../components/StatCard";

export function AdminMonitoringPage() {
  return (
    <div className="page-stack">
      <section className="page-card">
        <div className="section-head">
          <div>
            <span className="eyebrow">Admin Scope</span>
            <h2 className="section-title">Monitoring And Operations</h2>
          </div>
          <p className="page-note">
            Use this workspace for reports, runtime monitoring, backup, and restore actions.
          </p>
        </div>

        <div className="stats-grid">
          <StatCard label="Total Users" value={mockMonitoring.totalUsers} />
          <StatCard label="Total Books" value={mockMonitoring.totalBooks} />
          <StatCard label="Active Borrows" value={mockMonitoring.activeBorrows} />
          <StatCard label="Latest Backup" value={mockMonitoring.backups} />
        </div>
      </section>

      <section className="page-card">
        <div className="inline-actions">
          <button className="primary-button" type="button">Create Backup</button>
          <button className="secondary-button" type="button">Validate Restore</button>
          <button className="secondary-button" type="button">Refresh Report</button>
        </div>
        <div className="monitor-grid">
          <div className="monitor-card">
            <small>Pending Reservations</small>
            <strong>{mockMonitoring.pendingReservations}</strong>
          </div>
          <div className="monitor-card">
            <small>Unpaid Fines</small>
            <strong>{mockMonitoring.unpaidFines}</strong>
          </div>
          <div className="monitor-card">
            <small>System Status</small>
            <strong>Healthy</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
