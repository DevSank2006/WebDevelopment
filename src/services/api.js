import http from "./httpClient.js";

export const packageApi = {
  list: (params = {}) =>
    http.get("/packages", { params }).then((res) => res.data),
  get: (id) => http.get(`/packages/${id}`).then((res) => res.data),
};
export const cartApi = {
  get: () => http.get("/cart").then((res) => res.data),
  add: (packageId) =>
    http.post("/cart/items", { packageId }).then((res) => res.data),
};
export const contactApi = {
  send: (payload) => http.post("/contact", payload).then((res) => res.data),
};
export const authApi = {
  signIn: (payload) =>
    http.post("/auth/signin", payload).then((res) => res.data),
  register: (payload) =>
    http.post("/auth/register", payload).then((res) => res.data),
};
