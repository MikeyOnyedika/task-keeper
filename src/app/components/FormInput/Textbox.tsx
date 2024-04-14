import { LegacyRef, MutableRefObject } from "react";

type Props = {
  type?: "text" | "password" | "textarea";
  label: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: OnChange;
  errRef?: any;
  ref?:
    | LegacyRef<HTMLInputElement>
    | LegacyRef<HTMLTextAreaElement>
    | MutableRefObject<HTMLInputElement | undefined>;
};

type OnChange = (update: { [key: string]: string }) => void;

export default function Textbox({
  type = "text",
  label,
  name,
  placeholder,
  value,
  onChange,
  errRef,
  ref,
}: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="">
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          className="border-[1px] border-gray-25 rounded px-4 py-2"
          placeholder={placeholder}
          rows={5}
          onChange={(e) => onChange({ [name]: e.target.value })}
          ref={ref as LegacyRef<HTMLTextAreaElement>}
        ></textarea>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          className="border-[1px] border-gray-25 rounded px-4 py-2"
          placeholder={placeholder}
          onChange={(e) => onChange({ [name]: e.target.value })}
          ref={ref as LegacyRef<HTMLInputElement>}
        />
      )}
      <p className="text-red-dark text-sm" ref={errRef}></p>
    </div>
  );
}
