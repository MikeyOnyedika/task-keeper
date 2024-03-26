import {
  displayOptions,
  projectTabs,
  status,
  priority,
  timeUnit,
} from "./constants";

export type Status = (typeof status)[keyof typeof status];

export type Priority = (typeof priority)[keyof typeof priority];

export type Project = {
  title: string;
  description: string;
  id: string;
  status: Status;
  deadline: string;
  startDate: string;
};

export type ProjectTab = (typeof projectTabs)[number];
export type ProjectTabTitle = (typeof projectTabs)[number]["title"];

export type TaskDisplayOption = (typeof displayOptions)[number];

export type TagScope = "user" | "project";

export type Tag = {
  id: string;
  title: string;
  scope: TagScope;
  color?: string;
};

export type Resource = {
  title: string;
  link: string;
};

export type TaskList = {
  id: string;
  title: string;
  status: Status;
  taskItems: TaskItem[];
};

export type TaskItem = {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  startDate: Date | null;
  deadline: Date | null;
  estimatedCompletionTime: string;
  tags: Tag[];
  taggedResources: Resource[];
};

export type SelectOption<T extends string = string> = {
  label: string;
  value: T;
};

export type TimeUnit = typeof timeUnit[keyof typeof timeUnit] 
