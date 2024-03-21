import { Project } from "@/app/types";
import ProjectItem from "./components/ProjectItem";
import { getTimeToDeadline } from "@/app/utils/helpers";
import { projects } from "@/app/dummyData";

export default function Projects() {
  return (
    <section className="px-4 py-2">
      <ul className="grid grid-cols-3 gap-8">
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
