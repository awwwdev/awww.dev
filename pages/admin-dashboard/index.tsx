const Page = () => {
  const lastCommit = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE;

  return (
    <div className="flex flex-col gap-6 jc ac h-full">
      <div className="text-xl italic c-sand11">Welcome!</div>
      {lastCommit && <p className="info-line  text-xs">Last commit: {lastCommit}. </p>}
    </div>
  );
};

export default Page;
