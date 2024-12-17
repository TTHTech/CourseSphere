import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCamera } from "react-icons/fa"; // Camera icon for profile picture

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
        if (!token || !userId) {
          setError("Không tìm thấy token hoặc userId trong localStorage.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/student/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const dateOfBirth = Array.isArray(response.data.dateOfBirth)
          ? response.data.dateOfBirth.join("-")
          : response.data.dateOfBirth;

        setProfile({ ...response.data, dateOfBirth });
      } catch (err) {
        console.error(err);
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
      if (!token || !userId) {
        toast.error("Không tìm thấy token hoặc userId trong localStorage.");
        return;
      }

      const formData = new FormData();
      const student = {
        firstName: newFirstName || profile.firstName,
        lastName: newLastName || profile.lastName,
        dateOfBirth: newDateOfBirth || profile.dateOfBirth,
        phoneNumber: newPhone || profile.phoneNumber,
        address: newAddress || profile.address,
      };

      formData.append("student", JSON.stringify(student));

      if (newImage) {
        formData.append("profileImage", newImage);
      }

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

      setProfile({
        ...profile,
        firstName: newFirstName || profile.firstName,
        lastName: newLastName || profile.lastName,
        dateOfBirth: newDateOfBirth || profile.dateOfBirth,
        phoneNumber: newPhone || profile.phoneNumber,
        address: newAddress || profile.address,
        profileImageUrl: newImage
          ? URL.createObjectURL(newImage)
          : profile.profileImageUrl,
      });
    } catch (err) {
      console.error("Error updating profile:", err);
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
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto mt-8 mt-[50px] ">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <img
            src={
              newImage
                ? URL.createObjectURL(newImage)
                : profile.profileImage || "https://via.placeholder.com/150"
            }
            alt="User Avatar"
            className="w-36 h-36 rounded-full object-cover border-4 border-indigo-500"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-indigo-500 text-white p-2 rounded-full cursor-pointer shadow-lg">
              <FaCamera />
              <input
                type="file"
                onChange={handleImageChange}
                className="absolute opacity-0 w-full h-full cursor-pointer"
              />
            </label>
          )}
        </div>
        
        <div className="space-y-6 w-full">
        <div>
        <p className="text-lg text-gray-800">
          <strong>Tên đăng nhập:</strong> {profile.username}
        </p>
        <p className="text-lg text-gray-800">
          <strong>Email:</strong> {profile.email}
        </p>
      </div>
    
      <div>
        <p className="text-xl text-gray-800">
          <strong>Họ và tên:</strong>{" "}
          {isEditing ? (
            <div className="flex space-x-4">
              <input
                type="text"
                value={newLastName || profile.lastName}
                onChange={(e) => setNewLastName(e.target.value)}
                className="border-2 border-gray-300 rounded px-4 py-2 w-full"
                placeholder="Họ"
              />
              <input
                type="text"
                value={newFirstName || profile.firstName}
                onChange={(e) => setNewFirstName(e.target.value)}
                className="border-2 border-gray-300 rounded px-4 py-2 w-full"
                placeholder="Tên"
              />
            </div>
          ) : (
            `${profile.lastName} ${profile.firstName}`
          )}
        </p>
      </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="text-xl text-gray-800">
              <strong>Ngày sinh:</strong>{" "}
              {isEditing ? (
                <input
                  type="date"
                  value={newDateOfBirth || profile.dateOfBirth || ""}
                  onChange={(e) => setNewDateOfBirth(e.target.value)}
                  className="border-2 border-gray-300 rounded px-4 py-2 w-full"
                />
              ) : (
                profile.dateOfBirth || "Chưa cập nhật"
              )}
            </p>

            <p className="text-xl text-gray-800">
              <strong>Số điện thoại:</strong>{" "}
              {isEditing ? (
                <input
                  type="tel"
                  value={newPhone || profile.phoneNumber || ""}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="border-2 border-gray-300 rounded px-4 py-2 w-full"
                />
              ) : (
                profile.phoneNumber || "Chưa cập nhật"
              )}
            </p>
          </div>

          <div>
            <p className="text-xl text-gray-800">
              <strong>Địa chỉ:</strong>{" "}
              {isEditing ? (
                <textarea
                  value={newAddress || profile.address || ""}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="border-2 border-gray-300 rounded px-4 py-2 w-full"
                />
              ) : (
                profile.address || "Chưa cập nhật"
              )}
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-200"
                >
                  Cập nhật
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-300 text-black rounded-full hover:bg-gray-400 transition duration-200"
                >
                  Hủy
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-200"
              >
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
