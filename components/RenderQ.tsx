import LoadingSpinner from './ui/LoadingSpinner'

const RenderQ = ({ q, children, ifNoData = null, ifLoading = null, ifError = null }) => {
  // if (q.isLoading) return ifLoading ?? <><LoadingSpinner /></>
  // if (q.isError) return ifError ?? <>Oops! Something went wrong</>;
  // if (!q.data && ifNoData) return ifNoData;
  // return q.data && children

  return <>{q.isLoading ? 
  <div className='flex justify-center items-center'>
    <LoadingSpinner /> 
  </div>
  : q.isError ? <span>Error Happened!</span> : children}</>;
};

export default RenderQ;

type Options =
  | {
      loadingText?: string;
    }
  | undefined
  | null;
export const renderNoData = (q: any, options?: Options) => {
  if (q.isLoading)
    return <p className="!mt-4 italic fw-300 c-sand11 bg-gray2 px-2 py-1 w-fit">{options?.loadingText ?? <LoadingSpinner />}</p>;
  if (q.isError)
    return (
      <div className="p-4">
        <div className="snack-error">
          <p className="fw-400 text-lg">Error! </p>
          <p>{q.error?.message}</p>
        </div>
      </div>
    );
  return null;
};
