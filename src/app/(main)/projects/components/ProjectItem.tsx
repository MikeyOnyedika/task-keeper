import { status } from "@/app/constants";
import StatusRender from "./StatusRender";
import Link from "next/link";

type Props = {
  projectId: string,
  title: string;
  countdownToDeadline: string;
  currentStatus: (typeof status)[keyof typeof status];
  totalTasksCount: number;
  completedTasksCount: number;
  deadline?: string;
};

export default function ProjectItem({
  projectId,
  title,
  currentStatus,
  totalTasksCount,
  completedTasksCount,
  deadline,
}: Props) {
  const projectUrl = `/projects/${projectId}`
  return (
    <Link href={projectUrl}>
      <article className="rounded-md border-2 border-gray-5 p-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg">{title}</h3>
          <StatusRender currentStatus={currentStatus} />
        </div>
        <p>
          tasks completed: {completedTasksCount}/{totalTasksCount}
        </p>
        {deadline && <p className="text-red">{deadline} to deadline</p>}
      </article>
    </Link>
  );
}
