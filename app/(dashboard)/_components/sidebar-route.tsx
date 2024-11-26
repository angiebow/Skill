"use client";

import { Compass, Layout } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: <Layout size={22} />, // Pre-rendered JSX
    label: "Dashboard",
    href: "/",
  },
  {
    icon: <Compass size={22} />, // Pre-rendered JSX
    label: "Browse",
    href: "/search",
  }
];

export const SidebarRoutes = () => {
  const routes = guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem 
          key={route.href}
          icon={route.icon} // Now passing pre-rendered JSX
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
