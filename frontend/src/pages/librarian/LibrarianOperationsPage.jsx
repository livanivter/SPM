import { mockMonitoring, mockReservations } from "../../mock/data";
import { StatCard } from "../../components/StatCard";

export function LibrarianOperationsPage() {
  return (
    <div className="page-stack">
      <section className="page-card">
        <div className="section-head">
          <div>
            <span className="eyebrow">Librarian Scope</span>
            <h2 className="section-title">Reservations, Fines, And Stats</h2>
          </div>
          <p className="page-note">
            Use this area for reservation processing, overdue fine handling, and borrowing statistics.
          </p>
        </div>

        <div className="stats-grid">
          <StatCard label="Pending Reservations" value={mockMonitoring.pendingReservations} />
          <StatCard label="Unpaid Fines" value={mockMonitoring.unpaidFines} />
          <StatCard label="Active Borrows" value={mockMonitoring.activeBorrows} />
        </div>
      </section>

      <section className="page-card">
        <h3 className="section-title">Reservation Queue</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Book</th>
                <th>Status</th>
                <th>Queue No</th>
              </tr>
            </thead>
            <tbody>
              {mockReservations.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.bookTitle}</td>
                  <td>{item.status}</td>
                  <td>{item.queueNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
