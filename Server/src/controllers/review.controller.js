import reviewModel from "../models/review.model.js";

export const createReviewController = async (req, res) => {
  try {
    const { movieId } = req.params;

    const userId = req.body.userId;

    if (userId !== req.user.id && userId !== req.user._id) {
      return res.status(403).send({
        success: false,
        message: "Bạn không được phép bình luận",
      });
    }

    const review = new reviewModel({
      user: userId,
      movieId,
      ...req.body,
    });

    await review.save();

    res.status(200).send({
      success: true,
      message: "Bình luận thành công",
      review,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Lỗi tạo bình luận",
    });
  }
};

//Phần like trong bình luận
export const likeReviewController = async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.reviewId);
    if (!review) {
      res.status(404).send({
        success: false,
        message: "không tìm thấy bài viết",
      });
    }
    const userIndex = review.likes.indexOf(req.user.id || req.user._id);
    if (userIndex === -1) {
      review.numberOfLikes += 1;
      review.likes.push(req.user.id || req.user._id);
    } else {
      review.numberOfLikes -= 1;
      review.likes.splice(userIndex, 1);
    }
    await review.save();
    res.status(200).send({
      success: true,
      message: "Like bình luận thành công",
      review,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Lỗi khi like bình luận",
      error,
    });
  }
};
//Chỉnh sữa bình luận
export const editReviewController = async (req, res) => {
  try {
    console.log(req.params.reviewId);
    const review = await reviewModel.findById(req.params.reviewId);
    if (!review) {
      res.status(404).send({
        success: false,
        message: "không tìm thấy bình luận",
      });
    }
    if (
      review.userId !== req.user.id &&
      !req.user.isAdmin &&
      review.userId !== req.user._id
    ) {
      res.status(403).send({
        success: false,
        message: "Bạn không được phép chỉnh sữa bình luận",
      });
    }
    const editedreview = await reviewModel.findByIdAndUpdate(
      req.params.reviewId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Chỉnh sữa bình luận thành công",
      editedreview,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Lỗi khi cập nhật bình luận",
      error,
    });
  }
};

//Thu hồi bình luận
export const removeReviewController = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id || req.user.id;

    const review = await reviewModel.findOne({
      _id: reviewId,
      user: userId,
    });

    if (!review) {
      return res.status(404).send({
        success: false,
        message: "Không tìm thấy bình luận hoặc người dùng",
      });
    }

    await reviewModel.findByIdAndDelete(reviewId);

    res.status(200).send({
      success: true,
      message: "Gỡ bình luận thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Lỗi tạo bình luận",
    });
  }
};

//Lấy bình luận từ người dùng
export const getReviewOfUserController = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({
        mediaId: req.params.mediaId,
      })
      .sort("createAt");

    res.status(200).send({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Lỗi khi lấy bình luận",
    });
  }
};
