import StatusIndicator from "@/app/(main)/projects/components/StatusIndicator";
import { taskLists } from "@/app/dummyData";
import { TaskItem, TaskList } from "@/app/types";
import Checkbox from "@/app/components/FormInput/Checkbox";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import ListForm from "@/app/(main)/projects/[...id]/components/TaskLists/ListForm";
import TaskItemForm from "./TaskItemForm";

const initialBoardViewContextValue = {
  setSelectedTaskItem: () => {},
  setShowTaskItemForm: () => {},
};

const BoardViewContext = createContext<{
  setSelectedTaskItem: Dispatch<SetStateAction<TaskItem | undefined>>;
  setShowTaskItemForm: Dispatch<SetStateAction<boolean>>;
}>(initialBoardViewContextValue);

function useBoardViewContext() {
  return useContext(BoardViewContext);
}

export default function BoardView() {
  const [showListForm, setShowListForm] = useState(false);
  const [showTaskItemForm, setShowTaskItemForm] = useState(false);
  const [selectedTaskItem, setSelectedTaskItem] = useState<
    TaskItem | undefined
  >();

  function closeTaskItemForm() {
    setShowTaskItemForm(false);
    setSelectedTaskItem(undefined);
  }

  return (
    <BoardViewContext.Provider
      value={{ setSelectedTaskItem, setShowTaskItemForm }}
    >
      <section className="flex gap-5 h-full w-full overflow-x-auto">
        {showTaskItemForm && (
          <TaskItemForm
            taskItem={selectedTaskItem}
            closeForm={() => closeTaskItemForm()}
          />
        )}
        <ul className="flex gap-5 h-full">
          {taskLists.map((taskList) => (
            <List key={taskList.id} {...taskList} />
          ))}
        </ul>

        {showListForm ? (
          <ListForm closeForm={() => setShowListForm(false)} />
        ) : (
          <button
            onClick={() => setShowListForm(true)}
            className="bg-accent w-fit min-w-fit hover:bg-accent-dark rounded-md text-primary px-4 py-2 h-fit"
          >
            + add task list
          </button>
        )}
      </section>
    </BoardViewContext.Provider>
  );
}

type TaskListProps = TaskList;

// a list displays a tasklist
function List({ title, status, taskItems }: TaskListProps) {
  const { setSelectedTaskItem, setShowTaskItemForm } = useBoardViewContext();

  // select a list item and open the task item form with that selected item
  function selectListItem(item: TaskItem) {
    setSelectedTaskItem(item);
    setShowTaskItemForm(true);
  }

  return (
    <li className="max-w-[25rem] h-fit max-h-full w-full border-accent border-2 border-opacity-30 flex flex-col p-4 rounded-md gap-5">
      <div className="flex gap-1 items-center justify-between">
        <h3 className="text-lg">{title}</h3>
        <StatusIndicator currentStatus={status} />
      </div>
      <ul className="overflow-y-auto flex flex-col gap-5 w-full">
        {taskItems.map((item) => (
          <Card key={item.id} {...item} onClick={() => selectListItem(item)} />
        ))}
      </ul>
      <button className="bg-accent hover:bg-accent-dark rounded-md text-primary px-4 py-2">
        + add card
      </button>
    </li>
  );
}

// a card displays a taskitem
type CardProps = TaskItem & {
  onClick: () => void;
};

function Card({ deadline, id, startDate, status, title, onClick }: CardProps) {
  return (
    <li
      className="w-full rounded-md flex flex-col gap-2 shadow p-2 hover:bg-gray-5"
      role="button"
      onClick={onClick}
    >
      <StatusIndicator currentStatus={status} />
      <div className="flex gap-2 items-center">
        <Checkbox name={id} label={""} />
        <p className="line-clamp-1">{title}</p>
      </div>
      <p className="text-sm text-end">2days to deadline</p>
    </li>
  );
}
