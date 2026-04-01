import { request } from "./base";

export const librarianApi = {
  listBooks(token) {
    return request("/librarian/books", {}, token);
  },
  createBook(token, payload) {
    return request("/librarian/books", { method: "POST", body: JSON.stringify(payload) }, token);
  },
  listPendingBorrowRequests(token) {
    return request("/librarian/borrow-requests?status_filter=PENDING", {}, token);
  },
  processBorrowRequest(token, requestId, payload) {
    return request(`/librarian/borrow-requests/${requestId}/process`, { method: "POST", body: JSON.stringify(payload) }, token);
  },
};
