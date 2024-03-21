type Props = {
  type?: "text" | "password";
  label: string;
  placeholder: string;
  value: string;
  name: string;
};

export default function Textbox({
  type = "text",
  label,
  name,
  placeholder,
  value,
}: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        className="border-[1px] border-gray-25 rounded px-4 py-2"
        placeholder={placeholder}
      />
    </div>
  );
}
