import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BookNow from "./pages/BookNow";
import HowItWorks from "./pages/HowItWorks";

// 404 NotFound
import NotFound from "./pages/NotFound";

// Auth
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

// School Onboard
import SchoolRegistration from "./pages/school-onboard/SchoolRegistration";

// Dashboard & Sidebar
import Sidebar from "./pages/dashboard/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";

// Configuration
import Settings from "./pages/dashboard/Setting";
import Notifications from "./pages/dashboard/Notifications";

// Admin
// Contacts
import ContactSubmissions from "./pages/dashboard/admin/contacts/Contacts";

// School Admin
// Students
import StudentDirectory from "./pages/dashboard/school-admin/students/directory/StudentDirectory";
import StudentDetails from "./pages/dashboard/school-admin/students/StudentDetails";
import CreateStudents from "./pages/dashboard/school-admin/students/CreateStudents";

// Parents
import ParentDirectory from "./pages/dashboard/school-admin/parents/directory/ParentDirectory";
import ParentDetails from "./pages/dashboard/school-admin/parents/ParentDetails";
import CreateParents from "./pages/dashboard/school-admin/parents/CreateParents";

// Teachers
import TeacherDirectory from "./pages/dashboard/school-admin/teachers/directory/TeacherDirectory";
import TeacherDetails from "./pages/dashboard/school-admin/teachers/TeacherDetails";
import CreateTeachers from "./pages/dashboard/school-admin/teachers/CreateTeachers";

// Academics
// Classes
import ClassManagement from "./pages/dashboard/school-admin/academics/class-section/ClassManagement";
import CreateClasses from "./pages/dashboard/school-admin/academics/class-section/classes/CreateClasses";

// Sections
import CreateSection from "./pages/dashboard/school-admin/academics/class-section/sections/CreateSections";
import CreateSchool from "./pages/dashboard/school-admin/schools/CreateSchool";

// Departments
import DepartmentManagement from "./pages/dashboard/school-admin/academics/departments/DepartmentManagement";
import CreateDepartment from "./pages/dashboard/school-admin/academics/departments/CreateDepartment";

// Subjects
import SubjectManagement from "./pages/dashboard/school-admin/academics/subjects/SubjectManagement";
import CreateSubject from "./pages/dashboard/school-admin/academics/subjects/CreateSubject";
import SectionStudents from "./pages/dashboard/school-admin/academics/class-section/sections/SectionStudents";
import EventDirectory from "./pages/dashboard/school-admin/events/EventDirectory";

// Parents Routes
// Children
import ChildrenDirectory from "./pages/dashboard/parent/childrens/ChildrenDirectory";
import CreateEvents from "./pages/dashboard/school-admin/events/CreateEvents";
import ChildrenDetails from "./pages/dashboard/parent/childrens/ChildrenDetails";
import MessageManagement from "./pages/dashboard/parent/messages/MessageManagement";

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
          <Route path="/school-onboard" element={<SchoolRegistration />} />

          <Route path="/dashboard" element={<Sidebar />}>
            <Route index element={<Dashboard />} />
            {/* Configuration Routes */}
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />

            {/* Admin Routes */}
            <Route path="contacts" element={<ContactSubmissions />} />

            {/* Parent Routes */}
            <Route path="parent/childrens" element={<ChildrenDirectory />} />
            <Route path="parent/childrens/:id" element={<ChildrenDetails />} />
            <Route path="parent/messages" element={<MessageManagement />} />

            {/* School Admin Routes */}
            {/* Events */}
            <Route path="events" element={<EventDirectory />} />
            <Route path="events/create" element={<CreateEvents />} />
            <Route path="events/edit/:id" element={<CreateEvents />} />

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

            {/* Academic Routes */}
            <Route path="academics">
              {/* Department Routes */}
              <Route path="departments" element={<DepartmentManagement />} />
              <Route path="departments/create" element={<CreateDepartment />} />
              <Route
                path="departments/edit/:id"
                element={<CreateDepartment />}
              />

              {/* Subject Routes */}
              <Route path="subjects" element={<SubjectManagement />} />
              <Route path="subjects/create" element={<CreateSubject />} />

              {/* Classes Routes */}
              <Route path="classes" element={<ClassManagement />} />
              <Route path="classes/create" element={<CreateClasses />} />
              <Route path="classes/edit/:id" element={<CreateClasses />} />

              {/* Sections Routes */}
              <Route path="classes">
                <Route path="sections/create" element={<CreateSection />} />
                <Route path="sections/edit/:id" element={<CreateSection />} />
                <Route
                  path="sections/:id/students"
                  element={<SectionStudents />}
                />
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
