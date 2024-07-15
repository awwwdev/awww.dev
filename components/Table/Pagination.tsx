import Icon from "@/components/ui/Icon";


const Pagination = ({ table }) => {
  return (
    <div className="flex flex-wrap justify-end ac gap-8 c-gray9">
      <div className="flex gap-2 ac ">
        {/*         <span className="c-gray9">{table.getPrePaginationRowModel().rows.length} Rows</span> */}
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="px-1 py-1 rd-2 bg-gray1 block c-accent10 b-1 b-accent10"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option className="py-2" key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <span>Rows</span>
      </div>
      <div className="flex ac gap-2 ">
        <button
          className=" b-1 fw-500 px-4 py-1 rd-lg b-accent7 c-sand11 active:(b-accent8 bg-gray1) hover:(b-accent10  bg-gray1)  focus:(b-accent10  bg-gray1) disabled:(!c-gray9 !bg-accent3 !b-accent5)"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <Icon name="i-ph-arrow-line-left" className="inline-block w-1em h-1em c-accent10" />
        </button>
        <button
          className="b-1 fw-500 px-4 py-1 rd-lg b-accent7 c-sand11 active:(b-accent8 bg-gray1) hover:(b-accent10  bg-gray1)  focus:(b-accent10  bg-gray1) disabled:(!c-gray9 !bg-accent3 !b-accent5)"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <Icon name="i-ph-arrow-left" className="inline-block w-1em h-1em c-accent10" />
        </button>
        <p className="flex ac gap-2">
          Page{" "}
          <input
            type="number"
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="field inline c-accent10"
            size={3}
          />{" "}
          of {table.getPageCount()}
        </p>
        <button
          className="b-1 fw-500 px-4 py-1 rd-lg b-accent7 c-sand11 active:(b-accent8 bg-gray1) hover:(b-accent10  bg-gray1)  focus:(b-accent10  bg-gray1) disabled:(!c-gray9 !bg-accent3 !b-accent5) "
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <Icon name="i-ph-arrow-right" className="inline-block w-1em h-1em c-accent10" />
        </button>
        <button
          className="b-1 fw-500 px-4 py-1 rd-lg b-accent7 c-sand11 active:(b-accent8 bg-gray1) hover:(b-accent10  bg-gray1)  focus:(b-accent10  bg-gray1) disabled:(!c-gray9 !bg-accent3 !b-accent5)"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <Icon name="i-ph-arrow-line-right" className="inline-block w-1em h-1e c-accent10" />
        </button>
      </div>
      <div className="flex gap-2 ac ">
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
      </div>
    </div>
  );
};

export default Pagination;
