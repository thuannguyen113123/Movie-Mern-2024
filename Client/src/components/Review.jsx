import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

const Review = ({ review, onLike, onEdit, onDelete }) => {
  //Lưu người dùng
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(review.content);

  console.log(review);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/user/${review.user}`);
        const data = res.data;
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [review]);
  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(review.content);
  };

  const handleSave = async (req, res) => {
    try {
      const res = await axios.put(`/review/editReview/${review._id}`, {
        content: editedContent,
      });
      const data = res.data;
      if (data.success) {
        setIsEditing(false);
        onEdit(review, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      {/* flex-shrink: 0 được sử dụng để ngăn các phần tử flex co lại khi không gian bị hạn chế, giữ cho chúng giữ nguyên kích thước của mình. */}
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user?.username}` : "Người dùng ẩn danh"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(review.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button type="button" size="sm" onClick={handleSave}>
                Lưu
              </Button>
              <Button
                type="button"
                size="sm"
                outline
                onClick={() => setIsEditing(false)}
              >
                Hủy
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{review.content}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button
                type="button"
                onClick={() => {
                  onLike(review._id);
                }}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser?.user &&
                  review.likes &&
                  review.likes.includes(
                    currentUser?.user?._id || currentUser?.user?.id
                  ) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {review.numberOfLikes > 0 &&
                  review.numberOfLikes +
                    " " +
                    (review.numberOfLikes === 1 ? "thích" : "lượt thích")}
              </p>
              {currentUser.user &&
                (currentUser.user._id === review.user ||
                  currentUser.user.isAdmin) && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-gray-400 hover:text-blue-500"
                    >
                      Chỉnh sữa
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(review._id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Review;
