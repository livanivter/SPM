import { request } from "./base";

export const readerApi = {
  listBooks(token, q = "") {
    const query = q ? `?q=${encodeURIComponent(q)}` : "";
    return request(`/reader/books${query}`, {}, token);
  },
  submitBorrowRequest(token, payload) {
    return request("/reader/books/borrow-requests", { method: "POST", body: JSON.stringify(payload) }, token);
  },
};
