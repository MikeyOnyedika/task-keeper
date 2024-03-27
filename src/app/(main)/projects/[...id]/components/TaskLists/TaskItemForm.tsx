import { TaskItem } from "@/app/types";
import Image from "next/image";
import { Xmark } from "@/app/assets";
import Textbox from "@/app/components/FormInput/Textbox";
import Selectbox from "@/app/components/FormInput/Selectbox";
import {
  priorityOptions,
  statusOptions,
  timeUnitOptions,
} from "@/app/constants";
import DateInput from "@/app/components/FormInput/DateInput";
import TimeUnitSelect from "@/app/components/FormInput/TimeUnitSelect";
import SubmitBtn from "@/app/components/FormInput/SubmitBtn";

type TaskItemFormProps = {
  taskItem: TaskItem | undefined;
  closeForm: () => void;
};

export default function TaskItemForm({
  taskItem,
  closeForm,
}: TaskItemFormProps) {
  return (
    <div className="fixed inset-0 bg-opacity-50 bg-secondary flex justify-center items-center ">
      <div className="flex items-start w-full max-w-[40rem] gap-2 p-4">
        <div className="flex flex-col w-full  gap-4 p-4 border-2 border-accent rounded-md border-opacity-50 bg-primary">
          <h4 className="text-xl font-bold text-center ">Edit Task</h4>
          <form className="flex flex-col gap-2">
            <Textbox
              label="Title"
              placeholder={"e.g add custom select"}
              value={taskItem?.title as string}
              name="title"
            />
            <Textbox
              type="textarea"
              label="Description"
              placeholder={"e.g step 1 ..."}
              value={taskItem?.title as string}
              name="description"
            />
            <div className="flex gap-2">
              <Selectbox
                label={"Priority"}
                name="priority"
                options={priorityOptions}
              />
              <Selectbox
                label={"Status"}
                name={"status"}
                options={statusOptions}
              />
              <DateInput label={"Deadline"} name="deadline" />
            </div>
            <TimeUnitSelect
              label={"Estimated Time of Completion"}
              name={"estimatedCompletionTime"}
              options={timeUnitOptions}
            />
            <SubmitBtn label={"save changes"} />
            <button
              type="button"
              className="rounded px-4 py-2 flex gap-4 items-center justify-center bg-red text-primary font-bold hover:bg-red-dark transition-colors"
            >
              delete task item
            </button>
          </form>
        </div>
        <button
          onClick={closeForm}
          className="rounded-full p-3 aspect-square w-10 h-10 hover:bg-gray-25"
        >
          <Image src={Xmark} alt="" />
        </button>
      </div>
    </div>
  );
}
