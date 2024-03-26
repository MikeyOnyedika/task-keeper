import { SelectOption, TimeUnit } from "@/app/types";

type Props = {
  label: string;
  //   value: string;
  name: string;
  options: SelectOption<TimeUnit>[];
};

export default function TimeUnitSelect({ name, label, options }: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name}>{label}</label>
      <div
        className="flex border-[1px] border-gray-25 focus-within:shadow-outline rounded gap-2 p-1"
        role="textbox"
      >
        <input name={name} placeholder="e.g 5" type="number" className="outline-none border-none w-full ps-2" />
        <select id={name} name={name} className={`px-4 py-2 rounded text-sm outline-none`}>
          {options.map((option) => (
            <option className={`px-4 py-2`} key={option.value}>
              {option.label}s
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
