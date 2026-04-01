import { authApi } from "./auth";
import { readerApi } from "./reader";
import { librarianApi } from "./librarian";
import { adminApi } from "./admin";

export const api = {
  ...authApi,
  ...readerApi,
  ...librarianApi,
  ...adminApi,
};

export { authApi, readerApi, librarianApi, adminApi };
