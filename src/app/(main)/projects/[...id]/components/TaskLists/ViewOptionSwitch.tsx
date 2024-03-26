import { TaskDisplayOption } from "@/app/types";

type Props = {
  displayOption: TaskDisplayOption;
  setDisplayOption: (option: TaskDisplayOption) => void;
};

export default function ViewOptionSwitch({
  displayOption,
  setDisplayOption,
}: Props) {
  return (
    <div className="flex gap-2  p-1 rounded-md border-gray-5 border-2">
      <button
        type="button"
        className={`w-7 h-7 bg-gray-5 rounded flex p-[3px] gap-0.5 hover:border-gray-50 border-[transparent] border-2 ${
          displayOption === "board" ? "border-gray-75" : ""
        }`}
        onClick={() => setDisplayOption("board")}
      >
        <span className="bg-gray-25 w-full h-full rounded-sm"></span>
        <span className="bg-gray-25 w-full h-full rounded-sm"></span>
      </button>
      <button
        type="button"
        className={`w-7 h-7 bg-gray-5 rounded flex flex-col p-[3px] gap-0.5 hover:border-gray-50 border-[transparent] border-2 ${
          displayOption === "list" ? "border-gray-75" : ""
        }`}
        onClick={() => setDisplayOption("list")}
      >
        <div className="flex flex-col justify-stretch gap-[1px] w-full h-1/2 rounded-sm">
          <span className="w-1/2 h-2/6 bg-gray-25 rounded-sm"></span>
          <span className="w-full h-4/6 bg-gray-25 rounded-sm"></span>
        </div>
        <div className="flex flex-col justify-stretch gap-[1px] w-full h-1/2 rounded-sm">
          <span className="w-1/2 h-2/6 bg-gray-25 rounded-sm"></span>
          <span className="w-full h-4/6 bg-gray-25 rounded-sm"></span>
        </div>
      </button>
    </div>
  );
}
