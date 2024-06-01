import express from "express";
import {
  createReviewController,
  editReviewController,
  getReviewOfUserController,
  likeReviewController,
  removeReviewController,
} from "../controllers/review.controller.js";

import { verifyToken } from "/mern-movie-2024/server/src/utils/verifyuser.js";

//router
const router = express.Router();

//tạo bình luận
router.post("/create-review", verifyToken, createReviewController);
//Lấy bình luận
router.get("/getReviews/:mediaId", getReviewOfUserController);
//Phần like
router.put("/likeReview/:reviewId", verifyToken, likeReviewController);
//Chỉnh sữa bình luận
router.put("/editReview/:reviewId", verifyToken, editReviewController);
// xóa bình luận
router.delete("/deleteReview/:reviewId", verifyToken, removeReviewController);

export default router;
