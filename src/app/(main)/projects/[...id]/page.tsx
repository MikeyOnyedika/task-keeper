"use client";
import { usePathname } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default function Project({ params }: Props) {
  const pathname = usePathname();
  console.log("params: ", params);
  return <div>Project</div>;
}
