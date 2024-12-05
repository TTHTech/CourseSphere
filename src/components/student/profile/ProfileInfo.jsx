import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCamera } from "react-icons/fa"; // Import biểu tượng máy ảnh

const ProfileInfo = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newDateOfBirth, setNewDateOfBirth] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:8080/api/student/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Kiểm tra ngày tháng và chuyển nó thành chuỗi 'YYYY-MM-DD' nếu là mảng
        const dateOfBirth = Array.isArray(response.data.dateOfBirth)
          ? response.data.dateOfBirth.join("-") // Đảm bảo định dạng là 'YYYY-MM-DD'
          : response.data.dateOfBirth;

        setProfile({
          ...response.data,
          dateOfBirth,
        });
      } catch (err) {
        setError("Không thể tải thông tin người dùng.");
        toast.error("Có lỗi xảy ra khi tải thông tin.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const formData = new FormData();

      // Tạo đối tượng student
      const student = {
        firstName: newFirstName || profile.firstName,
        lastName: newLastName || profile.lastName,
        dateOfBirth: newDateOfBirth || profile.dateOfBirth,
        phone: newPhone || profile.phoneNumber,
        address: newAddress || profile.address,
      };

      // Gửi đối tượng student vào FormData với tên 'student'
      formData.append('student', JSON.stringify(student));

      // Nếu có ảnh, thêm vào formData
      if (newImage) {
        formData.append("profileImage", newImage);
      }

      // Gửi yêu cầu PUT với header Authorization
      const response = await axios.put(
        `http://localhost:8080/api/student/profile/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Cập nhật thông tin thành công!");
      setIsEditing(false);

      // Cập nhật lại profile sau khi chỉnh sửa
      setProfile({
        ...profile,
        firstName: newFirstName || profile.firstName,
        lastName: newLastName || profile.lastName,
        dateOfBirth: newDateOfBirth || profile.dateOfBirth,
        phoneNumber: newPhone || profile.phoneNumber,
        address: newAddress || profile.address,
        profileImageUrl: newImage ? URL.createObjectURL(newImage) : profile.profileImageUrl,
      });
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra khi cập nhật thông tin.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewImage(null);
    setNewFirstName("");
    setNewLastName("");
    setNewDateOfBirth("");
    setNewPhone("");
    setNewAddress("");
  };

  if (loading) {
    return <p className="text-center text-gray-600">Đang tải...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      {/* Section for profile picture */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <img
            src={newImage ? URL.createObjectURL(newImage) : profile.profileImageUrl || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer">
              <FaCamera />
              <input
                type="file"
                onChange={handleImageChange}
                className="absolute opacity-0 w-full h-full cursor-pointer"
              />
            </label>
          )}
        </div>
      </div>

      {/* Profile Information */}
      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <p className="text-lg text-gray-700"><strong>Tên đăng nhập:</strong> {profile.username}</p>
          <p className="text-lg text-gray-700"><strong>Email:</strong> {profile.email}</p>
        </div>

        <div>
          <p className="text-lg text-gray-700"><strong>Họ và tên:</strong> {isEditing ? (
            <>
              <input
                type="text"
                value={newLastName || profile.lastName}
                onChange={(e) => setNewLastName(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-full"
                placeholder="Họ"
              />
              <input
                type="text"
                value={newFirstName || profile.firstName}
                onChange={(e) => setNewFirstName(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-full mt-2"
                placeholder="Tên"
              />
            </>
          ) : `${profile.lastName} ${profile.firstName}`}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p className="text-lg text-gray-700"><strong>Ngày sinh:</strong> {isEditing ? (
            <input
              type="date"
              value={newDateOfBirth || profile.dateOfBirth || ""}
              onChange={(e) => setNewDateOfBirth(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          ) : profile.dateOfBirth || "Chưa cập nhật"}</p>

          <p className="text-lg text-gray-700"><strong>Số điện thoại:</strong> {isEditing ? (
            <input
              type="tel"
              value={newPhone || profile.phoneNumber || ""}
              onChange={(e) => setNewPhone(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          ) : profile.phoneNumber || "Chưa cập nhật"}</p>

          <p className="text-lg text-gray-700"><strong>Địa chỉ:</strong> {isEditing ? (
            <input
              type="text"
              value={newAddress || profile.address || ""}
              onChange={(e) => setNewAddress(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          ) : profile.address || "Chưa cập nhật"}</p>
        </div>
      </div>

      {/* Buttons for Editing or Cancelling */}
      <div className="mt-6 flex justify-end space-x-4">
        {isEditing ? (
          <>
            <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded-md">Cập nhật</button>
            <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded-md">Hủy</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-yellow-500 text-white rounded-md">Chỉnh sửa</button>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
