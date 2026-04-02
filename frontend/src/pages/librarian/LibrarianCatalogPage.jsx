import { useEffect, useMemo, useState } from "react";
import { librarianApi } from "../../api/client";
import { StatCard } from "../../components/StatCard";

const EMPTY_BOOK_FORM = {
  title: "",
  author: "",
  isbn: "",
  categoryId: "",
  publisher: "",
  description: "",
  totalCopies: 1,
  availableCopies: 1,
  shelfStatus: "ON_SHELF",
};

const EMPTY_CATEGORY_FORM = {
  code: "",
  name: "",
  enabled: true,
};

export function LibrarianCatalogPage({ workspace }) {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [bookForm, setBookForm] = useState(EMPTY_BOOK_FORM);
  const [categoryForm, setCategoryForm] = useState(EMPTY_CATEGORY_FORM);
  const [editingBookId, setEditingBookId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const [bookList, categoryList] = await Promise.all([
        librarianApi.listBooks(workspace?.token),
        librarianApi.listCategories(workspace?.token),
      ]);
      setBooks(bookList || []);
      setCategories(categoryList || []);
    } catch (requestError) {
      setError(requestError.message || "Failed to load catalog data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSaveBook() {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const payload = {
        ...bookForm,
        categoryId: Number(bookForm.categoryId),
        totalCopies: Number(bookForm.totalCopies),
        availableCopies: Number(bookForm.availableCopies),
      };
      if (editingBookId) {
        await librarianApi.updateBook(workspace?.token, editingBookId, payload);
        await librarianApi.updateInventory(workspace?.token, editingBookId, {
          totalCopies: payload.totalCopies,
          availableCopies: payload.availableCopies,
        });
        await librarianApi.updateShelfStatus(workspace?.token, editingBookId, {
          shelfStatus: payload.shelfStatus,
        });
        setMessage(`Book #${editingBookId} updated.`);
      } else {
        await librarianApi.createBook(workspace?.token, payload);
        setMessage("Book created.");
      }
      setBookForm(EMPTY_BOOK_FORM);
      setEditingBookId(null);
      await loadData();
    } catch (requestError) {
      setError(requestError.message || "Failed to save book");
    } finally {
      setSaving(false);
    }
  }

  async function handleCreateCategory() {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      await librarianApi.createCategory(workspace?.token, categoryForm);
      setCategoryForm(EMPTY_CATEGORY_FORM);
      setMessage("Category created.");
      await loadData();
    } catch (requestError) {
      setError(requestError.message || "Failed to create category");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteBook(bookId) {
    if (!window.confirm(`Delete book #${bookId}?`)) {
      return;
    }
    setSaving(true);
    setError("");
    setMessage("");
    try {
      await librarianApi.deleteBook(workspace?.token, bookId);
      setMessage(`Book #${bookId} deleted.`);
      await loadData();
    } catch (requestError) {
      setError(requestError.message || "Failed to delete book");
    } finally {
      setSaving(false);
    }
  }

  function handleStartEdit(book) {
    setEditingBookId(book.bookId);
    setBookForm({
      title: book.title || "",
      author: book.author || "",
      isbn: book.isbn || "",
      categoryId: book.categoryId || "",
      publisher: book.publisher || "",
      description: book.description || "",
      totalCopies: book.totalCopies ?? 0,
      availableCopies: book.availableCopies ?? 0,
      shelfStatus: book.shelfStatus || "ON_SHELF",
    });
  }

  const stats = useMemo(() => {
    return {
      total: books.length,
      available: books.reduce((sum, book) => sum + (book.availableCopies || 0), 0),
      offShelf: books.filter((book) => book.shelfStatus === "OFF_SHELF").length,
    };
  }, [books]);

  return (
    <div className="page-stack">
      <section className="page-card">
        <div className="section-head">
          <div>
            <span className="eyebrow">Librarian Scope</span>
            <h2 className="section-title">Catalog And Inventory Workspace</h2>
          </div>
          <p className="page-note">Manage books, categories, copies, and shelf visibility in one place.</p>
        </div>
        <div className="stats-grid">
          <StatCard label="Catalog Items" value={stats.total} />
          <StatCard label="Available Copies" value={stats.available} />
          <StatCard label="Off Shelf" value={stats.offShelf} />
        </div>
      </section>

      <section className="page-card">
        <h3 className="section-title">{editingBookId ? `Edit Book #${editingBookId}` : "Create Book"}</h3>
        <div className="form-grid">
          <input
            placeholder="ISBN"
            value={bookForm.isbn}
            onChange={(event) => setBookForm((prev) => ({ ...prev, isbn: event.target.value }))}
          />
          <input
            placeholder="Book Title"
            value={bookForm.title}
            onChange={(event) => setBookForm((prev) => ({ ...prev, title: event.target.value }))}
          />
          <input
            placeholder="Author"
            value={bookForm.author}
            onChange={(event) => setBookForm((prev) => ({ ...prev, author: event.target.value }))}
          />
          <select
            value={bookForm.categoryId}
            onChange={(event) => setBookForm((prev) => ({ ...prev, categoryId: event.target.value }))}
          >
            <option value="">Select Category</option>
            {categories.map((item) => (
              <option key={item.categoryId} value={item.categoryId}>
                {item.code} - {item.name}
              </option>
            ))}
          </select>
          <input
            placeholder="Publisher"
            value={bookForm.publisher}
            onChange={(event) => setBookForm((prev) => ({ ...prev, publisher: event.target.value }))}
          />
          <select
            value={bookForm.shelfStatus}
            onChange={(event) => setBookForm((prev) => ({ ...prev, shelfStatus: event.target.value }))}
          >
            <option value="ON_SHELF">ON_SHELF</option>
            <option value="OFF_SHELF">OFF_SHELF</option>
          </select>
          <input
            type="number"
            placeholder="Total Copies"
            min={0}
            value={bookForm.totalCopies}
            onChange={(event) => setBookForm((prev) => ({ ...prev, totalCopies: event.target.value }))}
          />
          <input
            type="number"
            placeholder="Available Copies"
            min={0}
            value={bookForm.availableCopies}
            onChange={(event) => setBookForm((prev) => ({ ...prev, availableCopies: event.target.value }))}
          />
          <textarea
            className="span-2"
            placeholder="Description"
            value={bookForm.description}
            onChange={(event) => setBookForm((prev) => ({ ...prev, description: event.target.value }))}
          />
        </div>
        <div className="inline-actions">
          <button className="primary-button" type="button" disabled={saving} onClick={handleSaveBook}>
            {saving ? "Saving..." : editingBookId ? "Update Book" : "Create Book"}
          </button>
          {editingBookId ? (
            <button
              className="secondary-button"
              type="button"
              onClick={() => {
                setEditingBookId(null);
                setBookForm(EMPTY_BOOK_FORM);
              }}
            >
              Cancel Edit
            </button>
          ) : null}
        </div>
      </section>

      <section className="page-card split-grid">
        <div>
          <h3 className="section-title">Create Category</h3>
          <div className="form-grid">
            <input
              placeholder="Category Code"
              value={categoryForm.code}
              onChange={(event) => setCategoryForm((prev) => ({ ...prev, code: event.target.value }))}
            />
            <input
              placeholder="Category Name"
              value={categoryForm.name}
              onChange={(event) => setCategoryForm((prev) => ({ ...prev, name: event.target.value }))}
            />
          </div>
          <div className="inline-actions">
            <button className="secondary-button" type="button" disabled={saving} onClick={handleCreateCategory}>
              Create Category
            </button>
          </div>
        </div>
        <div>
          <h3 className="section-title">Categories</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Enabled</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item) => (
                  <tr key={item.categoryId}>
                    <td>{item.categoryId}</td>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{String(item.enabled)}</td>
                  </tr>
                ))}
                {!loading && categories.length === 0 ? (
                  <tr>
                    <td colSpan="4">No categories yet.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
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
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Copies</th>
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
                  <td>
                    {book.availableCopies ?? 0}/{book.totalCopies ?? 0}
                  </td>
                  <td>{book.shelfStatus}</td>
                  <td>
                    <div className="table-actions">
                      <button className="primary-button" type="button" onClick={() => handleStartEdit(book)}>
                        Edit
                      </button>
                      <button className="secondary-button" type="button" onClick={() => handleDeleteBook(book.bookId)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && books.length === 0 ? (
                <tr>
                  <td colSpan="7">No books in catalog.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
