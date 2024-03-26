import Overview from "./(main)/projects/[...id]/components/Overview";
import Resources from "./(main)/projects/[...id]/components/Resources";
import Settings from "./(main)/projects/[...id]/components/Settings";
import TaskLists from "./(main)/projects/[...id]/components/TaskLists";

// most typings in the types.ts file is generated from the constants here. This is why I don't import any types here

const status = {
  ACTIVE: "active",
  COMPLETED: "completed",
  PAUSED: "paused",
  PENDING: "pending",
} as const;

// this is for a select input field
const statusOptions = [
  {
    label: "Active",
    value: status.ACTIVE,
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
    label: "Pending",
    value: status.PENDING,
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

export {
  status,
  statusOptions,
  priority,
  priorityOptions,
  projectTabs,
  displayOptions,
  timeUnit,
  timeUnitOptions,
};
