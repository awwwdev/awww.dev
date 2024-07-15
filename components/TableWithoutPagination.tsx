import { toReadableDate } from "@/utils/formatter";
import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useReducer, useState } from "react";

import { rankItem } from "@tanstack/match-sorter-utils";
import Icon from "@/components/ui/Icon";
import { Filter, Search } from "@/components/Table/Filter";

type TData = unknown;
type TValue = unknown;

type TableProps = {
  extractSchemaFromData?: boolean;
  hasHorizontalScroll?: boolean;
  options?: any;
  schema?: any[];
  data: any[];
};

const Table = ({
  data,
  schema = null,
  extractSchemaFromData = false,
  hasHorizontalScroll = true,
  options,
}: TableProps) => {
  const columns: ColumnDef<TData, TValue>[] = createSchema({ schema, data });
  const rerender = useReducer(() => ({}), {})[1];

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

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

  const table = useReactTable({
    data,
    columns,
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
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  const [isTableLayoutAuto, setIsTableLayoutAuto] = useState(hasHorizontalScroll);

  return (
    <div className="py-4 space-y-6 lt-sm:max-table-width-in-mobile sm:max-w-main">
      <div className="flex flex-wrap ac gap-8 justify-between">
        <Search {...{ table, globalFilter, setGlobalFilter }} />
        <LayoutToggle {...{ isTableLayoutAuto, setIsTableLayoutAuto }} />
      </div>
      <div className="pt-4 pb-8">
        <div className={`rd-xl bg-white ${isTableLayoutAuto ? "overflow-x-auto" : " overflow-x-hidden"}`}>
          <table
            className={`text-s c-sand11 border-collapse ${isTableLayoutAuto ? "table-auto " : " w-full table-fixed"}`}
          >
            <TableHead table={table} isTableLayoutAuto={isTableLayoutAuto} />
            <TableBody table={table} isTableLayoutAuto={isTableLayoutAuto} />
          </table>
        </div>
      </div>
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
          <tr key={row.id} className="odd:bg-accent2">
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

const LayoutToggle = ({ isTableLayoutAuto, setIsTableLayoutAuto }) => {
  return (
    <div className="mis-auto flex b-1 rd-lg overflow-hidden">
      <button
        className="btn-ghost rd-0 !b-transparent "
        onClick={() => setIsTableLayoutAuto(true)}
        disabled={isTableLayoutAuto}
        aria-label="auto column size"
      >
        <Icon name="i-ph-arrows-horizontal " className="inline-block w-1em h-1em" />
      </button>
      <button
        className="btn-ghost rd-0 !b-transparent "
        onClick={() => setIsTableLayoutAuto(false)}
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
};

export const TableRWithoutPagination = ({ children, schema, hasHorizontalScroll = true }: Props) => {
  if (!children || children.length === 0) return <p>There is no data!</p>;
  return <Table data={children} schema={schema} hasHorizontalScroll={hasHorizontalScroll} />;
};

const createSchema = ({ data, schema = null }): ColumnDef<TData, TValue>[] => {
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

    columns.push(completeColSchema(schema?.find((col) => col?.id === key) ?? { id: key }, columnType));
  }

  return columns;
};

type ColSchema = {
  id: string;
  [key: string]: any;
};

const completeColSchema = (colSchema: ColSchema, columnType: ColumnType): ColumnDef<TData, TValue> => {
  const header = (props) => props.column.id;

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

    return <>{formatterFn(info.getValue())}</>;
  };

  const meta = { columnType, formatterFn };

  const completeColSchema = {
    accessorKey: colSchema.id,
    accessorFn: colSchema.accessorFn,
    cell: colSchema.cell ?? cell,
    header: colSchema.header ?? header,
    meta: { ...meta, ...colSchema.meta },
  };

  return completeColSchema;
};

export default Table;
