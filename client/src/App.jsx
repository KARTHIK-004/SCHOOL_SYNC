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
import Notifications from "./pages/dashboard/Notifications";

// Students
import StudentDirectory from "./pages/dashboard/school-admin/students/StudentDirectory.jsx";
import StudentDetails from "./pages/dashboard/school-admin/students/StudentDetails";
import CreateStudents from "./pages/dashboard/school-admin/students/CreateStudents";

// Parents
import ParentDirectory from "./pages/dashboard/school-admin/parents/ParentDirectory";
import ParentDetails from "./pages/dashboard/school-admin/parents/ParentDetails";
import CreateParents from "./pages/dashboard/school-admin/parents/CreateParents";

// Teachers
import TeacherDirectory from "./pages/dashboard/school-admin/teachers/TeacherDirectory";
import TeacherDetails from "./pages/dashboard/school-admin/teachers/TeacherDetails";
import CreateTeachers from "./pages/dashboard/school-admin/teachers/CreateTeachers";

// Academic
import AcademicOverview from "./pages/dashboard/academics/AcademicOverview";
import { SectionList } from "./pages/dashboard/academics/sections/SectionList";
import AcademicPlaceholder from "./pages/dashboard/academics/AcademicPlaceholder";
import CreateSection from "./pages/dashboard/academics/sections/CreateSections";
import CreateClasses from "./pages/dashboard/academics/classes/CreateClasses";
import HowItWorks from "./pages/HowItWorks";
import CreateSchool from "./pages/dashboard/school-admin/schools/CreateSchool";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/contact-us" element={<BookNow />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Sidebar />}>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="contacts" element={<ContactSubmissions />} />
            <Route path="notifications" element={<Notifications />} />

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
            <Route path="academics/classes" element={<AcademicOverview />}>
              <Route index element={<AcademicPlaceholder />} />
              <Route path="create" element={<CreateClasses />} />
              <Route path="edit/:id" element={<CreateClasses />} />
              <Route path=":classId/sections">
                <Route index element={<SectionList />} />
                <Route path="create" element={<CreateSection />} />
                <Route path="edit/:sectionId" element={<CreateSection />} />
              </Route>
            </Route>

            {/* School Routes */}
            <Route path="schools/create" element={<CreateSchool />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
