import axios from "axios";
import { Label, Modal, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdatePassword = ({ onCloseModalUpdatePassword }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  //dữ liệu gữi về server
  const [formData, setFormData] = useState({});

  const { t } = useTranslation("auth");

  const showModalSignUp = useSelector(
    (state) => state.authModal.updatePasswordModalOpen
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // kiểm tra xem có thay đổi gì không
    if (Object.keys(formData).length === 0) {
      toast.error("Không có thay đổi trường nào khi nhấn cập nhật");
      return;
    }

    const { newPassword, comfirmPasword } = formData;

    if (!newPassword || !comfirmPasword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không được để trống");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Mật khẩu mới phải chứa ít nhất 8 ký tự");
      return;
    }

    if (newPassword !== comfirmPasword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `/user/updatePassword/${currentUser.user._id}`,
        formData
      );
      const data = res.data;
      setLoading(false);
      if (!data.success) {
        toast.error(data.message);
      }
      if (data.success) {
        toast.success("Thay đổi mật khẩu thành công");
        // Reset form and close modal if successful
        setFormData({});
        onCloseModalUpdatePassword();
      }
    } catch (error) {
      toast.error(error.messager);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <Modal
      popup
      size="md"
      show={showModalSignUp}
      onClose={onCloseModalUpdatePassword}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {t("updatePassword")}
          </h3>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <Label value={t("password")} />
              <TextInput
                type="password"
                placeholder={t("Enter password here")}
                className="rounded-lg"
                id="password"
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <Label value={t("newPassword")} />
              <TextInput
                type="password"
                placeholder="••••••••••"
                className="rounded-lg"
                id="newPassword"
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <Label value={t("comfirmPassword")} />
              <TextInput
                type="password"
                placeholder="••••••••••"
                className="rounded-lg"
                id="comfirmPasword"
                onChange={handleChange}
              />
            </div>

            <div className="flex-1">
              <button
                type="submit"
                className="bg-black w-full p-2 rounded-full hover:bg-[#1d1d1d]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" /> <span> {t("Loading")}</span>
                  </>
                ) : (
                  t("update")
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdatePassword;
