"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter for navigation
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter(); // To handle programmatic navigation
  const { user } = useUser(); // Hook from Clerk to get user data
  const [showWarning, setShowWarning] = useState(false);

  const isTeacherPage = pathname.startsWith("/teacher");
  const isPlayerPage = pathname.includes("/chapter");

  const handleLogout = () => {
    // Perform logout logic (Clerk will handle logout automatically)
    console.log("Logged out!");
  };

  const handleTeacherModeClick = () => {
    if (!user) {
      // If user is not logged in, show warning popup
      setShowWarning(true);
    } else {
      // If user is logged in, navigate to /teacher/courses
      router.push("/teacher/courses");
    }
  };

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Link href="/">
          <Button size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Button
          size="sm"
          variant="ghost"
          onClick={handleTeacherModeClick}
        >
          Teacher mode
        </Button>
      )}

      {/* Show warning if user is not logged in */}
      {showWarning && !user && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p>Please sign up or sign in first to access Teacher Mode</p>
            <div className="mt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowWarning(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Conditionally show Sign In/Sign Up buttons if not logged in */}
      {pathname !== "/sign-in" && pathname !== "/sign-up" && !user && (
        <>
          <Link href="/sign-in">
            <Button size="sm" variant="outline">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button size="sm" variant="outline">
              Sign Up
            </Button>
          </Link>
        </>
      )}

      {/* User Button is shown if logged in */}
      {user && (
        <UserButton afterSwitchSessionUrl="/" />
      )}
    </div>
  );
};
