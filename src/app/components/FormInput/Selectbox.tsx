import { SelectOption } from "@/app/types";

type Props = {
  label: string;
  name: string;
  options: SelectOption[];
};

export default function Selectbox({ label, name, options }: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        className={`px-4 py-2 rounded`}
      >
        {options.map((option) => (
          <option className={`px-4 py-2`} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
