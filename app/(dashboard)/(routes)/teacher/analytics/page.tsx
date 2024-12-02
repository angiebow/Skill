"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

const AnalyticsPage = () => {
  const { user } = useUser(); // Get user information from Clerk
  const [showWarning, setShowWarning] = useState(false);

  // Check user status and trigger warning only when the component mounts
  useEffect(() => {
    if (!user) {
      setShowWarning(true); // Show warning if not logged in
    }
  }, [user]);

  return (
    <div>
      {/* Show warning if user is not logged in */}
      {showWarning && !user && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p>Please sign up or sign in first to access Teacher Mode</p>
            <div className="mt-4">
              {/* Sign In Button */}
              <Link href="/sign-in">
                <Button size="sm" variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Page content (disabled interaction if not logged in) */}
      <div className={`relative ${showWarning && !user ? "pointer-events-none" : ""}`}>
        {/* Content of the page */}
        {user ? (
          <div>
            <h1>Analytics Content Here</h1>
            {/* Add your analytics content here */}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
