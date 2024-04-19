import Overview from "./(main)/projects/[...id]/components/Overview";
import Resources from "./(main)/projects/[...id]/components/Resources";
import Settings from "./(main)/projects/[...id]/components/Settings";
import TaskLists from "./(main)/projects/[...id]/components/TaskLists";

// most typings in the types.ts file is generated from the constants here. This is why I don't import any types here

const status = {
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  PAUSED: "paused",
  NOT_STARTED: "not-started",
} as const;

// this is for a select input field
const statusOptions = [
  {
    label: "In-Progress",
    value: status.IN_PROGRESS,
  },
  {
    label: "Completed",
    value: status.COMPLETED,
  },
  {
    label: "Paused",
    value: status.PAUSED,
  },
  {
    label: "Not-Started",
    value: status.NOT_STARTED,
  },
];

const projectTabs = [
  {
    title: "overview",
    label: "Overview",
    Component: Overview,
  },
  {
    title: "tasklists",
    label: "Task Lists",
    Component: TaskLists,
  },
  {
    title: "resources",
    label: "Resources",
    Component: Resources,
  },
  {
    title: "settings",
    label: "Settings",
    Component: Settings,
  },
] as const;

const displayOptions = ["board", "list"] as const;

const priority = {
  HIGH: "high",
  MID: "mid",
  LOW: "low",
} as const;

// this is for a select input field
const priorityOptions = [
  {
    label: "High",
    value: priority.HIGH,
  },
  {
    label: "Mid",
    value: priority.MID,
  },
  {
    label: "Low",
    value: priority.LOW,
  },
];

const timeUnit = {
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
} as const;

const timeUnitOptions = [
  {
    label: "Day",
    value: timeUnit.DAY,
  },
  {
    label: "Week",
    value: timeUnit.WEEK,
  },
  {
    label: "Month",
    value: timeUnit.MONTH,
  },
];

const httpMethod = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
  PATCH: "PATCH",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
} as const;

export {
  status,
  statusOptions,
  priority,
  priorityOptions,
  projectTabs,
  displayOptions,
  timeUnit,
  timeUnitOptions,
  httpMethod
};
