import {
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarDays,
  Settings2,
  Bell,
  Settings,
  UserCircle,
  GraduationCap,
  School,
} from "lucide-react";

const adminNavigation = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: "Overview",
        url: "/dashboard",
      },
    ],
  },
  {
    title: "Schools",
    url: "#",
    icon: School,
    items: [
      { title: "All Schools", url: "/dashboard/schools" },
      { title: "Add School", url: "/dashboard/schools/create" },
    ],
  },
  {
    title: "Contacts",
    url: "#",
    icon: School,
    items: [{ title: "Contacts", url: "/dashboard/contacts" }],
  },
];

const schoolAdminNavigation = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: "Overview",
        url: "/dashboard",
      },
    ],
  },
  {
    title: "Students",
    url: "#",
    icon: Users,
    items: [
      { title: "Directory", url: "/dashboard/students" },
      { title: "Create", url: "/dashboard/students/create" },
      { title: "Attendance", url: "/dashboard/students/attendance" },
      { title: "Performance", url: "/dashboard/students/performance" },
    ],
  },
  {
    title: "Teachers",
    url: "#",
    icon: GraduationCap,
    items: [
      { title: "Directory", url: "/dashboard/teachers" },
      { title: "Create", url: "/dashboard/teachers/create" },
      { title: "Attendance", url: "/dashboard/teachers/attendance" },
      { title: "Performance", url: "/dashboard/teachers/performance" },
    ],
  },
  {
    title: "Parents",
    url: "#",
    icon: UserCircle,
    items: [
      { title: "Directory", url: "/dashboard/parents" },
      { title: "Create", url: "/dashboard/parents/create" },
      { title: "Communication", url: "/dashboard/parents/communication" },
    ],
  },
  {
    title: "Academics",
    url: "#",
    icon: BookOpen,
    items: [
      { title: "Classes and Sections", url: "/dashboard/academics/classes" },
      { title: "Departments", url: "/dashboard/academics/departments" },
      { title: "Subjects", url: "/dashboard/academics/subjects" },
      { title: "Terms", url: "/dashboard/academics/terms" },
      { title: "Assignments", url: "/dashboard/academics/assignments" },
      { title: "Timetable", url: "/dashboard/academics/timetable" },
    ],
  },
  {
    title: "Schedule",
    url: "#",
    icon: CalendarDays,
    items: [
      { title: "Calendar", url: "/dashboard/schedule/calendar" },
      { title: "Events", url: "/dashboard/schedule/events" },
      { title: "Timetable", url: "/dashboard/schedule/timetable" },
    ],
  },
];

const teacherNavigation = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: "Overview",
        url: "/dashboard",
      },
    ],
  },
  {
    title: "My Classes",
    url: "#",
    icon: BookOpen,
    items: [
      { title: "Class List", url: "/dashboard/teacher/classes" },
      { title: "Attendance", url: "/dashboard/teacher/attendance" },
      { title: "Assignments", url: "/dashboard/teacher/assignments" },
    ],
  },
  {
    title: "Schedule",
    url: "#",
    icon: CalendarDays,
    items: [
      { title: "Timetable", url: "/dashboard/teacher/timetable" },
      { title: "Calendar", url: "/dashboard/teacher/calendar" },
    ],
  },
];

const studentNavigation = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: "Overview",
        url: "/dashboard",
      },
    ],
  },
  {
    title: "Academics",
    url: "#",
    icon: BookOpen,
    items: [
      { title: "My Classes", url: "/dashboard/student/classes" },
      { title: "Assignments", url: "/dashboard/student/assignments" },
      { title: "Grades", url: "/dashboard/student/grades" },
    ],
  },
  {
    title: "Schedule",
    url: "#",
    icon: CalendarDays,
    items: [
      { title: "Timetable", url: "/dashboard/student/timetable" },
      { title: "Calendar", url: "/dashboard/student/calendar" },
    ],
  },
];

const parentNavigation = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: "Overview",
        url: "/dashboard",
      },
    ],
  },
  {
    title: "Children",
    url: "#",
    icon: Users,
    items: [
      { title: "Directory", url: "/dashboard/parent/childrens" },
      { title: "Performance", url: "/dashboard/parent/childrens/performance" },
      { title: "Attendance", url: "/dashboard/parent/childrens/attendance" },
      { title: "Grades", url: "/dashboard/parent/children/grades" },
    ],
  },
  {
    title: "Communication",
    url: "#",
    icon: Bell,
    items: [{ title: "Messages", url: "/dashboard/parent/messages" }],
  },
];

export const navigationData = {
  // Make schoolAdmin the first option and use as default
  schoolAdmin: {
    navMain: schoolAdminNavigation,
    configurations: [
      {
        name: "Notifications",
        url: "/dashboard/notifications",
        icon: Bell,
      },
      {
        name: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
  admin: {
    navMain: adminNavigation,
    configurations: [
      {
        name: "Notifications",
        url: "/dashboard/notifications",
        icon: Bell,
      },
      {
        name: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
  teacher: {
    navMain: teacherNavigation,
    configurations: [
      {
        name: "Notifications",
        url: "/dashboard/notifications",
        icon: Bell,
      },
      {
        name: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
  student: {
    navMain: studentNavigation,
    configurations: [
      {
        name: "Notifications",
        url: "/dashboard/notifications",
        icon: Bell,
      },
      {
        name: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
  parent: {
    navMain: parentNavigation,
    configurations: [
      {
        name: "Notifications",
        url: "/dashboard/notifications",
        icon: Bell,
      },
      {
        name: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
};

// Set default navigation
export const defaultNavigation = navigationData.schoolAdmin;
