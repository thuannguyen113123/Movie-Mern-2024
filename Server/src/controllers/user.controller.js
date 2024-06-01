import userModel from "../models/user.model.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";

//Người dùng tự xóa tài khoản
export const signOutController = (req, res) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .send({ success: true, message: "đăng xuất thành công" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Lỗi đăng xuất",
      error,
    });
  }
};

export const updateUserController = async (req, res) => {
  if (req.user.id !== req.params.userId && req.user._id !== req.params.userId) {
    return res.status(403).send({
      success: false,
      message: "Bạn không được phép cập nhật người dùng này",
      error,
    });
  }

  try {
    let updatedFields = {
      username: req.body.username,
      email: req.body.email,
      profilePicture: req.body.profilePicture,
    };

    // Thực hiện cập nhật hoặc thêm mới thông tin
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: {
          ...updatedFields,
          password: req.body.password
            ? await hashPassword(req.body.password)
            : undefined, // Chỉ mã hóa mật khẩu nếu mật khẩu được cung cấp
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).send({
      success: true,
      message: "Cập nhật thành công",
      user: rest,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Lỗi cập nhật",
      error,
    });
  }
};

export const updatePasswordUserController = async (req, res) => {
  try {
    const { password, newPassword, comfirmPasword } = req.body;

    if (
      req.user.id !== req.params.userId &&
      req.user._id !== req.params.userId
    ) {
      return res.status(403).send({
        success: false,
        message: "Bạn không được phép cập nhật người dùng này",
        error,
      });
    }
    // Lấy thông tin người dùng từ cơ sở dữ liệu
    const user = await userModel.findById(req.params.userId);

    // Kiểm tra mật khẩu cũ của người dùng
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({
        success: false,
        message: "Mật khẩu cũ không chính xác",
      });
    }
    // Băm mật khẩu mới và cập nhật vào cơ sở dữ liệu
    const hashedNewPassword = await hashPassword(newPassword);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Mật khẩu đã được cập nhật thành công",
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật mật khẩu:", error);
    res.status(500).send({
      success: false,
      message: "Đã xảy ra lỗi khi cập nhật mật khẩu",
      error,
    });
  }
};

//Người dùng tự xóa tài khoản
export const deleteUserController = async (req, res) => {
  if (
    !req.user.isAdmin &&
    req.user.id !== req.params.userId &&
    req.user._id !== req.params.userId
  ) {
    return res.status(403).send({
      success: false,
      message: "Bạn không được phép xóa người dùng này",
    });
  }
  try {
    await userModel.findByIdAndDelete(req.params.userId);
    res.status(200).send({
      success: true,
      message: "Xóa tài khoản thành công",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Lỗi xóa tài khoản",
      error,
    });
  }
};
//Lấy 1 người dùng
export const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }
    const { password, ...rest } = user._doc;
    res.status(200).send({
      success: true,
      message: "Lấy thông tin người dùng thành công",
      user: rest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Lỗi lấy thông tin người dùng",
      error,
    });
  }
};
