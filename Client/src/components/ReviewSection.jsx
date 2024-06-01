import axios from "axios";
import { Alert, Button, Modal, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Review from "./Review";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { setLoginModalOpen } from "../redux/modal/authModalSlice";

const ReviewSection = ({ media, mediaType }) => {
  const { currentUser } = useSelector((state) => state.user);

  const { t } = useTranslation("movieDetail");

  //Lưu bình luận
  const [review, setReview] = useState("");
  //Trạng thái có lỗi hay không
  const [reviewError, setReviewError] = useState(null);
  //Lấy các bình luận từ csdl
  const [reviews, setReviews] = useState([]);
  //cảnh báo Thu hồi bình luận
  const [showModal, setShowModal] = useState(false);
  //Thu hồi bình luận
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const dispatch = useDispatch();

  const openLoginModal = () => {
    dispatch(setLoginModalOpen(true));
  };

  //Xữ lý gữi dữ liệu bình luận
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (review.length > 200) {
        return;
      }
      const res = await axios.post("/review/create-review", {
        content: review,
        mediaId: media.id,
        mediaType,
        mediaTitle: media.title || media.name,
        userId: currentUser.user._id,
      });
      const data = res.data;
      console.log(data);
      if (data.success) {
        setReview("");
        setReviewError(null);
        setReviews([data.newReview, ...reviews]);
      }
    } catch (error) {
      setReviewError(error.message);
    }
  };

  //Lấy bình luận
  const getReviews = async () => {
    try {
      const res = await axios.get(`/review/getReviews/${media?.id}`);
      const data = res.data;
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media.id]);

  const handleLike = async (reviewId) => {
    try {
      if (!currentUser.user) {
        openLoginModal();
      }
      const res = await axios.put(`/review/likeReview/${reviewId}`);
      if (res.data.success) {
        const data = res.data;
        console.log(data);
        setReviews(
          reviews.map((review) =>
            review._id === reviewId
              ? {
                  ...review,
                  likes: data.review.likes,
                  numberOfLikes: data.review.likes.length,
                }
              : review
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //Render lại mảng bình luận khi cập nhật
  const handleEdit = async (review, editedContent) => {
    setReviews(
      reviews.map((c) =>
        c._id === review._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (reviewId) => {
    setShowModal(false);
    try {
      if (!currentUser.user) {
        openLoginModal();
      }
      const res = await axios.delete(`/review/deleteReview/${reviewId}`);
      const data = res.data;
      if (data.success) {
        setReviews(reviews.filter((review) => review._id !== reviewId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(reviews);
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser?.user ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>{t("LogInThisWay")}</p>
          <img
            className="h-5 w-25 object-cover rounded-full"
            src={currentUser?.user.profilePicture}
            alt=""
          />
          <Link
            to={"/dashboard?tag=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser?.user.username}
          </Link>
        </div>
      ) : (
        <div className="text-teal-500 text-md my-5 flex gap-1">
          {t("YouMustBeLoggedInToComment")}
          <Link
            className="text-blue-500 hover:underline "
            onClick={() => {
              openLoginModal();
            }}
          >
            {t("Login")}
          </Link>
        </div>
      )}

      {currentUser?.user && (
        <>
          <form
            className="border border-teal-500 rounded-md p-3"
            onSubmit={handleSubmit}
          >
            <Textarea
              placeholder="Viết bình luận vào đây"
              rows={3}
              maxLength="200"
              onChange={(e) => setReview(e.target.value)}
              value={review}
            />
            <div className="flex items-center justify-between mt-5">
              <p>{200 - review.length} từ còn lại</p>
              <Button color="blue" type="submit">
                Gữi
              </Button>
            </div>

            {reviewError && (
              <Alert color="faiture" className="mt-5">
                {reviewError}
              </Alert>
            )}
          </form>
          {reviews?.length === 0 ? (
            <p className="text-sm my-5">Chưa có bình luận</p>
          ) : (
            <>
              <div className="text-sm my-5 flex items-center gap-1">
                <p>Các bình luận</p>
                <div className="border border-gray-400 px-1 py-2 rounded-sm">
                  <p>{reviews?.length}</p>
                </div>
              </div>

              {reviews.map((review) => (
                <Review
                  key={review._id}
                  review={review}
                  onLike={handleLike}
                  onEdit={handleEdit}
                  onDelete={(reviewId) => {
                    setShowModal(true);
                    setReviewToDelete(reviewId);
                  }}
                />
              ))}
            </>
          )}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Bạn có chắc muốn xóa bình luận này?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDelete(reviewToDelete)}
              >
                Vâng, xóa
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Không, Hủy
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReviewSection;
