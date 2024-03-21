type Props = {
  label: string;
};

export default function SubmitBtn({ label }: Props) {
  return (
    <button
      type="submit"
      className="rounded  px-4 py-2 flex gap-4 items-center justify-center bg-accent text-primary font-bold hover:bg-accent-dark transition-colors"
    >
      {label}
    </button>
  );
}
