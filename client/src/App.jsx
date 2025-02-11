import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BookNow from "./pages/BookNow";

// 404 NotFound
import NotFound from "./pages/NotFound";

// Auth
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

// Dashboard & Sidebar
import Sidebar from "./pages/dashboard/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/dashboard/Setting";
import ContactSubmissions from "./pages/dashboard/admin/contacts/Contacts";

// Students
import StudentDirectory from "./pages/dashboard/students/StudentDirectory";
import StudentDetails from "./pages/dashboard/students/StudentDetails";
import CreateStudents from "./pages/dashboard/students/CreateStudents";

// Parents
import ParentDirectory from "./pages/dashboard/parents/ParentDirectory";
import ParentDetails from "./pages/dashboard/parents/ParentDetails";
import CreateParents from "./pages/dashboard/parents/CreateParents";

// Teachers
import TeacherDirectory from "./pages/dashboard/teachers/TeacherDirectory";
import TeacherDetails from "./pages/dashboard/teachers/TeacherDetails";
import CreateTeachers from "./pages/dashboard/teachers/CreateTeachers";

// Academic
import AcademicOverview from "./pages/dashboard/academics/AcademicOverview";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/contact-us" element={<BookNow />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Sidebar />}>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="contacts" element={<ContactSubmissions />} />

            {/* Students */}
            <Route path="students" element={<StudentDirectory />} />
            <Route path="students/create" element={<CreateStudents />} />
            <Route path="students/:id" element={<StudentDetails />} />
            <Route path="students/edit/:id" element={<CreateStudents />} />

            {/* Parents */}
            <Route path="parents" element={<ParentDirectory />} />
            <Route path="parents/create" element={<CreateParents />} />
            <Route path="parents/:id" element={<ParentDetails />} />
            <Route path="parents/edit/:id" element={<CreateParents />} />

            {/* Teachers */}
            <Route path="teachers" element={<TeacherDirectory />} />
            <Route path="teachers/create" element={<CreateTeachers />} />
            <Route path="teachers/:id" element={<TeacherDetails />} />
            <Route path="teachers/edit/:id" element={<CreateTeachers />} />

            {/* Classes Routes */}
            <Route path="classes" element={<AcademicOverview />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
