import { useEffect, useMemo, useState } from "react";
import { librarianApi } from "../../api/client";
import { StatCard } from "../../components/StatCard";

export function LibrarianRequestsPage({ workspace }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadRequests() {
    setLoading(true);
    setError("");
    try {
      const result = await librarianApi.listPendingBorrowRequests(workspace?.token);
      setRequests(result || []);
    } catch (requestError) {
      setError(requestError.message || "Failed to load borrow requests");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  async function handleProcess(requestId, action) {
    setProcessingId(requestId);
    setMessage("");
    setError("");

    try {
      const payload = {
        action,
        processNote: action === "APPROVE" ? "Approved by librarian workspace" : "Rejected by librarian workspace",
      };
      const result = await librarianApi.processBorrowRequest(workspace?.token, requestId, payload);
      setMessage(`Request #${result.requestId} ${action === "APPROVE" ? "approved" : "rejected"} successfully.`);
      await loadRequests();
    } catch (requestError) {
      setError(requestError.message || "Failed to process request");
    } finally {
      setProcessingId(null);
    }
  }

  const stats = useMemo(() => {
    return {
      total: requests.length,
      borrowCount: requests.filter((item) => item.requestType === "BORROW").length,
      pendingCount: requests.filter((item) => item.status === "PENDING").length,
    };
  }, [requests]);

  return (
    <div className="page-stack">
      <section className="page-card">
        <div className="section-head">
          <div>
            <span className="eyebrow">Librarian Scope</span>
            <h2 className="section-title">Borrow And Return Processing</h2>
          </div>
          <p className="page-note">
            This feature owner now reads pending borrow requests from the backend and can approve or reject them.
          </p>
        </div>

        <div className="stats-grid">
          <StatCard label="Pending Requests" value={stats.pendingCount} />
          <StatCard label="Borrow Requests" value={stats.borrowCount} />
          <StatCard label="Loaded Rows" value={stats.total} />
        </div>
      </section>

      <section className="page-card">
        {message ? <p className="page-note">{message}</p> : null}
        {error ? <p className="page-note">{error}</p> : null}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Reader</th>
                <th>Book</th>
                <th>Type</th>
                <th>Status</th>
                <th>Requested At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((item) => (
                <tr key={item.requestId}>
                  <td>{item.requestId}</td>
                  <td>{item.readerName}</td>
                  <td>{item.bookTitle}</td>
                  <td>{item.requestType}</td>
                  <td>{item.status}</td>
                  <td>{item.requestedAt || "-"}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="primary-button"
                        type="button"
                        disabled={processingId === item.requestId}
                        onClick={() => handleProcess(item.requestId, "APPROVE")}
                      >
                        {processingId === item.requestId ? "Processing..." : "Approve"}
                      </button>
                      <button
                        className="secondary-button"
                        type="button"
                        disabled={processingId === item.requestId}
                        onClick={() => handleProcess(item.requestId, "REJECT")}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && requests.length === 0 ? (
                <tr>
                  <td colSpan="7">No pending requests right now.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
