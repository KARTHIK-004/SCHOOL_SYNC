import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import TeacherDashboard from "./teacher/TeacherDashboard";
import StudentDashboard from "./student/StudentDashboard";
import ParentDashboard from "./parent/ParentDashboard";
import SchoolAdminDashboard from "./school-admin/SchoolAdminDashboard";

function Dashboard() {
  const navigate = useNavigate();
  const [dashboardOverview, setDashboardOverview] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/sign-in");
      return;
    }

    switch (user.role) {
      case "admin":
        setDashboardOverview(<AdminDashboard />);
        break;
      case "schoolAdmin":
        setDashboardOverview(<SchoolAdminDashboard />);
        break;
      case "teacher":
        setDashboardOverview(<TeacherDashboard />);
        break;
      case "student":
        setDashboardOverview(<StudentDashboard />);
        break;
      case "parent":
        setDashboardOverview(<ParentDashboard />);
        break;
      default:
        navigate("/sign-in");
    }
  }, [navigate]);

  return dashboardOverview;
}

export default Dashboard;
