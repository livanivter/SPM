import { useEffect, useMemo, useState } from "react";
import { readerApi } from "../../api/client";
import { StatCard } from "../../components/StatCard";

export function ReaderBooksPage({ workspace }) {
  const [keyword, setKeyword] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadBooks(searchKeyword = "") {
    setLoading(true);
    setError("");
    try {
      const result = await readerApi.listBooks(workspace?.token, searchKeyword);
      setBooks(result || []);
    } catch (requestError) {
      setError(requestError.message || "Failed to load books");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  async function handleSearch() {
    await loadBooks(keyword.trim());
  }

  async function handleBorrow(bookId) {
    setSubmittingId(bookId);
    setMessage("");
    setError("");

    try {
      const result = await readerApi.submitBorrowRequest(workspace?.token, {
        bookId,
        requestNote: `Borrow request submitted by ${workspace?.username || "reader"}`,
      });
      setMessage(`Borrow request #${result.requestId} submitted successfully.`);
      await loadBooks(keyword.trim());
    } catch (requestError) {
      setError(requestError.message || "Failed to submit borrow request");
    } finally {
      setSubmittingId(null);
    }
  }

  const stats = useMemo(() => {
    return {
      total: books.length,
      onShelf: books.filter((book) => book.shelfStatus === "ON_SHELF").length,
      lowStock: books.filter((book) => (book.availableCopies || 0) > 0 && (book.availableCopies || 0) <= 2).length,
    };
  }, [books]);

  return (
    <div className="page-stack">
      <section className="page-card">
        <div className="section-head">
          <div>
            <span className="eyebrow">Reader Scope</span>
            <h2 className="section-title">Book Discovery Workspace</h2>
          </div>
          <p className="page-note">
            This page now uses the backend book list and can directly submit borrow requests into the librarian queue.
          </p>
        </div>

        <div className="stats-grid">
          <StatCard label="Visible Books" value={stats.total} />
          <StatCard label="On Shelf" value={stats.onShelf} />
          <StatCard label="Low Stock" value={stats.lowStock} />
        </div>

        <div className="feature-banner">
          <strong>Connected flow</strong>
          <span>Reader list and borrow request submission are already linked to the Spring Boot backend.</span>
        </div>
      </section>

      <section className="page-card">
        <div className="toolbar">
          <input
            className="search-input"
            placeholder="Search by title, author, ISBN, or category"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <button className="primary-button" type="button" onClick={handleSearch} disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
        {message ? <p className="page-note">{message}</p> : null}
        {error ? <p className="page-note">{error}</p> : null}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Available</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.bookId}>
                  <td>{book.bookId}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.categoryName || "Uncategorized"}</td>
                  <td>{book.availableCopies ?? 0}</td>
                  <td>{book.shelfStatus}</td>
                  <td>
                    <button
                      className="primary-button"
                      type="button"
                      disabled={submittingId === book.bookId || (book.availableCopies ?? 0) <= 0}
                      onClick={() => handleBorrow(book.bookId)}
                    >
                      {submittingId === book.bookId ? "Submitting..." : "Request Borrow"}
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && books.length === 0 ? (
                <tr>
                  <td colSpan="7">No books matched the current search.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
