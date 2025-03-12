import { getCurrentUser } from "@/utils/authAPI";
import { useEffect } from "react";
import api from "@/utils/apiConfig";
import { useNavigate } from "react-router-dom";

const OnboardingGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkOnboarding = async () => {
      const user = await getCurrentUser();
      if (user?.role === "schoolAdmin") {
        const schoolRes = await api.get(`/schools?userId=${user.id}`);
        if (!schoolRes.data.data.schools[0]?.hasCompletedOnboarding) {
          navigate("/school-onboard");
        }
      }
    };

    checkOnboarding();
  }, [navigate]);

  return null;
};

export default OnboardingGuard;
