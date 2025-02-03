import { Outlet, useLocation, Link } from "react-router-dom";
import CustomCarousel from "@/components/ui/custom-carousel";
import Logo from "@/components/ui/logo";
import SignInForm from "@/components/Forms/Auth/SignInForm";

export default function SignIn() {
  const location = useLocation();
  const isSignUp = location.pathname.includes("sign-up");

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col p-8 lg:px-12">
        <div className="flex-shrink-0">
          <Logo />
        </div>
        <div className="flex-grow flex items-center justify-center mt-12">
          <SignInForm />
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 relative">
        <CustomCarousel />
      </div>
    </div>
  );
}
