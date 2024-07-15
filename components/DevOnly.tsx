type Props = {
  children?: React.ReactNode;
};

const DevOnly = ({ children }: Props) => {
  const isDev = process.env.NEXT_PUBLIC_IS_DEV === "true";

  if (!isDev) return <></>;
  return (
    <div className="my-6 p-4 rd-xl b-2 b-gray5 bg-gray3 c-sand11 b-dashed space-y-2">
      <h4 className="H4 c-sand11">Dev Only</h4>
      {children}
    </div>
  );
};

export default DevOnly;
