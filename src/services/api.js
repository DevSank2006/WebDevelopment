
import http from "./httpClient.js";

// PACKAGE APIs
export const packageApi = {
  list: (params = {}) =>
    http.get("/packages", { params }).then((res) => res.data),

  get: (id) =>
    http.get(`/packages/${id}`).then((res) => res.data),
};

// CART APIs
export const cartApi = {
  // GET /cart
  get: () =>
    http.get("/cart").then((res) => res.data),

  // POST /cart/items
  add: (serviceId, quantity = 1) =>
    http.post("/cart/items", {
      serviceId,
      quantity,
    }).then((res) => res.data),

  // PUT /cart/items/{itemId}
  update: (itemId, quantity) =>
    http.put(`/cart/items/${itemId}`, {
      quantity,
    }).then((res) => res.data),

  // DELETE /cart/items/{itemId}
  remove: (itemId) =>
    http.delete(`/cart/items/${itemId}`).then((res) => res.data),

  // DELETE /cart
  clear: () =>
    http.delete("/cart"),
};

// CONTACT APIs
export const contactApi = {
  send: (payload) =>
    http.post("/contact", payload).then((res) => res.data),
};

// AUTH APIs
export const authApi = {
  signIn: (payload) =>
    http.post("/auth/signin", payload).then((res) => res.data),

  register: (payload) =>
    http.post("/auth/register", payload).then((res) => res.data),
};

// USER PROFILE APIs
export const userProfile = {
  getMyProfile: () =>
    http.get("/auth/me").then((res) => res.data),

  updateMyProfile: (customer) =>
    http.put("/auth/me", {
      name: customer.name,
      phone: customer.phone,
      companyName: customer.company,
      address: customer.address,
    }).then((res) => res.data),
};

// ORDER APIs
export const orderApi = {
  create: (payload) =>
    http.post("/api/orders", payload).then((res) => res.data),
};
