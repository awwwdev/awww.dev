import { toReadableDate } from "@/utils/formatter";
import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useReducer, useState, useEffect } from "react";
import Cookies from "js-cookie";

import { rankItem } from "@tanstack/match-sorter-utils";
import Icon from "@/components/ui/Icon";

import Pagination from "@/components/Table/Pagination";
import { Filter, Search } from "@/components/Table/Filter";

type TData = unknown;
type TValue = unknown;

type TableProps = {
  extractSchemaFromData?: boolean;
  hasHorizontalScroll?: boolean;
  pageId: string;
  options?: any;
  schema?: any[];
  data: any[];
};

const Table = ({
  data,
  schema = null,
  extractSchemaFromData = false,
  pageId,
  hasHorizontalScroll = true,
  options,
}: TableProps) => {
  // let theSchema = schema;
  // if (!schema && extractSchemaFromData) {
  //   theSchema = extractSchema(data[0]);
  // }
  const columns: ColumnDef<TData, TValue>[] = createSchema({ schema, data });
  const rerender = useReducer(() => ({}), {})[1];

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // const refreshData = () => setData(old => makeData(50000))

  // const columns = useMemo(() => createColumns({ schema: theSchema }), []);

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
      itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  // let theData = hasTotalRow ? [totalRowCalculator(data), ...data] : data;
  // theData = hasAverageRow ? [averageRowCalculator(theData), ...theData] : theData;

  const table = useReactTable({
    data,
    columns,
    // filterFns: {
    //   fuzzy: fuzzyFilter,
    // },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  // useEffect(() => {
  //   if (table.getState().columnFilters[0]?.id === 'fullName') {
  //     if (table.getState().sorting[0]?.id !== 'fullName') {
  //       table.setSorting([{ id: 'fullName', desc: false }])
  //     }
  //   }
  // }, [table.getState().columnFilters[0]?.id])

  const [isTableLayoutAuto, setIsTableLayoutAuto] = useState(hasHorizontalScroll);

  useEffect(() => {
    // Load the user's preference for this page from the cookie
    const cookieValue = Cookies.get(`hasHorizontalScroll-${pageId}`);
    if (cookieValue !== undefined) {
      setIsTableLayoutAuto(cookieValue === "true");
    }
  }, [pageId]);

  return (
    <div className="py-4 space-y-6 lt-sm:max-table-width-in-mobile sm:max-w-main">
      <div className="flex flex-wrap ac gap-8 justify-between">
        <Search {...{ table, globalFilter, setGlobalFilter }} />
        <LayoutToggle {...{ isTableLayoutAuto, setIsTableLayoutAuto, pageId }} />
      </div>
      {/*       {options?.hasTopPagination !== false && <Pagination table={table} />} */}
      <div className=" pt-4 pb-8">
        <div className={`rd-xl bg-white ${isTableLayoutAuto ? "overflow-x-auto" : " overflow-x-hidden"}`}>
          <table
            className={`text-s c-sand11 border-collapse ${isTableLayoutAuto ? "table-auto " : " w-full table-fixed"}`}
          >
            <TableHead table={table} isTableLayoutAuto={isTableLayoutAuto} />
            <TableBody table={table} isTableLayoutAuto={isTableLayoutAuto} />
            {/*             <TableFooter table={table} isTableLayoutAuto={isTableLayoutAuto} /> */}
          </table>
        </div>
      </div>
      <Pagination table={table} />
    </div>
  );
};

const TableHead = ({ table, isTableLayoutAuto }) => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={`capitalize table-header-cell min-w-1   ${
                  isTableLayoutAuto ? "max-w-40" : "last-of-type:b-e-0"
                }`}
              >
                {/* <DevOnly>
                  <div className="c-gray9 text-s">type: {header.column.columnDef.meta.columnType}</div>
                </DevOnly> */}
                {header.isPlaceholder ? null : (
                  <div className="space-y-2 text-x  py-1">
                    <div
                      className={header.column.getCanSort() ? "cursor-pointer select-none" : ""}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.column.getIsSorted() === "asc" && (
                        <Icon name="i-ph-sort-ascending" className="c-orange11 inline-block w-1em" />
                      )}
                      {header.column.getIsSorted() === "desc" && (
                        <Icon name="i-ph-sort-descending" className="c-orange11 inline-block w-1em" />
                      )}
                      {header.column.getIsSorted() === false && (
                        <Icon name="i-ph-sort-ascending" className="c-gray10 inline-block w-1em" />
                      )}
                      <span title={header.column.columnDef.accessorKey} className="text-base fw-400">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </span>
                    </div>
                    {header.column.getCanFilter() && (
                      <div className="text-s fw-400">
                        <Filter columnType={header.column.columnDef.meta.columnType} column={header.column} />
                      </div>
                    )}
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

const TableBody = ({ table, isTableLayoutAuto }) => {
  return (
    <tbody className="text-s">
      {table.getRowModel().rows.map((row) => {
        return (
          <tr key={row.id} className="odd:bg-prm2">
            {row.getVisibleCells().map((cell) => {
              const formatterFn = cell.column.columnDef.meta?.formatterFn;
              return (
                <td
                  key={cell.id}
                  title={formatterFn(cell.getValue())}
                  className={`truncate table-body-cell select-all c-gray-10 ${
                    isTableLayoutAuto ? "max-w-40" : "last-of-type:b-e-0"
                  }`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

const TableFooter = ({ table, isTableLayoutAuto }) => {
  return (
    <tfoot className="">
      {table.getFooterGroups().map((footerGroup) => (
        <tr key={footerGroup.id}>
          {footerGroup.headers.map((header) => (
            <th
              key={header.id}
              className={`capitalize truncate table-footer-cell text-s fw-400 c-gray8 bg-gray3 min-w-1  ${
                isTableLayoutAuto ? "max-w-40" : "last-of-type:b-e-0"
              }`}
            >
              {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </tfoot>
  );
};

export default Table;

const LayoutToggle = ({ isTableLayoutAuto, setIsTableLayoutAuto, pageId }) => {
  return (
    <div className="mis-auto flex b-1 rd-lg overflow-hidden">
      <button
        className="btn-ghost rd-0 !b-transparent "
        onClick={() => {
          setIsTableLayoutAuto(true);
          Cookies.set(`hasHorizontalScroll-${pageId}`, true);
        }}
        disabled={isTableLayoutAuto}
        aria-label="auto column size"
      >
        <Icon name="i-ph-arrows-horizontal " className="inline-block w-1em h-1em" />
      </button>
      <button
        className="btn-ghost rd-0 !b-transparent "
        onClick={() => {
          setIsTableLayoutAuto(false);
          Cookies.set(`hasHorizontalScroll-${pageId}`, false);
        }}
        disabled={!isTableLayoutAuto}
        aria-label="fit table in the page"
      >
        <Icon name="i-ph-arrows-in-line-horizontal " className="inline-block w-1em h-1em" />
      </button>
    </div>
  );
};

type Props = {
  children: any;
  schema?: any[];
  hasHorizontalScroll?: boolean;
  pageId: string;
};

export const TableR = ({ children, schema, hasHorizontalScroll = true, pageId }: Props) => {
  // const data = useState
  if (!children || children.length === 0) return <p>There is no data!</p>;
  return <Table data={children} schema={schema} hasHorizontalScroll={hasHorizontalScroll} pageId={pageId} />;
};

// declare module '@tanstack/table-core' {
//   interface FilterFns {
//     fuzzy: FilterFn<unknown>
//   }
//   interface FilterMeta {
//     itemRank: RankingInfo
//   }
// }

// const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
//   // Rank the item
//   const itemRank = rankItem(row.getValue(columnId), value)

//   // Store the itemRank info
//   addMeta({ itemRank })

//   // Return if the item should be filtered in/out
//   return itemRank.passed
// }

// const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
//   let dir = 0

//   // Only sort by rank if the column has ranking information
//   if (rowA.columnFiltersMeta[columnId]) {
//     dir = compareItems(
//       rowA.columnFiltersMeta[columnId]?.itemRank!,
//       rowB.columnFiltersMeta[columnId]?.itemRank!
//     )
//   }

//   // Provide an alphanumeric fallback for when the item ranks are equal
//   return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
// }

// const totalRowCalculator = (data) => {
//   const firstRow = data[0];
//   const keys = Object.keys(firstRow);
//   const totalRow = {};
//   for (const key of keys) {
//     if (typeof firstRow[key] === "number") {
//       totalRow[key] = data.map(item => item[key]).reduce((sum, v) => sum = sum + v);
//     }
//     if (typeof firstRow[key] === "string" && keys.indexOf(key) === 0) totalRow[key] === 'Overall Total'
//   }
//   return totalRow;
// }

// const averageRowCalculator = (data) => {
//   const firstRow = data[0];
//   const keys = Object.keys(firstRow);
//   const averageRow = {};
//   for (const key of keys) {
//     if (typeof firstRow[key] === "number") {
//       averageRow[key] = data.map(item => item[key]).reduce((sum, v) => sum = sum + v) / data.length;
//     }
//     if (typeof firstRow[key] === "string" && keys.indexOf(key) === 0) averageRow[key] === 'Overall Average'
//   }
//   return averageRow;
// }
const createSchema = ({ data, schema = null }): ColumnDef<TData, TValue>[] => {
  // if (!data || data.length === 0) return schema ?? [];

  const keys = Object.keys(data[0]);

  const columns = [];

  for (const key of keys) {
    let firstRowNotNull = data.find((d) => d[key] !== undefined && d[key] !== null);
    let firstNotNull = firstRowNotNull?.[key];

    let columnType: ColumnType = "string";
    if (firstNotNull instanceof Date) columnType = "js-date";
    if (typeof firstNotNull === "boolean") columnType = "boolean";
    if (typeof firstNotNull === "number") columnType = "number";
    if (firstNotNull === null) columnType = "null";

    columns.push(
      completeColSchema(
        schema?.find((col) => {
          /*           console.log("🚀 ~ col:", col);
          console.log("🚀 ~ col.id:", col?.id);
          console.log("🚀 ~ key:", key); */
          return col?.id === key;
        }) ?? { id: key },
        columnType
      )
    );
  }

  return columns;
};

type ColSchema = {
  id: string;
  [key: string]: any;
};

const completeColSchema = (colSchema: ColSchema, columnType: ColumnType): ColumnDef<TData, TValue> => {
  const header = (props) => props.column.id;
  const footer = (props) => props.column.id;

  const providedFormatter = colSchema?.meta?.formatterFn;
  let defaultFormatterFn = (value: any): string => String(value);

  if (columnType === "number") defaultFormatterFn = (value) => String(value);
  if (columnType === "js-date") defaultFormatterFn = (value) => toReadableDate(value);
  if (columnType === "boolean") defaultFormatterFn = (value) => String(value);
  if (columnType === "null") defaultFormatterFn = () => "NULL";

  const formatterFn = providedFormatter ?? defaultFormatterFn;

  let cell = (info) => {
    if (info.getValue() === null) return <span className="text-s c-gray8 fw-300">NULL</span>;
    if (info.getValue() === undefined) return <span className="text-s c-gray8 fw-300">UNDEFIEND</span>;
    /*     if (info.getValue() === "") return <span className="text-s c-gray8 fw-300">EMPTY STRING</span>; */
    if (colSchema.id.includes("In CAD"))
      return (
        <div className="flex gap-1 justify-between">
          {formatterFn(info.getValue())}
          <span className=" text-s c-gray8 fw-300">{` `}CAD</span>
        </div>
      );
    if (colSchema.id.includes("In IRR"))
      return (
        <div className="flex gap-1 justify-between">
          {formatterFn(info.getValue())}
          <span className=" text-s c-gray8 fw-300">{` `}IRR</span>
        </div>
      );
    if (colSchema.id.toLowerCase().includes("percentage"))
      return (
        <div className="flex gap-1 justify-between">
          {formatterFn(info.getValue())}
          <span className=" text-s c-gray8 fw-300">{` `}%</span>
        </div>
      );
    if (colSchema.id.toLowerCase().includes("minute"))
      return (
        <div className="flex gap- justify-between1">
          {formatterFn(info.getValue())}
          <span className=" text-s c-gray8 fw-300">{` `}Min.</span>
        </div>
      );

    return <>{formatterFn(info.getValue())}</>;
  };

  const meta = { columnType, formatterFn };

  // let accessorFn = (row) => {
  //   return row[colSchema.id] ?? "";
  // };

  // if (columnType === "number") {
  //   accessorFn = (row) => {
  //     return row[colSchema.id] ?? "";
  //   };
  // }

  // let accessorFn = (row) => {
  //   if (colSchema.accessorFn) {
  //     const returnValue = colSchema.accessorFn(row);
  //     return returnValue ?? "";
  //   }
  //   return colSchema.id ?? "";
  // };
  const completeColSchema = {
    // id: colSchema.id,
    accessorKey: colSchema.id,
    accessorFn: colSchema.accessorFn,
    cell: colSchema.cell ?? cell,
    header: colSchema.header ?? header,
    footer: colSchema.footer ?? footer,
    meta: { ...meta, ...colSchema.meta },
  };

  return completeColSchema;
};
