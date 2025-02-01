import { ExclamationTriangleFill } from "react-bootstrap-icons";
import { FETCH_FAILED_MSG, LOADING_MSG } from "../types/messages";
import { ReactNode } from "react";

interface TableProps {
  columns: string[];
  loading?: boolean;
  error?: Error | null;
  children: ReactNode;
  styles?: string;
}

function Table({
  columns,
  error,
  loading = false,
  children,
  styles,
}: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg max-h-[50vh] overflow-y-auto">
      <table className={`min-w-full border-collapse bg-white ${styles}`}>
        <thead>
          <tr className="bg-red-700 text-white">
            {columns.map((title, index) => (
              <th key={index} className="py-2 px-4 border">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="border-b bg-gray-50">
              <td
                colSpan={columns.length}
                className="text-center py-4"
                role="status"
                aria-live="polite"
              >
                <div className="flex flex-col justify-center items-center space-y-4">
                  <div className="ml-2 w-12 h-12 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-red-500"></div>
                  <p>{LOADING_MSG}</p>
                </div>
              </td>
            </tr>
          ) : error ? (
            <tr className="border-b bg-gray-50">
              <td
                colSpan={columns.length}
                className="text-center py-4"
                role="status"
                aria-live="polite"
              >
                <div className="flex flex-col justify-center items-center">
                  <ExclamationTriangleFill
                    color="red"
                    width={48}
                    height={48}
                    className="mb-4"
                  />
                  <p>{FETCH_FAILED_MSG}</p>
                </div>
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
