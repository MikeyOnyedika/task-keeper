import { Xmark } from "@/app/assets";
import SubmitBtn from "@/app/components/FormInput/SubmitBtn";
import Textbox from "@/app/components/FormInput/Textbox";
import { Resource } from "@/app/types";
import Image from "next/image";

type Props = {
  resource?: Resource;
  closeForm: () => void;
};

export default function ResourceForm({ resource, closeForm }: Props) {
  return (
    <div className="fixed inset-0 bg-opacity-50 bg-secondary flex justify-center items-center">
      <div className="flex items-start w-full max-w-[40rem] gap-2 p-4">
        <div className="flex flex-col w-full  gap-4 p-4 border-2 border-accent rounded-md border-opacity-50 bg-primary">
          <h4 className="text-xl font-bold text-center ">Edit Resource</h4>

          <form className="flex flex-col gap-2">
            <Textbox
              label="Title"
              placeholder={"e.g add custom select"}
              value={resource?.title as string}
              name="title"
            />
            <Textbox
              label="URL Link"
              placeholder={"e.g https://freecodecamp.org/news/..."}
              value={resource?.link as string}
              name="link"
            />
            <Textbox
              type="textarea"
              label="Description"
              placeholder={"e.g step 1 ..."}
              value={resource?.title as string}
              name="description"
            />

            <SubmitBtn label={"save changes"} />

            <button
              type="button"
              className="rounded px-4 py-2 flex gap-4 items-center justify-center bg-red text-primary font-bold hover:bg-red-dark transition-colors"
            >
              delete resource
            </button>
          </form>
        </div>
        <button
          onClick={closeForm}
          className="rounded-full p-3 aspect-square w-10 h-10 hover:bg-gray-25"
        >
          <Image src={Xmark} alt="" />
        </button>
      </div>
    </div>
  );
}
