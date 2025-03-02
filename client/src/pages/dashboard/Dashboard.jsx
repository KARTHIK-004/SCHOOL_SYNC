import AdminDashboard from "./admin/AdminDashboard";
import TeacherDashboard from "./teacher/TeacherDashboard";
import StudentDashboard from "./student/StudentDashboard";
import ParentDashboard from "./parent/ParentDashboard";
import SchoolAdminDashboard from "./school-admin/SchoolAdminDashboard";

function Dashboard() {
  const userRole = localStorage.getItem("userRole") || "schoolAdmin";

  switch (userRole) {
    case "admin":
      return <AdminDashboard />;

    case "schoolAdmin":
      return <SchoolAdminDashboard />;

    case "teacher":
      return <TeacherDashboard />;

    case "student":
      return <StudentDashboard />;

    case "parent":
      return <ParentDashboard />;

    default:
      return <SchoolAdminDashboard />;
  }
}

export default Dashboard;
