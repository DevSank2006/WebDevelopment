export const cartApi = {
  get: () =>
    http.get("/cart").then((res) => res.data),

  add: (serviceId, quantity = 1) =>
    http.post("/cart/items", {
      serviceId,
      quantity,
    }).then((res) => res.data),

  update: (itemId, quantity) =>
    http.put(`/cart/items/${itemId}`, {
      quantity,
    }).then((res) => res.data),

  remove: (itemId) =>
    http.delete(`/cart/items/${itemId}`).then((res) => res.data),

  clear: () =>
    http.delete("/cart"),
};