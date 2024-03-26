'use client'
import { useState } from "react";

type Props = {
  name: string;
  label: string
};

export default function Checkbox({ name, label }: Props) {
  const [isChecked, setIsChecked] = useState(false)

  function toggleChecked() {
    // console.log("check")
    setIsChecked(!isChecked)
  }

  return (
    <label htmlFor={name} className="flex">
      <span className={`w-6 h-6 rounded-md bg-center border-2 border-accent bg-no-repeat bg-primary ${ isChecked ? "bg-checkmark": ""}`}>{label}</span>
      <input id={name} type="checkbox" className="hidden" onChange={() => toggleChecked()} checked={isChecked} />
    </label>
  );
}
