import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Đường dẫn chính xác hơn
import { FaUserCircle, FaBook, FaTools, FaClipboardList } from "react-icons/fa";
// Số lượng khóa học hiển thị mỗi trang
const ITEMS_PER_PAGE = 10;

const CoursesTable = () => {
  const [courses, setCourses] = useState([]); // Lưu trữ danh sách khóa học lấy từ API
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Lưu trữ trang hiện tại
  const [editingCourse, setEditingCourse] = useState(null); // Lưu trữ khóa học đang xem
  const [loading, setLoading] = useState(true); // Trạng thái loading khi gọi API
  const [error, setError] = useState(null); // Trạng thái lỗi khi gọi API

  // Di chuyển hàm fetchCourses ra ngoài useEffect để tái sử dụng
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/courses/pending",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch courses.");
      }

      const data = await response.json();
      console.log("Fetched courses:", data); // Xem cấu trúc dữ liệu trả về
      setCourses(data); // Lưu trữ dữ liệu khóa học vào state
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Gọi hàm fetchCourses trong useEffect để lấy dữ liệu khi component được render lần đầu
  useEffect(() => {
    fetchCourses();
  }, []);

  if (courses.length === 0) {
    // toast.info("No courses available.");
  }

  // Lọc khóa học theo từ khóa tìm kiếm
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán tổng số trang
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);

  // Lấy các khóa học hiển thị trên trang hiện tại
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1); // Quay lại trang đầu khi tìm kiếm
  };

  // Gọi API để chấp nhận khóa học và chuyển trạng thái thành 'Active'
  const handleAccept = async (courseId) => {
    if (!courseId) {
      console.error("Course ID is undefined");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/courses/${courseId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: "Active" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update course status.");
      }

      toast.success("Course accepted successfully!");

      // Cập nhật lại danh sách ngay lập tức
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.courseId === courseId
            ? { ...course, status: "Active" }
            : course
        )
      );

      // Đóng modal
      setEditingCourse(null);
    } catch (error) {
      console.error("Error updating course status:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleReject = async (courseId) => {
    if (!courseId) {
      console.error("Course ID is undefined");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/courses/${courseId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: "Declined" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update course status.");
      }

      toast.success("Course rejected successfully!");

      // Cập nhật lại danh sách ngay lập tức
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.courseId === courseId
            ? { ...course, status: "Declined" }
            : course
        )
      );

      // Đóng modal
      setEditingCourse(null);
    } catch (error) {
      console.error("Error updating course status:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleView = (course) => {
    setEditingCourse(course); // Hiển thị chi tiết khóa học
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">
          Courses Pending Review and Approval
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {editingCourse ? (
        // Form chi tiết khóa học
        <div className="bg-gray-700 p-4 rounded-lg">
          {/* Ảnh khóa học */}
          <div className="flex justify-center mb-4">
            <Swiper
              spaceBetween={10} // Khoảng cách giữa các slide
              slidesPerView={1} // Hiển thị 1 ảnh mỗi lần
              // navigation={true} // Hiển thị nút mũi tên điều hướng
              loop={true} // Cho phép vòng lặp (quay lại ảnh đầu tiên khi đi qua ảnh cuối)
              className="w-full h-[500px]" // Cập nhật kích thước cho Swiper (mở rộng chiều rộng)
            >
              {editingCourse.imageUrls &&
                editingCourse.imageUrls.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-full h-full overflow-hidden rounded-lg">
                      {" "}
                      {/* Sử dụng w-full và h-full để phóng to */}
                      <img
                        src={image}
                        alt={`Course Image ${index + 1}`}
                        className="w-full h-full object-cover" // Đảm bảo hình ảnh chiếm toàn bộ không gian của div
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          <h3 className="text-lg font-semibold text-gray-100 mb-4">
            Course Details
          </h3>

          {/* Hiển thị thông tin chi tiết của khóa học */}
          <div className="mb-4">
            <label className="text-gray-400">Name:</label>
            <input
              type="text"
              name="name"
              value={editingCourse.title}
              className="w-full p-2 bg-gray-600 text-white rounded-lg"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400">Instructor:</label>
            <input
              type="text"
              name="instructorName"
              value={`${editingCourse.instructorFirstName} ${editingCourse.instructorLastName}`}
              className="w-full p-2 bg-gray-600 text-white rounded-lg"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400">Category:</label>
            <input
              type="text"
              name="category"
              value={editingCourse.categoryName}
              className="w-full p-2 bg-gray-600 text-white rounded-lg"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400">Description:</label>
            <textarea
              name="description"
              value={editingCourse.description}
              className="w-full p-2 bg-gray-600 text-white rounded-lg"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400">Price:</label>
            <input
              type="text"
              name="price"
              value={`$${editingCourse.price}`}
              className="w-full p-2 bg-gray-600 text-white rounded-lg"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400">Duration:</label>
            <input
              type="text"
              name="duration"
              value={editingCourse.duration}
              className="w-full p-2 bg-gray-600 text-white rounded-lg"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400">Language:</label>
            <input
              type="text"
              name="language"
              value={editingCourse.language}
              className="w-full p-2 bg-gray-600 text-white rounded-lg"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400">Rating:</label>
            <input
              type="text"
              name="rating"
              value={editingCourse.rating}
              className="w-full p-2 bg-gray-600 text-white rounded-lg"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400">Level:</label>
            <input
              type="text"
              name="level"
              value={editingCourse.level}
              className="w-full p-2 bg-gray-600 text-white rounded-lg"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400">Level:</label>
            <input
              type="text"
              name="level"
              value={editingCourse.level}
              className="w-full p-2 bg-gray-600 text-white rounded-lg"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-400">Target Audience:</label>
            <ul className="w-full p-2 bg-gray-600 text-white rounded-lg">
              {editingCourse.targetAudience &&
                editingCourse.targetAudience.map((audience, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <FaUserCircle /> <span>{audience}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="mb-4">
            <label className="text-gray-400">Course Content:</label>
            <ul className="w-full p-2 bg-gray-600 text-white rounded-lg">
              {editingCourse.courseContent &&
                editingCourse.courseContent.map((content, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <FaBook /> <span>{content}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="mb-4">
            <label className="text-gray-400">Resources:</label>
            <ul className="w-full p-2 bg-gray-600 text-white rounded-lg">
              {editingCourse.resourceDescription &&
                editingCourse.resourceDescription.map((resource, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <FaTools /> <span>{resource}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="mb-4">
            <label className="text-gray-400">Requirements:</label>
            <ul className="w-full p-2 bg-gray-600 text-white rounded-lg">
              {editingCourse.requirements &&
                editingCourse.requirements.map((requirement, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <FaClipboardList /> <span>{requirement}</span>
                  </li>
                ))}
            </ul>
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={() => {
              if (!editingCourse || !editingCourse.courseId) {
                console.error("Course ID is undefined");
                return;
              }
              handleAccept(editingCourse.courseId);
            }}
          >
            Accept
          </button>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={() => {
              if (!editingCourse || !editingCourse.courseId) {
                console.error("Course ID is undefined");
                return;
              }
              handleReject(editingCourse.courseId);
            }}
          >
            Reject
          </button>

          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setEditingCourse(null)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <table className="table-auto w-full text-left text-gray-100">
          <thead>
            <tr className="border-b bg-gray-700">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Duration</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.map((course, index) => (
              <tr key={course.id} className="border-b bg-gray-800">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{course.title}</td>
                <td className="py-2 px-4">{course.duration}</td>
                <td className="py-2 px-4">{course.categoryName}</td>
                <td className="py-2 px-4">${course.price}</td>
                <td className="py-2 px-4 text-yellow-500">{course.status}</td>
                <td className="py-2 px-4">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                    onClick={() => handleView(course)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-between mt-4">
      <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
      >
          Prev
      </button>
  
      <div className="flex items-center">
          {(() => {
              const pages = [];
  
              if (totalPages <= 13) {
                  // Hiển thị tất cả các trang nếu tổng số trang <= 13
                  for (let i = 1; i <= totalPages; i++) {
                      pages.push(
                          <button
                              key={i}
                              onClick={() => handlePageChange(i)}
                              className={`px-4 py-2 mx-1 rounded-lg ${
                                  currentPage === i ? "bg-yellow-500 text-white" : "bg-gray-700 text-gray-300"
                              }`}
                          >
                              {i}
                          </button>
                      );
                  }
              } else {
                  // Hiển thị 10 trang đầu và 3 trang cuối, với logic động
                  if (currentPage <= 10) {
                      for (let i = 1; i <= 10; i++) {
                          pages.push(
                              <button
                                  key={i}
                                  onClick={() => handlePageChange(i)}
                                  className={`px-4 py-2 mx-1 rounded-lg ${
                                      currentPage === i ? "bg-yellow-500 text-white" : "bg-gray-700 text-gray-300"
                                  }`}
                              >
                                  {i}
                              </button>
                          );
                      }
                      pages.push(<span key="dots-end" className="px-4 py-2">...</span>);
                      for (let i = totalPages - 2; i <= totalPages; i++) {
                          pages.push(
                              <button
                                  key={i}
                                  onClick={() => handlePageChange(i)}
                                  className={`px-4 py-2 mx-1 rounded-lg ${
                                      currentPage === i ? "bg-yellow-500 text-white" : "bg-gray-700 text-gray-300"
                                  }`}
                              >
                                  {i}
                              </button>
                          );
                      }
                  } else if (currentPage > 10 && currentPage <= totalPages - 10) {
                      pages.push(
                          <button
                              key={1}
                              onClick={() => handlePageChange(1)}
                              className={`px-4 py-2 mx-1 rounded-lg bg-gray-700 text-gray-300`}
                          >
                              1
                          </button>
                      );
                      pages.push(<span key="dots-start" className="px-4 py-2">...</span>);
  
                      for (let i = currentPage - 4; i <= currentPage + 4; i++) {
                          pages.push(
                              <button
                                  key={i}
                                  onClick={() => handlePageChange(i)}
                                  className={`px-4 py-2 mx-1 rounded-lg ${
                                      currentPage === i ? "bg-yellow-500 text-white" : "bg-gray-700 text-gray-300"
                                  }`}
                              >
                                  {i}
                              </button>
                          );
                      }
  
                      pages.push(<span key="dots-end" className="px-4 py-2">...</span>);
                      for (let i = totalPages - 2; i <= totalPages; i++) {
                          pages.push(
                              <button
                                  key={i}
                                  onClick={() => handlePageChange(i)}
                                  className={`px-4 py-2 mx-1 rounded-lg ${
                                      currentPage === i ? "bg-yellow-500 text-white" : "bg-gray-700 text-gray-300"
                                  }`}
                              >
                                  {i}
                              </button>
                          );
                      }
                  } else {
                      pages.push(
                          <button
                              key={1}
                              onClick={() => handlePageChange(1)}
                              className={`px-4 py-2 mx-1 rounded-lg bg-gray-700 text-gray-300`}
                          >
                              1
                          </button>
                      );
                      pages.push(<span key="dots-start" className="px-4 py-2">...</span>);
  
                      for (let i = totalPages - 12; i <= totalPages; i++) {
                          pages.push(
                              <button
                                  key={i}
                                  onClick={() => handlePageChange(i)}
                                  className={`px-4 py-2 mx-1 rounded-lg ${
                                      currentPage === i ? "bg-yellow-500 text-white" : "bg-gray-700 text-gray-300"
                                  }`}
                              >
                                  {i}
                              </button>
                          );
                      }
                  }
              }
  
              return pages;
          })()}
      </div>
  
      <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
      >
          Next
      </button>
  </div>
  
    </motion.div>
  );
};

export default CoursesTable;
