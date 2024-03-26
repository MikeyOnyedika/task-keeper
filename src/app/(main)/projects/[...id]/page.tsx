"use client";
import { projectTabs } from "@/app/constants";
import { ProjectTab, ProjectTabTitle } from "@/app/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  params: {
    id: [string, ProjectTabTitle];
  };
};

export default function Project({ params }: Props) {
  const router = useRouter();
  const projectId = params.id[0];
  const currentTabTitle = params.id[1];
  const [currentTab] = useState(() => {
    if (currentTabTitle) {
      const tab = projectTabs.find((item) => item.title === currentTabTitle);
      if (!tab) {
        // currentTabTitle is an unknown value,so there'll be no match. In that case, just use first tab
        return projectTabs[0];
      }
      return tab;
    }
    // since currentTabTitle is empty, just use first tab
    return projectTabs[0];
  });

  // redirect to the url of the current tab whenever currentTab changes.
  useEffect(() => {
    router.push(`/projects/${projectId}/${currentTab.title}`);
  }, [currentTab, projectId, router]);

  return (
    <section className="p-4 h-full w-full flex flex-col">
      <header>
        <nav>
          <ul className="flex gap-1 justify-center rounded-full">
            {projectTabs.map((item) => (
              <li key={item.title}>
                <Link
                  href={`/projects/${projectId}/${item.title}`}
                  className={`p-2 text-sm hover:bg-gray-5 rounded-full px-4 border-2 ${
                    currentTabTitle === item.title
                      ? "border-gray-25 bg-gray-5"
                      : "border-[transparent]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div className="py-4 flex h-full w-full overflow-auto">
        {currentTab.Component && <currentTab.Component />}
      </div>
    </section>
  );
}
