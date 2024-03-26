import { status } from "@/app/constants";
import { Status } from "@/app/types";

type Props = {
  currentStatus: Status;
};

export default function StatusIndicator({ currentStatus }: Props) {
  let statusRender = <></>;

  if (currentStatus === status.ACTIVE) {
    statusRender = (
      <span className="before:w-2 w-fit before:h-2 before:rounded-full before:bg-green flex items-center gap-1 text-green text-xs py-1 px-2 rounded-full">
        {currentStatus}
      </span>
    );
  } else {
    statusRender = (
      <span className="before:w-2 w-fit before:h-2 before:rounded-full before:bg-gray-25 flex items-center gap-1 text-gray-50 text-xs py-1 px-2 rounded-full">
        {currentStatus}
      </span>
    );
  }

  return statusRender;
}
