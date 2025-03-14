import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../utils/authAPI";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading user information...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No user information available</div>;

  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>
      <div className="user-info">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {user.role && (
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        )}
        {/* Add more user information as needed */}
      </div>
    </div>
  );
};

export default UserProfile;
