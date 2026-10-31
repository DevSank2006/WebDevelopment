import axios from "axios";
import { packages } from "../data/packages.js";

// A deterministic Axios adapter that behaves like a small Spring Boot REST API.
// Set VITE_USE_MOCK_API=false to make real HTTP calls to VITE_API_URL instead.
const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));
let cart = [];

async function mockSpringAdapter(config) {
  await delay();
  const method = (config.method || "get").toLowerCase();
  const url = new URL(
    config.url || "/",
    config.baseURL || window.location.origin,
  );
  if (config.params) {
    const params =
      config.params instanceof URLSearchParams
        ? config.params.entries()
        : Object.entries(config.params);
    for (const [key, value] of params)
      if (value !== undefined && value !== null && value !== "")
        url.searchParams.set(key, String(value));
  }
  const path = url.pathname.replace(/^\/api\/?/, "/");
  const body =
    typeof config.data === "string"
      ? JSON.parse(config.data || "{}")
      : config.data || {};
  let data;
  let status = 200;

  if (method === "get" && path === "/packages") {
    const category = url.searchParams.get("category");
    const search = (url.searchParams.get("search") || "").toLowerCase();
    data = packages.filter(
      (item) =>
        (!category || category === "All" || item.category === category) &&
        (!search ||
          `${item.name} ${item.description} ${item.category}`
            .toLowerCase()
            .includes(search)),
    );
  } else if (method === "get" && path.startsWith("/packages/")) {
    data = packages.find((item) => item.id === path.split("/").pop());
    if (!data) {
      status = 404;
      data = { message: "Package not found" };
    }
  } else if (method === "get" && path === "/cart") {
    data = {
      items: cart,
      count: cart.reduce((sum, item) => sum + item.quantity, 0),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
  } else if (method === "post" && path === "/cart/items") {
    const product = packages.find((item) => item.id === body.packageId);
    if (!product) {
      status = 404;
      data = { message: "Package not found" };
    } else {
      const found = cart.find((item) => item.id === product.id);
      if (found) found.quantity += 1;
      else cart = [...cart, { ...product, quantity: 1 }];
      data = {
        items: cart,
        count: cart.reduce((sum, item) => sum + item.quantity, 0),
        message: `${product.name} added to your cart`,
      };
    }
  } else if (method === "post" && path === "/contact") {
    data = {
      message: `Thanks ${body.name || "there"} — your message is on its way to our studio.`,
      received: true,
    };
    status = 201;
  } else if (
    method === "post" &&
    ["/auth/signin", "/auth/register"].includes(path)
  ) {
    if (!body.email || !body.password) {
      status = 400;
      data = { message: "Please provide an email and password." };
    } else {
      data = {
        token: "demo-session-token",
        user: {
          name: body.name || body.email.split("@")[0],
          email: body.email,
        },
        demo: true,
      };
    }
  } else {
    status = 404;
    data = { message: `No demo endpoint for ${method.toUpperCase()} ${path}` };
  }

  const response = {
    data,
    status,
    statusText: status >= 400 ? "Error" : "OK",
    headers: {},
    config,
    request: {},
  };
  if (status >= 400)
    throw Object.assign(new Error(data.message), { config, response });
  return response;
}

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
  adapter:
    import.meta.env.VITE_USE_MOCK_API !== "false"
      ? mockSpringAdapter
      : undefined,
  timeout: 8000,
});

export default http;
