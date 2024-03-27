"use client";
import ResourceForm from "./ResourceForm";
import { useState, useEffect } from "react";
import { resources } from "@/app/dummyData";
import ResourceItem from "./ResourceItem";
import { Resource } from "@/app/types";

export default function Resources() {
  const [showResourceForm, setShowResourceForm] = useState(false);
  const [selectedResourceItem, setSelectedResourceItem] = useState<
    Resource | undefined
  >();

  useEffect(() => {
    if (selectedResourceItem) {
      setShowResourceForm(true);
    } else {
      setShowResourceForm(false);
    }
  }, [selectedResourceItem]);

  return (
    <section className="flex flex-col gap-4 w-full h-full">
      {showResourceForm && (
        <ResourceForm closeForm={() => setShowResourceForm(false)} />
      )}
      <div className="flex justify-between gap-2 items-center">
        <h2 className="text-xl text-secondary font-bold">Resources</h2>
        <button
          type="button"
          className="bg-accent w-fit min-w-fit hover:bg-accent-dark rounded-md text-primary px-4 py-2 h-fit"
          onClick={() => setShowResourceForm(true)}
        >
          + add a resource
        </button>
      </div>
      <ul className="flex flex-wrap w-full gap-4">
        {resources.map((resource) => (
          <ResourceItem
            key={resource.id}
            resource={resource}
            onClick={() => setSelectedResourceItem(resource)}
          />
        ))}
      </ul>
    </section>
  );
}
