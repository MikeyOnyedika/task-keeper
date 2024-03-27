import { taskLists } from "@/app/dummyData";

export default function Settings() {
  return (
    <section className="flex flex-col gap-8 w-full h-full">
      <h2 className="text-xl text-secondary font-bold">Settings</h2>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">Task Lists</h3>
        <ul className="flex flex-col gap-4 w-full">
          {taskLists.map((list) => (
            <li
              key={list.id}
              className="flex rounded-md items-center border-2 border-gray-25 p-4"
            >
              <p className="w-full">{list.title}</p>
              <button className="w-fit rounded px-4 py-2 flex gap-4 items-center justify-center bg-red text-primary font-bold hover:bg-red-dark transition-colors">
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">Careful</h3>
        <button className="w-fit rounded px-4 py-2 flex gap-4 items-center justify-center bg-red text-primary font-bold hover:bg-red-dark transition-colors">
          Delete this Project
        </button>
      </div>
    </section>
  );
}
