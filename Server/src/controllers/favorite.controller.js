import favoriteModel from "../models/favorite.model.js";

//Thêm yêu thích
export const addFavoriteController = async (req, res) => {
  try {
    const isFavorite = await favoriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });

    if (isFavorite) {
      return res.status(200).send({
        success: true,
        isFavorite,
      });
    }

    const favorite = new favoriteModel({
      ...req.body,
      user: req.user.id || req.user._id,
    });
    await favorite.save();
    res.status(201).send({
      success: true,
      favorite,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Lỗi khi thêm vào yêu thích",
    });
  }
};

//Xóa khỏi danh sách yêu thích

export const removeFavoriteController = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    const favorite = await favoriteModel.findOne({
      user: req.user.id || req.user._id,
      _id: favoriteId,
    });

    if (!favorite) {
      res.status(404).send({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    await favoriteModel.findByIdAndDelete(favoriteId);

    res.status(200).send({
      success: true,
      message: "Xóa khỏi danh sách yêu thích thành công",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Lỗi khi xóa khỏi danh sách yêu thích",
    });
  }
};

export const getFavoriteOfUserController = async (req, res) => {
  try {
    const favorite = await favoriteModel
      .find({ user: req.user.id || req.user._id })
      .sort("-createdAt");

    console.log(favorite);
    res.status(200).send({
      success: true,
      favorite,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Lỗi khi lấy danh sách yêu thích",
    });
  }
};
