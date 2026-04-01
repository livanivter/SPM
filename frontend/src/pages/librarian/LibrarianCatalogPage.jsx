import { mockBooks } from "../../mock/data";
import { StatCard } from "../../components/StatCard";

export function LibrarianCatalogPage() {
  return (
    <div className="page-stack">
      <section className="page-card">
        <div className="section-head">
          <div>
            <span className="eyebrow">Librarian Scope</span>
            <h2 className="section-title">Catalog And Inventory Workspace</h2>
          </div>
          <p className="page-note">
            This page is for category management, book creation, book editing, copies, and shelf status.
          </p>
        </div>

        <div className="stats-grid">
          <StatCard label="Catalog Items" value={mockBooks.length} />
          <StatCard label="Available Copies" value={mockBooks.reduce((sum, book) => sum + book.availableCopies, 0)} />
          <StatCard label="Off Shelf" value={mockBooks.filter((book) => book.shelfStatus !== "ON_SHELF").length} />
        </div>
      </section>

      <section className="page-card">
        <div className="form-grid">
          <input placeholder="ISBN" />
          <input placeholder="Book Title" />
          <input placeholder="Author" />
          <input placeholder="Category ID" />
          <input placeholder="Total Copies" />
          <select defaultValue="ON_SHELF">
            <option value="ON_SHELF">ON_SHELF</option>
            <option value="OFF_SHELF">OFF_SHELF</option>
          </select>
          <textarea className="span-2" placeholder="Description" />
        </div>
        <div className="inline-actions">
          <button className="primary-button" type="button">Create Book</button>
          <button className="secondary-button" type="button">Create Category</button>
        </div>
      </section>

      <section className="page-card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Available</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.categoryName}</td>
                  <td>{book.availableCopies}</td>
                  <td>{book.shelfStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
