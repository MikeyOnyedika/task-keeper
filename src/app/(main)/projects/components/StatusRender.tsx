import { status } from "@/app/constants";

type Props = {
  currentStatus: (typeof status)[keyof typeof status];
};

export default function StatusRender({ currentStatus }: Props) {
  let statusRender = <></>;

  if (currentStatus === status.ACTIVE) {
    statusRender = (
      <span className="before:w-2 before:h-2 before:rounded-full before:bg-green flex items-center gap-2 text-green text-xs border-2 py-1 px-2 rounded-full">
        {currentStatus}
      </span>
    );
  } else {
    statusRender = (
      <span className="text-xs border-2 py-1 px-2 rounded-full border-gray-25 text-gray-50">
        {currentStatus}
      </span>
    );
  }

  return statusRender;
}
