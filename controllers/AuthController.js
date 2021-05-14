const { validationResult } = require('express-validator');
const jwtHelper = require("../helpers/jwt.helper");
const response = require('../utils/response');
const sequelize = require('../utils/connectDB')
const multer = require('multer');
const User = require('../models/User')

// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";

// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "PKMM97ENV";

// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "PKMM97REFRESH";

/**
 * controller login
 * @param {*} req 
 * @param {*} res 
 */
let login = async (req, res) => {
  try {
    const user = { 'username': req.body.username, 'password': req.body.password }
    //Check User Exist
    let checkUser = await User.findOne({ where: { username: user.username } })
    if (checkUser && checkUser.password === user.password) {

      //Tạo accessToken và refresh sau khi check id, pass
      const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);
      const refreshToken = await jwtHelper.generateToken(user, refreshTokenSecret, refreshTokenLife);
      const tokenList = [{ "accessToken": accessToken, "refreshToken": refreshToken }];

      //Save token to DB
      await User.update({ access_token: accessToken, refresh_token: refreshToken }, {
        where: {
          username: user.username
        }
      });

      return response.withMessage("COMMON.CREATE_SUCCESS", true, tokenList, res)
    } else {
      return response.withMessage("AUTH.AUTH_INVALID", false, null, res)
    }
  } catch (error) {
    return response.withMessage("ERROR_SERVER", false, null, res)
  }
}

/**
 * controller refreshToken
 * @param {*} req 
 * @param {*} res 
 */
let refreshToken = async (req, res) => {
  // User gửi mã refresh token kèm theo trong body
  const refreshTokenFromClient = req.body.refreshToken;
  // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
  if (refreshTokenFromClient) {
    try {
      // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
      const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);

      // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
      const userData = decoded.data;
      const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife);

      // gửi token mới về cho người dùng
      return response.withMessage("COMMON.CREATE_SUCCESS", true, accessToken, res)
    } catch (error) {
      return response.withMessage("AUTH.AUTH_INVALID", false, null, res)
    }
  } else {
    // Không tìm thấy token trong request
    return response.withMessage("AUTH.TOKEN_NOT_FOUND", false, null, res)
  }
};

let signup = async (req, res) => {
  const userData = {
    'username': req.body.username,
    'password': req.body.password,
    'groupId': req.body.group_id,
    'thumbnail:': req.body.thumbnail,
    'link': req.body.link,
    'dob': req.body.dob,
    'sex': req.body.sex,
  }

  const errors = validationResult(req);
  //Validate input data
  if (!errors.isEmpty()) {
    return response.withMessage("COMMON.INVALID_DATA", false, errors.array(), res)
  }

  //Create new user
  User.create(
    {
      username: userData.username,
      password: userData.password,
      groupId: userData.groupId,
      thumbnail: userData.thumbnail,
      link: userData.link,
      dob: userData.dob,
      sex: userData.sex,
    }
  );
  return response.withMessage("COMMON.CREATE_SUCCESS", true, userData, res)
}



module.exports = {
  login: login,
  signup: signup,
  refreshToken: refreshToken,

}
