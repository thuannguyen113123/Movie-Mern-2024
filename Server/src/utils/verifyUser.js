import JWT from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Lỗi truy cập: Không tìm thấy token",
    });
  }
  JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).send({
        success: false,
        message: "Lỗi truy cập: Token không hợp lệ",
      });
    }
    req.user = user;
    next();
  });
};
