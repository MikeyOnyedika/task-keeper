type Props = {
  label: string;
  disable: boolean;
};

export default function SubmitBtn({ label, disable }: Props) {
  return (
    <button
      type="submit"
      disabled={disable}
      className={`rounded px-4 py-2 flex gap-4 items-center justify-center bg-accent text-primary font-bold hover:bg-accent-dark transition-colors ${
        disable ? "bg-gray-50 hover:bg-gray-50" : ""
      }`}
    >
      {label}
    </button>
  );
}
