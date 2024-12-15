# ✨ Admin Dashboard - ReactJS ✨

## 📆 **Tổng Quan Dự Án**
**Tên dự án**: Admin Dashboard  
**Công nghệ sử dụng**: ReactJS, Framer Motion, Tailwind CSS  
**Chức năng chính**:  

### **Dành cho Học viên**
| STT | Tên chức năng                      | Mô tả                                                                 |
|-----|------------------------------------|----------------------------------------------------------------------|
| 1   | Đăng ký tài khoản học viên         | Học viên có thể thực hiện chức năng đăng ký tài khoản để sử dụng trang web |
| 2   | Đăng nhập                         | Thực hiện đăng nhập mới có thể truy cập vào website                |
| 3   | Đăng xuất                         | Học viên có thể đăng xuất để đăng nhập vào tài khoản khác          |
| 4   | Quên mật khẩu                     | Lấy lại mật khẩu nếu quên                                           |
| 5   | Quản lý thông tin cá nhân          | Quản lý các thông tin cá nhân như ngày sinh, họ tên, địa chỉ,...    |
| 6   | Đổi mật khẩu                      | Học viên có thể thay đổi mật khẩu của mình                         |
| 7   | Xem danh sách khóa học theo danh mục | Xem danh sách các khóa học theo các danh mục xác định              |
| 8   | Xem danh sách khóa học theo tiêu chí| Xem danh sách các khóa học theo tiêu chí như giá cả, trình độ,...   |
| 9   | Tìm kiếm khóa học                 | Tìm kiếm khóa học theo tên, giảng viên,...                         |
| 10  | Xem thông tin chi tiết khóa học   | Xem chi tiết thông tin khóa học                                    |
| 11  | Thêm khóa học vào giỏ hàng        | Thêm khóa học chưa đăng ký vào giỏ hàng                            |
| 12  | Quản lý giỏ hàng                  | Quản lý các khóa học có trong giỏ hàng                             |
| 13  | Mua khóa học                      | Thực hiện việc mua và thanh toán khóa học                          |
| 14  | Xem danh sách khóa học đã mua     | Xem các khóa học đã mua                                            |
| 15  | Học khóa học đã mua               | Học các khóa học đã mua                                            |
| 16  | Đánh giá khóa học đã mua          | Đưa ra đánh giá về khóa học                                        |
| 17  | Cập nhật tiến độ học khóa học     | Theo dõi tiến độ học khóa học                                      |
| 18  | Xem danh sách bài kiểm tra        | Xem danh sách bài kiểm tra thuộc khóa học đã đăng ký               |
| 19  | Xem thống kê điểm                 | Xem thống kê điểm qua các lần làm bài kiểm tra                     |
| 20  | Làm bài kiểm tra                  | Làm bài kiểm tra thuộc khóa học đã mua                             |
| 21  | Hỏi đáp câu hỏi của khóa học      | Đặt câu hỏi hoặc trả lời câu hỏi trong khóa học                    |
| 22  | Quản lý danh sách yêu thích       | Quản lý các khóa học trong danh sách yêu thích                     |
| 23  | Thêm khóa học vào danh sách yêu thích| Thêm khóa học chưa có vào danh sách yêu thích                     |

---

### **Dành cho Giảng viên**
| STT | Tên chức năng                     | Mô tả                                                                |
|-----|-----------------------------------|-----------------------------------------------------------------------|
| 1   | Đăng nhập                        | Giảng viên đăng nhập để truy cập website dành cho giảng viên         |
| 2   | Đăng xuất                        | Đăng xuất để đăng nhập vào tài khoản khác                            |
| 3   | Quản lý thông tin cá nhân         | Quản lý các thông tin như ngày sinh, họ tên, địa chỉ,...             |
| 4   | Đổi mật khẩu                     | Giảng viên thực hiện đổi mật khẩu của mình                           |
| 5   | Xem doanh thu                    | Xem doanh thu của các khóa học đã tạo                                |
| 6   | Tạo khóa học                     | Tạo khóa học mới                                                     |
| 7   | Quản lý danh sách khóa học đã tạo| Quản lý các khóa học đã tạo, chỉnh sửa trạng thái hoạt động          |
| 8   | Xem chi tiết khóa học            | Xem thông tin chi tiết của khóa học                                  |
| 9   | Cập nhật giới thiệu khóa học     | Cập nhật giới thiệu khóa học                                         |
| 10  | Cập nhật mô tả khóa học          | Cập nhật mô tả chi tiết cho khóa học                                 |
| 11  | Cập nhật chi tiết bài học        | Cập nhật nội dung bài học trong khóa học                             |
| 12  | Xem danh sách học viên           | Xem danh sách học viên đã đăng ký các khóa học của giảng viên        |
| 13  | Gửi email cho học viên           | Gửi email cho học viên đã đăng ký khóa học                          |
| 14  | Xem đánh giá của học viên        | Xem đánh giá của học viên về khóa học                                |
| 15  | Xem hỏi đáp của học viên         | Xem câu hỏi và trả lời của học viên trong khóa học                   |
| 16  | Đánh giá câu trả lời             | Đánh giá câu trả lời của học viên                                   |
| 17  | Xóa câu trả lời                  | Xóa câu trả lời không phù hợp                                       |
| 18  | Thêm câu trả lời                 | Thêm câu trả lời cho câu hỏi                                        |
| 19  | Xóa câu hỏi                      | Xóa câu hỏi không phù hợp                                           |
| 20  | Tạo bài kiểm tra                 | Tạo bài kiểm tra mới                                                |
| 21  | Xem danh sách bài kiểm tra       | Xem danh sách bài kiểm tra đã tạo                                   |
| 22  | Xem chi tiết bài kiểm tra        | Xem chi tiết thông tin bài kiểm tra                                 |
| 23  | Cập nhật thông tin bài kiểm tra  | Chỉnh sửa nội dung bài kiểm tra                                     |
| 24  | Thêm câu hỏi vào bài kiểm tra    | Thêm câu hỏi mới vào bài kiểm tra                                   |
| 25  | Xóa câu hỏi khỏi bài kiểm tra    | Xóa câu hỏi không còn phù hợp                                       |
| 26  | Thêm đáp án cho câu hỏi          | Thêm đáp án cho câu hỏi trong bài kiểm tra                          |
| 27  | Xóa đáp án của câu hỏi           | Xóa đáp án không hợp lệ                                             |
| 28  | Xóa bài kiểm tra                 | Xóa bài kiểm tra khỏi hệ thống                                      |

---

### **Dành cho Quản trị viên**
| STT | Tên chức năng                     | Mô tả                                                                |
|-----|-----------------------------------|-----------------------------------------------------------------------|
| 1   | Đăng nhập                        | Quản trị viên đăng nhập để truy cập vào hệ thống                     |
| 2   | Đăng xuất                        | Đăng xuất khỏi hệ thống                                              |
| 3   | Xem thống kê thông tin hệ thống  | Xem số lượng học viên, giảng viên, khóa học đang hoạt động           |
| 4   | Xem danh sách học viên           | Xem danh sách học viên trong hệ thống                                |
| 5   | Cập nhật thông tin học viên      | Chỉnh sửa thông tin học viên                                         |
| 6   | Xóa học viên                     | Xóa tài khoản học viên khỏi hệ thống                                |
| 7   | Xem danh sách giảng viên         | Xem danh sách giảng viên trong hệ thống                              |
| 8   | Cập nhật thông tin giảng viên    | Chỉnh sửa thông tin giảng viên                                       |
| 9   | Xóa giảng viên                   | Xóa tài khoản giảng viên khỏi hệ thống                              |
| 10  | Tạo mới user                     | Tạo tài khoản người dùng mới                                         |
| 11  | Xem danh sách danh mục           | Xem danh sách các danh mục khóa học                                  |
| 12  | Cập nhật danh mục                | Cập nhật thông tin danh mục khóa học                                 |
| 13  | Xóa danh mục                     | Xóa danh mục khỏi hệ thống                                          |
| 14  | Xem danh sách khóa học           | Xem danh sách các khóa học trong hệ thống                           |
| 15  | Xem chi tiết khóa học            | Xem thông tin chi tiết của khóa học                                 |
| 16  | Cập nhật trạng thái khóa học     | Cập nhật trạng thái (kích hoạt/không kích hoạt) khóa học            |
| 17  | Xem thống kê doanh thu           | Xem thống kê doanh thu của hệ thống                                 |
| 18  | Xuất file dữ liệu doanh thu      | Xuất file thống kê doanh thu                                        |

---

## 🚀 **Hướng Dẫn Cài Đặt**

### ✅ **Yêu Cầu Môi Trường**
- **Node.js**: Phiên bản mới nhất hoặc từ `14.x` trở lên.  
- **npm** hoặc **yarn**: Công cụ quản lý các thư viện.  

---

### 🔧 **Bước 1: Sao Chép Dự Án**
Clone dự án từ repository:

```bash
git clone https://github.com/TTHTech/ADMINDASHBOARD.git
cd AdminDashboard
```

---

### ♻️ **Bước 2: Cài Đặt Các Phụ Thuộc**
Sử dụng lệnh dưới đây để cài đặt tất cả thư viện phụ thuộc:

```bash
npm install
```

---

### 🌄 **Bước 3: Chạy Dự Án Trong Chế Độ Phát Triển**
Khởi chạy dự án bằng lệnh:

```bash
npm run dev
```

Truy cập địa chỉ:  

```bash
http://localhost:5173
```
