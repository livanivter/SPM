import { mockAdminLogs, mockAdminUsers } from "../../mock/data";
import { StatCard } from "../../components/StatCard";

export function AdminUsersPage() {
  return (
    <div className="page-stack">
      <section className="page-card">
        <div className="section-head">
          <div>
            <span className="eyebrow">Admin Scope</span>
            <h2 className="section-title">Governance Workspace</h2>
          </div>
          <p className="page-note">
            This page covers users, roles, permissions, dictionaries, and operation logs.
          </p>
        </div>

        <div className="stats-grid">
          <StatCard label="Users" value={mockAdminUsers.length} />
          <StatCard label="Enabled Users" value={mockAdminUsers.filter((item) => item.enabled).length} />
          <StatCard label="Recent Logs" value={mockAdminLogs.length} />
        </div>
      </section>

      <section className="page-card split-grid">
        <div>
          <h3 className="section-title">User Accounts</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Enabled</th>
                </tr>
              </thead>
              <tbody>
                {mockAdminUsers.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.role}</td>
                    <td>{String(item.enabled)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="section-title">Operation Logs</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Action</th>
                  <th>Target</th>
                  <th>Operator</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {mockAdminLogs.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.action}</td>
                    <td>{item.target}</td>
                    <td>{item.operator}</td>
                    <td>{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
