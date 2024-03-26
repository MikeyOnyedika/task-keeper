type Props = {
  label: string;
  // value: string;
  name: string;
};

export default function DateInput({ label, name }: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="date"
        className="border-[1px] border-gray-25 rounded px-4 py-2"
      />
    </div>
  );
}
