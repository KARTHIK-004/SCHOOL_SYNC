import BookNow from "./pages/BookNow";
import Home from "./pages/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/dashboard/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/dashboard/Setting";
import StudentDirectory from "./pages/dashboard/students/StudentDirectory";
import ContactSubmissions from "./pages/dashboard/admin/contacts/Contacts";
import CreateStudents from "./pages/dashboard/students/CreateStudents";
import StudentDetails from "./pages/dashboard/students/StudentDetails";
import NotFound from "./pages/NotFound";
<<<<<<< HEAD
import CreateParents from "./pages/dashboard/parents/CreateParents";
import ParentDetails from "./pages/dashboard/parents/ParentDetails";
import ParentDirectory from "./pages/dashboard/parents/ParentDirectory";
=======
import ParentDirectory from "./pages/dashboard/parents/ParentDirectory";
import ParentDetails from "./pages/dashboard/parents/ParentDetails";
import CreateParents from "./pages/dashboard/parents/CreateParents";
>>>>>>> a1d8ad91df15095a531d4be4459849b98dc5903d

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/contact-us" element={<BookNow />} />
          <Route path="/dashboard" element={<Sidebar />}>
            <Route index element={<Dashboard />} />
            {/* Configurations */}
            <Route path="contacts" element={<ContactSubmissions />} />
            <Route path="settings" element={<Settings />} />
            {/* Students */}
            <Route path="students" element={<StudentDirectory />} />
            <Route path="students/:id" element={<StudentDetails />} />
            <Route path="students/create" element={<CreateStudents />} />
            <Route path="students/edit/:id" element={<CreateStudents />} />
            {/* Parents */}
            <Route path="parents" element={<ParentDirectory />} />
            <Route path="parents/:id" element={<ParentDetails />} />
            <Route path="parents/create" element={<CreateParents />} />
            <Route path="parents/edit/:id" element={<CreateParents />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
