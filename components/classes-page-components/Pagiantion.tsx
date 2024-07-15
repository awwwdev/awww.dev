import Icon from "@/components/ui/Icon";

import Button from '../ui/button';
import Space from '../ui/Space';

export default function Pagination ({ table, pageIndex }){
  return (
    <div className=" sticky bottom-0   c-gray9 relative justify-center flex sm:pb-4 ">
      {/* Shadow effect */}
    {/* <Shadow /> */}
      <div className="b-1 b-white bg-sand2 p-2  flex flex-wrap justify-center ac gap-8  rd-4  w-fit shd-tinted-3"
       style={{
        backgroundImage: "url('/static/noise.svg')",
        backgroundSize: 'auto',
        backgroundRepeat: "repeat"
  
      }}
      
      >
        <div className="flex ac gap-2 ">
          {/* <Button
            variation="ghost"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="flex"
          >
            <Icon name="i-ph-arrow-line-left" />
          </Button> */}
          <Button
            variation="ghost"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex"
          >
            <Icon name="i-ph-caret-left" />
          </Button>
          <p className="flex ac ">
            Page{" "}
            <input
              // type="number"
              value={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="field inline appearance-none text-center bg-transparent"
              size={1}
            />{" "}
            of {table.getPageCount()}
          </p>
          <Button
            variation="ghost"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex"
          >
            <Icon name="i-ph-caret-right" className="" />
          </Button>
          {/* <Button
            variation="ghost"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="flex"
          >
            <Icon name="i-ph-arrow-line-right" className="" />
          </Button> */}
        </div>
        {/* <div className="flex gap-2 ac ">
          <span className="c-gray9">{table.getPrePaginationRowModel().rows.length} Rows</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="field py-2 block"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option className="py-2" key={pageSize} value={pageSize}>
                {pageSize} Rows per page
              </option>
            ))}
          </select>
        </div> */}

      </div>
    </div>
  );
};


function Shadow(){

return (
  <div className="h-10 absolute top-0 w-full translate-y--20%    -z-1 px-10 ">
  <div className=" bg-[#301f12] opacity-50 blur-20 rd-t-50%  w-full h-full mix-blend-multiply  "></div>
</div>
)};