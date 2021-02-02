const jwtHelper = require("../helpers/jwt.helper");
const response = require("../utils/response")

// Mã secretKey này phải được bảo mật tuyệt đối, lưu vào file env
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "PKMM97ENV";

/**
 * Middleware: Authorization user by Token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
let isAuth = async (req, res, next) => {
  // Lấy token được gửi lên từ phía client, thông thường tốt nhất là các bạn nên truyền token vào header
  const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
  if (tokenFromClient) {
    // Nếu tồn tại token
    try {
      // Thực hiện giải mã token xem có hợp lệ hay không?
      const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
      console.log(decoded);
      // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
      req.jwtDecoded = decoded;

      // Cho phép req đi tiếp sang controller.
      next();
    } catch (error) {
      // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
      return response.withMessage("AUTH.TOKEN_INVALID", false, null, res);
    }
  } else {
    // Không tìm thấy token trong request
    return response.withMessage("AUTH.TOKEN_NOT_FOUND", false, null, res);
  }
}

module.exports = {
  isAuth: isAuth,
};