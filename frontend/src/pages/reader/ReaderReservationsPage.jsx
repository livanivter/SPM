import { mockReservations } from "../../mock/data";
import { StatCard } from "../../components/StatCard";

export function ReaderReservationsPage() {
  return (
    <div className="page-stack">
      <section className="page-card">
        <div className="section-head">
          <div>
            <span className="eyebrow">Reader Scope</span>
            <h2 className="section-title">Reservation Queue</h2>
          </div>
          <p className="page-note">
            Use this page for reservation creation, queue status, and fulfillment notification.
          </p>
        </div>

        <div className="stats-grid">
          <StatCard label="Pending" value={mockReservations.filter((item) => item.status === "PENDING").length} />
          <StatCard label="Fulfilled" value={mockReservations.filter((item) => item.status === "FULFILLED").length} />
          <StatCard label="Queue Items" value={mockReservations.length} />
        </div>
      </section>

      <section className="page-card">
        <div className="inline-actions">
          <button className="primary-button" type="button">Create Reservation</button>
          <button className="secondary-button" type="button">Check Availability</button>
        </div>
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
