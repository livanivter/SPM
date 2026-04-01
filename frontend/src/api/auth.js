import { request } from "./base";

export const authApi = {
  register(payload) {
    return request("/reader/auth/register", { method: "POST", body: JSON.stringify(payload) });
  },
  login(payload) {
    return request("/reader/auth/login", { method: "POST", body: JSON.stringify(payload) });
  },
};
