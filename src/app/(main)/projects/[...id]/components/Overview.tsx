import SubmitBtn from "@/app/components/FormInput/SubmitBtn";
import Textbox from "@/app/components/FormInput/Textbox";
import Selectbox from "@/app/components/FormInput/Selectbox";
import { statusOptions } from "@/app/constants";

// TODO: continue by implementing the selectbox. Start with allowing it accept label, name and option props

export default function Overview() {
  return (
    <section className="flex flex-col gap-4 w-full h-full">
      <h2 className="text-xl text-secondary font-bold">Project Overview</h2>
      <form className="flex flex-col gap-8">
        <Textbox
          label={"Name"}
          placeholder={"project name"}
          value={""}
          name={"projectName"}
        />
        <Textbox
          type="textarea"
          label={"Project Description"}
          placeholder={"project description"}
          value={""}
          name={"projectName"}
        />
        <Selectbox label={"Status"} name={""} options={statusOptions} />
        <SubmitBtn label="Save Changes" />
      </form>
    </section>
  );
}
