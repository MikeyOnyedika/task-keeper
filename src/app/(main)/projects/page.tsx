import { Project } from "@/app/types";
import ProjectItem from "./components/ProjectItem";
import { getTimeToDeadline } from "@/app/utils/helpers";
import { projects } from "@/app/dummyData";

export default function Projects() {
  return (
    <section className="px-4 pb-2 pt-4 h-full w-full">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {projects.map((project) => {
          const deadline = getTimeToDeadline(
            project.startDate,
            project.deadline
          );

          return (
            <li key={project.id}>
              <ProjectItem
                projectId={project.id}
                title={project.title}
                countdownToDeadline={""}
                currentStatus={project.status}
                totalTasksCount={0}
                completedTasksCount={0}
                deadline={deadline}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
