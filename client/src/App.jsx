import BookNow from "./pages/BookNow";
import Home from "./pages/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/dashboard/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/dashboard/Setting";
import StudentDirectory from "./pages/dashboard/student/StudentDirectory";

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
            <Route path="settings" element={<Settings />} />
            <Route path="students/directory" element={<StudentDirectory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
