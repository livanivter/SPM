export const mockBooks = [
  { id: 101, title: "Distributed Systems", author: "A. Tanenbaum", categoryName: "Computer Science", availableCopies: 4, shelfStatus: "ON_SHELF" },
  { id: 102, title: "Clean Architecture", author: "Robert C. Martin", categoryName: "Computer Science", availableCopies: 2, shelfStatus: "ON_SHELF" },
  { id: 103, title: "Pride and Prejudice", author: "Jane Austen", categoryName: "Literature", availableCopies: 0, shelfStatus: "ON_SHELF" },
];

export const mockBorrowRecords = [
  { id: 8001, bookTitle: "Distributed Systems", status: "BORROWED", dueDate: "2026-04-08", fineAmount: 0 },
  { id: 8002, bookTitle: "Database System Concepts", status: "RETURN_PENDING", dueDate: "2026-03-29", fineAmount: 1.5 },
];

export const mockReservations = [
  { id: 9001, bookTitle: "Pride and Prejudice", status: "PENDING", queueNo: 1 },
  { id: 9002, bookTitle: "Operating System Concepts", status: "FULFILLED", queueNo: 2 },
];

export const mockBorrowRequests = [
  { id: 7001, readerName: "reader_01", bookTitle: "Clean Architecture", requestType: "BORROW", status: "PENDING" },
  { id: 7002, readerName: "reader_02", bookTitle: "Database System Concepts", requestType: "RETURN", status: "PENDING" },
];

export const mockAdminUsers = [
  { id: 1, username: "admin", role: "ADMIN", enabled: true },
  { id: 2, username: "librarian", role: "LIBRARIAN", enabled: true },
  { id: 3, username: "reader", role: "READER", enabled: true },
];

export const mockAdminLogs = [
  { id: 501, action: "CREATE_BOOK", target: "BOOK#101", operator: "librarian", time: "2026-03-31 20:40" },
  { id: 502, action: "APPROVE_BORROW", target: "REQUEST#7001", operator: "librarian", time: "2026-03-31 20:46" },
];

export const mockMonitoring = {
  totalUsers: 32,
  totalBooks: 140,
  activeBorrows: 18,
  pendingReservations: 6,
  unpaidFines: 4,
  backups: "latest ok",
};
