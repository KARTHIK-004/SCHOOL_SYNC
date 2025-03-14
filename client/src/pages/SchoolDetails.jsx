import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSchool } from "@/utils/schoolAPI";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SchoolDetails = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchoolDetails = async () => {
      try {
        setLoading(true);
        const response = await getSchool(schoolId);
        setSchool(response.data.school);
        setError(null);
      } catch (err) {
        console.error("Error fetching school details:", err);
        setError(err.message || "Failed to load school details");
      } finally {
        setLoading(false);
      }
    };

    if (schoolId) {
      fetchSchoolDetails();
    }
  }, [schoolId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button onClick={handleGoBack} className="mt-4">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>School Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The school you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={handleGoBack} className="mt-4">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">
              {school.schoolName}
            </CardTitle>
            <p className="text-muted-foreground">{school.schoolType} School</p>
          </div>
          {school.schoolLogo && (
            <img
              src={school.schoolLogo}
              alt={`${school.schoolName} logo`}
              className="h-16 w-16 object-contain"
            />
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">School Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Curriculum:</span>{" "}
                  {school.curriculum}
                </p>
                <p>
                  <span className="font-medium">Admin:</span> {school.adminName}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Contact Information
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {school.contactEmail}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {school.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={handleGoBack} variant="outline" className="mr-2">
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolDetails;
