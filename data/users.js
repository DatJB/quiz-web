const defaultUsers = [
  {
    id: "1",
    username: "annv",
    password: "123456",
    fullName: "Nguyễn Văn An",
    email: "annv@student.ptit.edu.vn",
    studentCode: "B20DCCN001",
    role: "student",
    createdAt: "2026-02-28"
  },
  {
    id: "2",
    username: "binhtt",
    password: "123456",
    fullName: "Trần Thị Bình",
    email: "binhtt@student.ptit.edu.vn",
    studentCode: "B20DCCN002",
    role: "student",
    createdAt: "2026-02-28"
  },
  {
    id: "3",
    username: "cuonglv",
    password: "123456",
    fullName: "Lê Văn Cường",
    email: "cuonglv@student.ptit.edu.vn",
    studentCode: "B20DCCN003",
    role: "student",
    createdAt: "2026-02-28"
  },
  {
    id: "4",
    username: "dungpt",
    password: "123456",
    fullName: "Phạm Thị Dung",
    email: "dungpt@student.ptit.edu.vn",
    studentCode: "B20DCCN004",
    role: "student",
    createdAt: "2026-02-28"
  },
  {
    id: "5",
    username: "emhv",
    password: "123456",
    fullName: "Hoàng Văn Em",
    email: "emhv@student.ptit.edu.vn",
    studentCode: "B20DCCN005",
    role: "student",
    createdAt: "2026-02-28"
  },
  {
    id: "6",
    username: "admin",
    password: "admin123",
    fullName: "Administrator",
    email: "admin@ptit.edu.vn",
    studentCode: null,
    role: "admin",
    createdAt: "2026-02-28"
  }
];

function initUsers() {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(defaultUsers));
    }
}