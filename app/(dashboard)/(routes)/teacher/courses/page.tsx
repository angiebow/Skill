//"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { DataTable } from "./_components/data-table";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { columns } from "./_components/columns";

const CoursesPage = async () => {
  const { userId }: { userId: string | null } = await auth();
  if (!userId) {
      return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  
  //const data = await getData();
  //const [showWarning, setShowWarning] = useState(false);

  return (
    <div>
        <div>
            <DataTable columns={columns} data={courses} />
            <Link href="/teacher/create">
              <Button className="p-6">
                New course
              </Button>
            </Link>
        </div>
    </div>
  );
};

export default CoursesPage;
