"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: <Layout size={22} />, 
    label: "Dashboard",
    href: "/",
  },
  {
    icon: <Compass size={22} />, 
    label: "Browse",
    href: "/search",
  }
];

const teacherRoutes = [
  {
    icon: <List size={22} />, 
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: <BarChart size={22} />, 
    label: "Analytics",
    href: "/teacher/analytics",
  }
]

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem 
          key={route.href}
          icon={route.icon} 
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
