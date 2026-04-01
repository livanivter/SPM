import { mockBorrowRecords } from "../../mock/data";
import { StatCard } from "../../components/StatCard";

export function ReaderRecordsPage() {
  return (
    <div className="page-stack">
      <section className="page-card">
        <div className="section-head">
          <div>
            <span className="eyebrow">Reader Scope</span>
            <h2 className="section-title">Borrow And Return Records</h2>
          </div>
          <p className="page-note">
            This area belongs to the feature owner handling active loans, return requests, and due-date display.
          </p>
        </div>

        <div className="stats-grid">
          <StatCard label="Active Loans" value={mockBorrowRecords.filter((item) => item.status === "BORROWED").length} />
          <StatCard label="Return Pending" value={mockBorrowRecords.filter((item) => item.status === "RETURN_PENDING").length} />
          <StatCard label="Fine Total" value={`$${mockBorrowRecords.reduce((sum, item) => sum + item.fineAmount, 0).toFixed(2)}`} />
        </div>
      </section>

      <section className="page-card">
        <div className="inline-actions">
          <button className="primary-button" type="button">Create Return Request</button>
          <button className="secondary-button" type="button">Refresh Records</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Book</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Fine</th>
              </tr>
            </thead>
            <tbody>
              {mockBorrowRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.bookTitle}</td>
                  <td>{record.status}</td>
                  <td>{record.dueDate}</td>
                  <td>{record.fineAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
