export default function Icon({
  name,
  className,
  subdued = false,
}: {
  name: String;
  className?: string;
  subdued?: boolean;
}) {
  return (
    <>
      {" "}
      <span className={`${name} ${className} ${!subdued && "before:opacity-100 opacity-100"} select-none`}></span>{" "}
    </>
  );
}
