"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs"; // Import useUser from Clerk
import { useState, useEffect } from "react";  // Import useState and useEffect

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const { user } = useUser(); // Get user info from Clerk
  const [showWarning, setShowWarning] = useState(false);

  // Check if the user is logged in, show warning if not
  useEffect(() => {
    if (!user) {
      setShowWarning(true); // Show warning if user is not logged in
    }
  }, [user]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Course created.");
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      {/* Show warning if user is not logged in */}
      {showWarning && !user && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p>Please sign up or sign in first to create a course</p>
            <div className="mt-4">
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
        <div>
          <h1 className="text-2xl">Name your course</h1>
          <p className="text-sm text-slate-600">
            What would you like to name your course? Don't worry you can change this later.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y- mt-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting || !user}
                        placeholder="ex: Data Structures and Algorithms"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What will you teach in this course?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Link href="/teacher/courses">
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={!isValid || isSubmitting || !user}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
