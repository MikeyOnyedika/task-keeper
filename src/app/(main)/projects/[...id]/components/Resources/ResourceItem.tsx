import Image from "next/image";
import { Edit } from "@/app/assets";
import { Resource } from "@/app/types";
import Link from "next/link";

type Props = {
  resource: Resource;
  onClick: () => void;
};

export default function ResourceItem({ resource, onClick }: Props) {
  return (
    <li className="flex max-w-[25rem]">
      <div className="flex flex-col border-accent border-2 border-opacity-50 rounded-md p-3 gap-2 hover:bg-accent hover:bg-opacity-5">
        <div className="flex justify-between gap-2">
          <h3 className="line-clamp-1 text-lg">
            <Link href={resource.link} target="_blank" className="hover:underline hover:text-accent-dark">
              {resource.title}
            </Link>
          </h3>
          <button
            type="button"
            className=""
            onClick={(e) => {
              onClick();
            }}
          >
            <Image
              src={Edit}
              alt=""
              className="w-10 h-10 hover:bg-gray-5 rounded-full p-2"
            />
          </button>
        </div>
        <div>
          <p className="line-clamp-4 text-sm text-gray-50">
            {resource.description}
          </p>
        </div>
      </div>
    </li>
  );
}
