import { request } from "./base";

export const adminApi = {
  listUsers(token) {
    return request("/admin/users", {}, token);
  },
};
