import BookNow from "./pages/BookNow";
import Home from "./pages/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/dashboard/Sidebar";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/contact-us" element={<BookNow />} />
          <Route path="/dashboard" element={<Sidebar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
