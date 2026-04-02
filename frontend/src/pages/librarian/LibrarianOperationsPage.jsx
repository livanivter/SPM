import { useEffect, useState } from "react";
import { librarianApi } from "../../api/client";
import { StatCard } from "../../components/StatCard";

export function LibrarianOperationsPage({ workspace }) {
  const [stats, setStats] = useState(null);
  const [returns, setReturns] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const [statistics, returnRows, reservationRows, fineRows] = await Promise.all([
        librarianApi.getStatistics(workspace?.token),
        librarianApi.listReturnRequests(workspace?.token),
        librarianApi.listReservations(workspace?.token),
        librarianApi.listFines(workspace?.token),
      ]);
      setStats(statistics || {});
      setReturns(returnRows || []);
      setReservations(reservationRows || []);
      setFines(fineRows || []);
    } catch (requestError) {
      setError(requestError.message || "Failed to load operations data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleProcessReturn(recordId, approve) {
    setMessage("");
    setError("");
    try {
      await librarianApi.processReturnRequest(workspace?.token, recordId, {
        approve,
        fineAmount: approve ? 0 : undefined,
        rejectReason: approve ? undefined : "return request rejected by librarian",
      });
      setMessage(`Return #${recordId} ${approve ? "approved" : "rejected"}.`);
      await loadData();
    } catch (requestError) {
      setError(requestError.message || "Failed to process return");
    }
  }

  async function handleProcessReservation(reservationId, action) {
    setMessage("");
    setError("");
    try {
      await librarianApi.processReservation(workspace?.token, reservationId, { action });
      setMessage(`Reservation #${reservationId} ${action.toLowerCase()} completed.`);
      await loadData();
    } catch (requestError) {
      setError(requestError.message || "Failed to process reservation");
    }
  }

  async function handleFineStatus(fineId, status) {
    setMessage("");
    setError("");
    try {
      await librarianApi.updateFineStatus(workspace?.token, fineId, { status });
      setMessage(`Fine #${fineId} marked as ${status}.`);
      await loadData();
    } catch (requestError) {
      setError(requestError.message || "Failed to update fine");
    }
  }

  return (
    <div className="page-stack">
      <section className="page-card">
        <div className="section-head">
          <div>
            <span className="eyebrow">Librarian Scope</span>
            <h2 className="section-title">Reservations, Returns, Fines, And Stats</h2>
          </div>
          <p className="page-note">Handle operational workflows after borrow approval and monitor current workload.</p>
        </div>

        <div className="stats-grid">
          <StatCard label="Pending Returns" value={stats?.pendingReturnRequests ?? 0} />
          <StatCard label="Pending Reservations" value={stats?.pendingReservations ?? 0} />
          <StatCard label="Unpaid Fines" value={stats?.unpaidFines ?? 0} />
        </div>
      </section>

      <section className="page-card">
        {message ? <p className="page-note">{message}</p> : null}
        {error ? <p className="page-note">{error}</p> : null}
        <div className="inline-actions">
          <button className="secondary-button" type="button" onClick={loadData} disabled={loading}>
            {loading ? "Loading..." : "Refresh Operations"}
          </button>
        </div>
        <div className="monitor-grid">
          <div className="monitor-card">
            <small>Total Books</small>
            <strong>{stats?.totalBooks ?? 0}</strong>
          </div>
          <div className="monitor-card">
            <small>Off Shelf</small>
            <strong>{stats?.offShelfBooks ?? 0}</strong>
          </div>
          <div className="monitor-card">
            <small>Active Borrows</small>
            <strong>{stats?.activeBorrows ?? 0}</strong>
          </div>
        </div>
      </section>

      <section className="page-card">
        <h3 className="section-title">Return Requests</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Reader</th>
                <th>Book</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {returns.map((item) => (
                <tr key={item.recordId}>
                  <td>{item.recordId}</td>
                  <td>{item.readerUsername}</td>
                  <td>{item.bookTitle}</td>
                  <td>{item.status}</td>
                  <td>{item.dueDate || "-"}</td>
                  <td>
                    <div className="table-actions">
                      <button className="primary-button" type="button" onClick={() => handleProcessReturn(item.recordId, true)}>
                        Approve
                      </button>
                      <button className="secondary-button" type="button" onClick={() => handleProcessReturn(item.recordId, false)}>
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && returns.length === 0 ? (
                <tr>
                  <td colSpan="6">No pending returns.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="page-card">
        <h3 className="section-title">Reservation Queue</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Reader</th>
                <th>Book</th>
                <th>Status</th>
                <th>Queue No</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((item) => (
                <tr key={item.reservationId}>
                  <td>{item.reservationId}</td>
                  <td>{item.readerUsername}</td>
                  <td>{item.bookTitle}</td>
                  <td>{item.status}</td>
                  <td>{item.queueNo}</td>
                  <td>
                    {item.status === "PENDING" ? (
                      <div className="table-actions">
                        <button
                          className="primary-button"
                          type="button"
                          onClick={() => handleProcessReservation(item.reservationId, "FULFILL")}
                        >
                          Fulfill
                        </button>
                        <button
                          className="secondary-button"
                          type="button"
                          onClick={() => handleProcessReservation(item.reservationId, "CANCEL")}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
              {!loading && reservations.length === 0 ? (
                <tr>
                  <td colSpan="6">No reservations.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="page-card">
        <h3 className="section-title">Fines</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Record ID</th>
                <th>Reader</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fines.map((item) => (
                <tr key={item.fineId}>
                  <td>{item.fineId}</td>
                  <td>{item.recordId}</td>
                  <td>{item.readerUsername}</td>
                  <td>{item.amount}</td>
                  <td>{item.status}</td>
                  <td>
                    {item.status === "UNPAID" ? (
                      <div className="table-actions">
                        <button className="primary-button" type="button" onClick={() => handleFineStatus(item.fineId, "PAID")}>
                          Mark Paid
                        </button>
                        <button className="secondary-button" type="button" onClick={() => handleFineStatus(item.fineId, "WAIVED")}>
                          Waive
                        </button>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
              {!loading && fines.length === 0 ? (
                <tr>
                  <td colSpan="6">No fine records.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
