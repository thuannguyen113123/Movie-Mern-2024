import express from "express";

import { verifyToken } from "./../utils/verifyUser.js";
import {
  signOutController,
  getUserController,
  updateUserController,
  deleteUserController,
  updatePasswordUserController,
} from "./../controllers/user.controller.js";
import {
  addFavoriteController,
  getFavoriteOfUserController,
  removeFavoriteController,
} from "../controllers/favorite.controller.js";

//router
const router = express.Router();
//Cập nhật người dùng
router.put("/update/:userId", verifyToken, updateUserController);
//Xoá tài khoản
router.delete("/delete/:userId", verifyToken, deleteUserController);

//Đăng xuất
router.post("/signout", signOutController);

//Lấy 1 người dùng
router.get("/:userId", getUserController);

//Thêm danh sách yêu thích
router.post("/favorite/addFavorite", verifyToken, addFavoriteController);
//Xóa khỏi danh sách yêu thích
router.delete(
  "/favorite/removeFavorite/:favoriteId",
  verifyToken,
  removeFavoriteController
);
router.get("/favorites/getFavorite", verifyToken, getFavoriteOfUserController);
//Thay đổi mật khẩu
//Cập nhật người dùng
router.put(
  "/updatePassword/:userId",
  verifyToken,
  updatePasswordUserController
);

export default router;
