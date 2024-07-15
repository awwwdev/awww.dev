import { Column, Table } from "@tanstack/react-table";
import { useEffect, useMemo, useReducer, useState, isValidElement } from "react";

export const Search = ({ table, globalFilter, setGlobalFilter, placeholder }) => {
  return (
    <InputDebaounced
      value={globalFilter ?? ""}
      onChange={(value) => setGlobalFilter(String(value))}
      className="px-2 py-1 rd b-1 b-transparent bg-gray1  w-full fw-400 min-w-40 max-w-80 flex-1"
      placeholder={placeholder ?? "Search all columns..."}
    />
  );
};

// A debounced input react component. For performance reasons the value changes after half a second.
export function InputDebaounced({
  value: initialValue,
  onChange,
  debounce = 500,
  className,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      // size={1}
      className={className}
    />
  );
}

export const Filter = ({ columnType, column }: { columnType: ColumnType; column: Column<any, unknown> }) => {
  const columnFilterValue = column.getFilterValue();

  if (columnType === "string") return <TextFilter column={column} columnFilterValue={columnFilterValue} />;
  if (columnType === "number") return null;
  if (columnType === "boolean") return <BooleanFilter column={column} columnFilterValue={columnFilterValue} />;
  if (columnType === "js-date") return <TextFilter column={column} columnFilterValue={columnFilterValue} />;
  // if (columnType === "string-date") return <DateFilter column={column} columnFilterValue={columnFilterValue} />;
  if (columnType === "null") return <span className="text-xs c-gray10">NO DATA IN THE COLUMN</span>;
  return <span className="text-xs">NO FILTER FOR THIS DATA TYPE</span>;
};

const DateFilter = ({ column, columnFilterValue }) => {

  const preFilteredRows = useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()),
    [column]
  );

  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length > 0 ? new Date(preFilteredRows[0]) : new Date(0);
    let max = preFilteredRows.length > 0 ? new Date(preFilteredRows[0]) : new Date(0);

    preFilteredRows.forEach((row) => {
      const rowDate = new Date(row);
      min = rowDate <= min ? rowDate : min;
      max = rowDate >= max ? rowDate : max;
    });

    return [min, max];
  }, [preFilteredRows]);

  return (
    <div>
      <input
        min={min.toISOString().slice(0, 10)}
        onChange={(e) => {
          const val = e.target.value;
          column.setFilterValue((old = []) => [val ? val : undefined, old[1]]);
        }}
        type="date"
        value={columnFilterValue?.[0] || ""}
      />
      {" to "}
      <input
        max={max.toISOString().slice(0, 10)}
        onChange={(e) => {
          const val = e.target.value;
          column.setFilterValue((old = []) => [old[0], val ? val.concat("T23:59:59.999Z") : undefined]);
        }}
        type="date"
        value={columnFilterValue?.[1]?.slice(0, 10) || ""}
      />
    </div>
  );
};

const BooleanFilter = ({ column, columnFilterValue }) => {
  const map = (v) => {
    if (v === "TRUE") return true;
    if (v === "FALSE") return false;
    if (v === "NULL") return null;
  };
  return (
    <>
      <select
        value={columnFilterValue}
        onChange={(value) => column.setFilterValue(map(value))}
        placeholder={`Search...`}
        className="w-36 b field py-1.5 rd"
      >
        <option value="TRUE">TRUE</option>
        <option value="FALSE">FALSE</option>
        <option value="NULL">NULL</option>
      </select>
    </>
  );
};

const TextFilter = ({ column, columnFilterValue }) => {
  const sortedUniqueValues = useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column]
  );

  return (
    <div className="flex">
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <InputDebaounced
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search...`}
        className="field px-1  w-full  w-1 flex-1"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </div>
  );
};

const NumberFilter = ({ column, columnFilterValue }) => {
  return (
    <div>
      <div className="flex gap-1 ">
        <InputDebaounced
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
          placeholder={`Min ${column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ""}`}
          className="  field px-1 w-1 flex-1 appearance-none moz-appearance-textfield  "
        />
        <InputDebaounced
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
          placeholder={`Max ${column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ""}`}
          className="  field px-1 w-1 flex-1 appearance-none moz-appearance-textfield "
        />
      </div>
      <div className="h-1" />
    </div>
  );
};
