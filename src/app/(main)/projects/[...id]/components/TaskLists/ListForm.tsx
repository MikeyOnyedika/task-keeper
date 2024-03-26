import SubmitBtn from "@/app/components/FormInput/SubmitBtn";
import Textbox from "@/app/components/FormInput/Textbox";
import { statusOptions } from "@/app/constants";
import Selectbox from "@/app/components/FormInput/Selectbox";

// form component used to add a new list or edit the name of a list
type ListFormProps = {
  closeForm: () => void;
};

export default function ListForm({ closeForm }: ListFormProps) {
  return (
    <form className="max-w-[23rem] w-full h-fit max-h-full border-accent border-2 border-opacity-30 flex flex-col p-4 rounded-md gap-5">
      <Textbox
        label={"List Title"}
        placeholder={"e.g implementing the auth service"}
        value={""}
        name={"listTitle"}
      />
      <Selectbox label={"Status"} name={""} options={statusOptions} />
      <div className="flex gap-1">
        <div className="flex w-full">
          <SubmitBtn label={"create task list"} />
        </div>
        <button
          type="button"
          className="rounded-md w-full px-4 py-2 flex gap-4 items-center justify-center border-2 bg-red hover:bg-red-dark  text-primary font-bold transition-colors"
          onClick={closeForm}
        >
          cancel
        </button>
      </div>
    </form>
  );
}
