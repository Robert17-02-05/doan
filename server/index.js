const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dns = require("dns");

// Cấu hình DNS
dns.setServers(['1.1.1.1', '1.0.0.1']);

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// --- APIs ---
// Lưu ý: Các route API nên đặt TRƯỚC các route phục vụ file tĩnh (static files)
app.get("/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use("/api/admin", require("./api/admin.js"));
app.use("/api/customer", require("./api/customer.js"));

// --- Static Files & SPA Routing ---

// 1. Cấu hình cho trang Admin
// Phục vụ các file tĩnh trong thư mục build của admin
app.use("/admin", express.static(path.resolve(__dirname, "../client-admin/build")));

// Xử lý các route của React Admin (Single Page Application)
app.get("/admin/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client-admin/build", "index.html"));
});

// 2. Cấu hình cho trang Customer (Trang chủ)
// Phục vụ các file tĩnh trong thư mục build của customer
app.use("/", express.static(path.resolve(__dirname, "../client-customer/build")));

// Xử lý tất cả các route còn lại cho React Customer
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client-customer/build", "index.html"));
});

// --- Khởi động Server ---
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});