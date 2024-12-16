"use client";
import dynamic from "next/dynamic";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Video, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), { ssr: false });

interface ChapterVideoFormProps {
    initialData: Chapter & { muxData?: MuxData | null };
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterVideoFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter updated");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter Video
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.videoUrl && (
                        <>
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add video
                        </>
                    )}
                    {!isEditing && initialData.videoUrl && (
                        <>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit video
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <Video className="w-10 h-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <MuxPlayer
                        playbackId={initialData?.muxData?.playbackId || ""}
                        />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="chapterVideo"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ videoUrl: url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Upload this Capther&apos;s video. Supported formats: mp4, mov, avi, wmv, flv, mkv, webm, mpeg, m4v, 3gp, 3g2
                    </div>
                </div>
            )}
            {initialData.videoUrl && !isEditing && (
    <div className="text-xs text-muted-foreground mt-2">
        Video can take a few minutes to process. Please refresh the page if the video does not appear.
    </div>
)}

        </div>
    )
}