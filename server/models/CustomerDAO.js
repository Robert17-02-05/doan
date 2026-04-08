require("../utils/MongooseUtil");
const mongoose = require("mongoose");
const Models = require("./Models");

const CustomerDAO = {
  // Tìm khách hàng bằng username hoặc email (dùng khi đăng ký)
  async selectByUsernameOrEmail(username, email) {
    const query = { $or: [{ username: username }, { email: email }] };
    const customer = await Models.Customer.findOne(query);
    return customer;
  },

  // Thêm mới khách hàng
  async insert(customer) {
    customer._id = new mongoose.Types.ObjectId();
    const result = await Models.Customer.create(customer);
    return result;
  },

  // Kích hoạt hoặc Vô hiệu hóa tài khoản (status: 1 là active, 0 là deactive)
  async active(_id, token, active) {
    const query = { _id: _id, token: token };
    const newvalues = { active: active };

    const result = await Models.Customer.findOneAndUpdate(query, newvalues, {
      new: true,
    });

    return result;
  },

  // Đăng nhập khách hàng
  async selectByUsernameAndPassword(username, password) {
    const query = { username: username, password: password };
    const customer = await Models.Customer.findOne(query);
    return customer;
  },

  // Cập nhật thông tin cá nhân khách hàng
  async update(customer) {
    const newvalues = {
      username: customer.username,
      password: customer.password,
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
    };

    const result = await Models.Customer.findByIdAndUpdate(
      customer._id,
      newvalues,
      { new: true },
    );

    return result;
  },

  // Lấy danh sách tất cả khách hàng (cho Admin)
  async selectAll() {
    const query = {};
    const customers = await Models.Customer.find(query).exec();
    return customers;
  },

  // Tìm khách hàng cụ thể theo ID
  async selectByID(_id) {
    const customer = await Models.Customer.findById(_id).exec();
    return customer;
  },
};

module.exports = CustomerDAO;