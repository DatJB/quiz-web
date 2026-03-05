const defaultExam = [
  {
    id: "1",
    title: "Luyện tập - Lập trình Web",
    description: "Bài tập luyện tập về HTML, CSS, JavaScript cơ bản",
    type: "practice",
    status: "free",
    duration: 30,
    totalQuestions: 10,
    questions: [
      {
        id: "q1",
        question: "HTML là viết tắt của từ gì?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language"
        ],
        correctAnswer: 0,
        explanation: "HTML là viết tắt của Hyper Text Markup Language - ngôn ngữ đánh dấu siêu văn bản."
      },
      {
        id: "q2",
        question: "CSS được sử dụng để làm gì?",
        options: [
          "Tạo cấu trúc trang web",
          "Tạo hiệu ứng động",
          "Định dạng giao diện trang web",
          "Xử lý dữ liệu"
        ],
        correctAnswer: 2,
        explanation: "CSS (Cascading Style Sheets) được sử dụng để định dạng và tạo giao diện cho trang web."
      },
      {
        id: "q3",
        question: "JavaScript là ngôn ngữ lập trình gì?",
        options: [
          "Ngôn ngữ biên dịch",
          "Ngôn ngữ kịch bản",
          "Ngôn ngữ đánh dấu",
          "Ngôn ngữ truy vấn"
        ],
        correctAnswer: 1,
        explanation: "JavaScript là ngôn ngữ lập trình kịch bản (scripting language) chạy trên trình duyệt."
      },
      {
        id: "q4",
        question: "Thẻ nào dùng để tạo liên kết trong HTML?",
        options: [
          "link",
          "a",
          "href",
          "url"
        ],
        correctAnswer: 1,
        explanation: "Thẻ <a> (anchor) được sử dụng để tạo liên kết trong HTML."
      },
      {
        id: "q5",
        question: "Thuộc tính nào dùng để thay đổi màu nền trong CSS?",
        options: [
          "color",
          "bg-color",
          "background-color",
          "bgcolor"
        ],
        correctAnswer: 2,
        explanation: "Thuộc tính background-color được sử dụng để thay đổi màu nền."
      },
      {
        id: "q6",
        question: "Hàm nào dùng để in ra console trong JavaScript?",
        options: [
          "print()",
          "log()",
          "console.log()",
          "write()"
        ],
        correctAnswer: 2,
        explanation: "console.log() là hàm được sử dụng để in ra console trong JavaScript."
      },
      {
        id: "q7",
        question: "DOM là viết tắt của gì?",
        options: [
          "Document Object Model",
          "Data Object Model",
          "Digital Object Management",
          "Document Orientation Model"
        ],
        correctAnswer: 0,
        explanation: "DOM là Document Object Model - mô hình đối tượng tài liệu."
      },
      {
        id: "q8",
        question: "Phiên bản HTML mới nhất là gì?",
        options: [
          "HTML4",
          "HTML5",
          "HTML6",
          "XHTML"
        ],
        correctAnswer: 1,
        explanation: "HTML5 là phiên bản HTML mới nhất và được sử dụng rộng rãi."
      },
      {
        id: "q9",
        question: "Thuộc tính nào dùng để thêm class trong HTML?",
        options: [
          "className",
          "class",
          "style",
          "id"
        ],
        correctAnswer: 1,
        explanation: "Thuộc tính class được sử dụng để thêm class vào phần tử HTML."
      },
      {
        id: "q10",
        question: "JSON là gì?",
        options: [
          "Java Standard Object Notation",
          "JavaScript Object Notation",
          "Java Simple Object Network",
          "JavaScript Oriented Notation"
        ],
        correctAnswer: 1,
        explanation: "JSON là JavaScript Object Notation - định dạng dữ liệu dạng văn bản."
      }
    ]
  },
  {
    id: "2",
    title: "Giữa kỳ - Cơ sở dữ liệu",
    description: "Kiểm tra giữa kỳ môn Cơ sở dữ liệu",
    type: "midterm",
    status: "scheduled",
    duration: 90,
    totalQuestions: 20,
    scheduledDate: "2026-03-15T09:00:00",
    questions: [
      {
        id: "q1",
        question: "SQL là viết tắt của gì?",
        options: [
          "Structured Query Language",
          "Simple Query Language",
          "System Query Language",
          "Standard Query Language"
        ],
        correctAnswer: 0,
        explanation: "SQL là Structured Query Language - ngôn ngữ truy vấn có cấu trúc."
      },
      {
        id: "q2",
        question: "Lệnh nào dùng để lấy dữ liệu từ bảng?",
        options: [
          "GET",
          "SELECT",
          "FETCH",
          "RETRIEVE"
        ],
        correctAnswer: 1,
        explanation: "Lệnh SELECT được sử dụng để truy vấn và lấy dữ liệu từ bảng."
      },
      {
        id: "q3",
        question: "Primary Key có tính chất gì?",
        options: [
          "Có thể trùng lặp",
          "Có thể NULL",
          "Duy nhất và không NULL",
          "Không bắt buộc"
        ],
        correctAnswer: 2,
        explanation: "Primary Key phải có giá trị duy nhất và không được NULL."
      },
      {
        id: "q4",
        question: "Lệnh nào dùng để thêm dữ liệu vào bảng?",
        options: [
          "ADD",
          "INSERT",
          "CREATE",
          "APPEND"
        ],
        correctAnswer: 1,
        explanation: "Lệnh INSERT được sử dụng để thêm dữ liệu mới vào bảng."
      },
      {
        id: "q5",
        question: "Foreign Key là gì?",
        options: [
          "Khóa ngoại",
          "Khóa chính",
          "Khóa duy nhất",
          "Khóa tổng hợp"
        ],
        correctAnswer: 0,
        explanation: "Foreign Key là khóa ngoại, dùng để liên kết giữa các bảng."
      },
      {
        id: "q6",
        question: "Lệnh UPDATE dùng để làm gì?",
        options: [
          "Thêm dữ liệu mới",
          "Xóa dữ liệu",
          "Cập nhật dữ liệu",
          "Tạo bảng mới"
        ],
        correctAnswer: 2,
        explanation: "Lệnh UPDATE được sử dụng để cập nhật dữ liệu có sẵn trong bảng."
      },
      {
        id: "q7",
        question: "Lệnh DELETE dùng để làm gì?",
        options: [
          "Xóa cột",
          "Xóa bảng",
          "Xóa dữ liệu",
          "Xóa database"
        ],
        correctAnswer: 2,
        explanation: "Lệnh DELETE được sử dụng để xóa các dòng dữ liệu trong bảng."
      },
      {
        id: "q8",
        question: "JOIN được sử dụng để làm gì?",
        options: [
          "Kết hợp dữ liệu từ nhiều bảng",
          "Sao chép bảng",
          "Xóa dữ liệu",
          "Tạo index"
        ],
        correctAnswer: 0,
        explanation: "JOIN được sử dụng để kết hợp dữ liệu từ hai hoặc nhiều bảng."
      },
      {
        id: "q9",
        question: "WHERE clause được dùng để làm gì?",
        options: [
          "Sắp xếp dữ liệu",
          "Lọc dữ liệu",
          "Nhóm dữ liệu",
          "Đếm dữ liệu"
        ],
        correctAnswer: 1,
        explanation: "WHERE clause được sử dụng để lọc các dòng dữ liệu theo điều kiện."
      },
      {
        id: "q10",
        question: "GROUP BY dùng để làm gì?",
        options: [
          "Sắp xếp dữ liệu",
          "Nhóm dữ liệu",
          "Lọc dữ liệu",
          "Kết nối bảng"
        ],
        correctAnswer: 1,
        explanation: "GROUP BY được sử dụng để nhóm các dòng dữ liệu có cùng giá trị."
      },
      {
        id: "q11",
        question: "COUNT() là hàm gì?",
        options: [
          "Hàm tính tổng",
          "Hàm đếm số lượng",
          "Hàm tính trung bình",
          "Hàm tìm giá trị lớn nhất"
        ],
        correctAnswer: 1,
        explanation: "COUNT() là hàm đếm số lượng dòng dữ liệu."
      },
      {
        id: "q12",
        question: "INDEX được sử dụng để làm gì?",
        options: [
          "Tăng tốc độ truy vấn",
          "Lưu trữ dữ liệu",
          "Xóa dữ liệu",
          "Sao lưu database"
        ],
        correctAnswer: 0,
        explanation: "INDEX được sử dụng để tăng tốc độ truy vấn dữ liệu."
      },
      {
        id: "q13",
        question: "NULL trong SQL nghĩa là gì?",
        options: [
          "Giá trị 0",
          "Chuỗi rỗng",
          "Không có giá trị",
          "Giá trị âm"
        ],
        correctAnswer: 2,
        explanation: "NULL nghĩa là không có giá trị hoặc giá trị chưa được xác định."
      },
      {
        id: "q14",
        question: "DISTINCT được dùng để làm gì?",
        options: [
          "Lấy tất cả giá trị",
          "Lấy giá trị duy nhất",
          "Đếm giá trị",
          "Sắp xếp giá trị"
        ],
        correctAnswer: 1,
        explanation: "DISTINCT được sử dụng để lấy các giá trị duy nhất, loại bỏ trùng lặp."
      },
      {
        id: "q15",
        question: "ORDER BY mặc định sắp xếp theo thứ tự nào?",
        options: [
          "Giảm dần",
          "Tăng dần",
          "Ngẫu nhiên",
          "Không sắp xếp"
        ],
        correctAnswer: 1,
        explanation: "ORDER BY mặc định sắp xếp theo thứ tự tăng dần (ASC)."
      },
      {
        id: "q16",
        question: "LIMIT được dùng để làm gì?",
        options: [
          "Giới hạn số lượng kết quả",
          "Giới hạn kích thước bảng",
          "Giới hạn số cột",
          "Giới hạn thời gian truy vấn"
        ],
        correctAnswer: 0,
        explanation: "LIMIT được sử dụng để giới hạn số lượng dòng kết quả trả về."
      },
      {
        id: "q17",
        question: "ALTER TABLE dùng để làm gì?",
        options: [
          "Tạo bảng mới",
          "Xóa bảng",
          "Chỉnh sửa cấu trúc bảng",
          "Đổi tên database"
        ],
        correctAnswer: 2,
        explanation: "ALTER TABLE được sử dụng để thay đổi cấu trúc của bảng."
      },
      {
        id: "q18",
        question: "DROP TABLE dùng để làm gì?",
        options: [
          "Xóa dữ liệu trong bảng",
          "Xóa bảng hoàn toàn",
          "Xóa cột",
          "Xóa index"
        ],
        correctAnswer: 1,
        explanation: "DROP TABLE được sử dụng để xóa hoàn toàn bảng và dữ liệu của nó."
      },
      {
        id: "q19",
        question: "Transaction là gì?",
        options: [
          "Một loại bảng",
          "Một nhóm câu lệnh SQL",
          "Một loại khóa",
          "Một hàm SQL"
        ],
        correctAnswer: 1,
        explanation: "Transaction là một nhóm các câu lệnh SQL được thực thi như một đơn vị."
      },
      {
        id: "q20",
        question: "COMMIT dùng để làm gì?",
        options: [
          "Hủy bỏ thay đổi",
          "Lưu thay đổi",
          "Xem thay đổi",
          "Sao chép thay đổi"
        ],
        correctAnswer: 1,
        explanation: "COMMIT được sử dụng để lưu các thay đổi trong transaction."
      }
    ]
  },
  {
    id: "3",
    title: "Cuối kỳ - Lập trình hướng đối tượng",
    description: "Thi cuối kỳ môn Lập trình hướng đối tượng",
    type: "final",
    status: "scheduled",
    duration: 120,
    totalQuestions: 30,
    scheduledDate: "2026-04-20T14:00:00",
    questions: [
      {
        id: "q1",
        question: "OOP là viết tắt của gì?",
        options: [
          "Object Oriented Programming",
          "Object Operation Programming",
          "Organized Object Programming",
          "Operational Object Programming"
        ],
        correctAnswer: 0,
        explanation: "OOP là Object Oriented Programming - lập trình hướng đối tượng."
      },
      {
        id: "q2",
        question: "4 tính chất cơ bản của OOP là gì?",
        options: [
          "Encapsulation, Inheritance, Polymorphism, Abstraction",
          "Class, Object, Method, Property",
          "Public, Private, Protected, Internal",
          "Create, Read, Update, Delete"
        ],
        correctAnswer: 0,
        explanation: "4 tính chất cơ bản là: Đóng gói, Kế thừa, Đa hình, Trừu tượng."
      }
    ]
  },
  {
    id: "4",
    title: "Luyện tập - Mạng máy tính",
    description: "Bài tập ôn tập môn Mạng máy tính",
    type: "practice",
    status: "free",
    duration: 45,
    totalQuestions: 15,
    questions: []
  }
];

function initExams() {
    if (!localStorage.getItem("exams")) {
        localStorage.setItem("exams", JSON.stringify(defaultExam));
    }
}