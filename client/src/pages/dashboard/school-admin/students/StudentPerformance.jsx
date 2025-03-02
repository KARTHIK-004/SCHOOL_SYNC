import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";

const performanceData = [
  { subject: "Mathematics", score: 85, average: 75 },
  { subject: "Science", score: 92, average: 78 },
  { subject: "English", score: 88, average: 80 },
  { subject: "History", score: 78, average: 72 },
  { subject: "Physics", score: 90, average: 76 },
];

const attendanceData = [
  { month: "Jan", present: 95 },
  { month: "Feb", present: 98 },
  { month: "Mar", present: 92 },
  { month: "Apr", present: 96 },
  { month: "May", present: 94 },
];

export default function StudentPerformance() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Student Performance
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Academic Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#0ea5e9" name="Student Score" />
                  <Bar dataKey="average" fill="#94a3b8" name="Class Average" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="present" fill="#22c55e" name="Attendance %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Assessment Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Mathematics</TableCell>
                  <TableCell>Mid-Term Exam</TableCell>
                  <TableCell>2024-02-15</TableCell>
                  <TableCell>85/100</TableCell>
                  <TableCell>A</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Science</TableCell>
                  <TableCell>Project</TableCell>
                  <TableCell>2024-02-10</TableCell>
                  <TableCell>92/100</TableCell>
                  <TableCell>A+</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>English</TableCell>
                  <TableCell>Quiz</TableCell>
                  <TableCell>2024-02-08</TableCell>
                  <TableCell>88/100</TableCell>
                  <TableCell>A</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>History</TableCell>
                  <TableCell>Assignment</TableCell>
                  <TableCell>2024-02-05</TableCell>
                  <TableCell>78/100</TableCell>
                  <TableCell>B+</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
