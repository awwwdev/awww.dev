import { toReadableDate } from "@/utils/formatter";
import { z } from "zod";

const RenderValue = ({ value, key }) => {
/*   console.log("🚀 ~ value , ke:", value, key); */
  if (value === null || value === undefined) return <code className="c-gray10">NULL</code>;
  if (value === "") return <>EMPTY_STRING</>;
  if (typeof value === "number" || !isNaN(Number(value))) return <>{value}</>;
  if (typeof value === "boolean") return <>{value ? 'TRUE' : 'FALSE'}</>;
  if (value instanceof Date || z.string().datetime({ offset: true }).safeParse(value))
    return (
      <div className="">
        {/* <p>{toReadableDate(value)}</p> */}
        <p>
          <code className="text-xs py-1 rd-md">{String(value)}</code>
        </p>
      </div>
    );
  if (typeof value === "object") return <pre>{JSON.stringify(value, null, 2)}</pre>;
  return <>{String(value)}</>;
};

const RecordTable = ({ record , commonKeys , showCommonKeys }) => {
  const keys = Object.keys(record).filter((key) => !commonKeys.includes(key));

  return (
    <div className="rd-lg overflow-hidden b-1 b-gray6">
      <table className=" c-sand11 border-collapse w-full  ">
        <thead className="bg-gray3">
          <th className="table-header-cell py-2 " style={{ minWidth: "2.5rem" }}>
            Key
          </th>
          <th className="table-header-cell py-2 ">Value</th>
        </thead>
        {keys.map((key, index) => {
          return (
            <tr key={index}>
              <td className="table-body-cell py-2 " style={{ minWidth: "2.5rem" }}>
                {key}
              </td>
              <td className="table-body-cell py-2">
                <RenderValue value={record[key]} key={key} />
              </td>
            </tr>
          );
        })}
        {commonKeys.map((key, index) => {
          return (
            <tr key={index} className={`c-gray10 font-mono bg-gray2 ${showCommonKeys}`}>
              <td className="table-body-cell py-2 " style={{ minWidth: "4rem" }}>
                {key}
              </td>
              <td className="table-body-cell py-2">
                <RenderValue value={record[key]} key={key} />
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
RecordTable.defaultProps = {
  commonKeys: ["id", "created_at", "updated_at", "updated_by"],
  showCommonKeys: ""
};

export default RecordTable;
