"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname.startsWith("/teacher");
  const isPlayerPage = pathname.includes("/chapter"); 

  const handleLogout = () => {
    // Perform logout logic
    console.log("Logged out!");
  };

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Button onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2"/>
        </Button>
      ) : (
        <Link href="/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher mode
          </Button>
        </Link>
      )}
      <UserButton />
    </div>
  );
};
