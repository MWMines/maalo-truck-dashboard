import React, { useState } from "react";

import { ArrowDown, ArrowUp } from "lucide-react";

type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  loading?: boolean;
  onSort?: (key: keyof T) => void;
  sortKey?: keyof T;
  sortOrder?: "asc" | "desc";
  onPageSizeChange?: (size: number) => void;
  rowsPerPageOptions?: number[];
  search?: string;
  onSearch?: (value: string) => void;
};

function TableHeader<T>({
  columns,
  sortKey,
  sortOrder,
  onSort,
}: {
  columns: Column<T>[];
  sortKey?: keyof T;
  sortOrder?: "asc" | "desc";
  onSort?: (key: keyof T) => void;
}) {
  return (
    <thead>
      <tr className="border-b bg-gray-100">
        {columns.map((col) => (
          <th
            key={col.key as string}
            className={`cursor-pointer p-3 text-left text-sm font-semibold text-gray-700 select-none ${
              col.sortable ? "hover:text-blue-600" : ""
            }`}
            onClick={() => col.sortable && onSort && onSort(col.key)}
          >
            <div className="flex items-center">
              {col.label}
              {col.sortable &&
                sortKey === col.key &&
                (sortOrder === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableRows<T>({ columns, data, loading }: { columns: Column<T>[]; data: T[]; loading?: boolean }) {
  if (loading) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} className="p-4 text-center text-gray-500">
            Loading...
          </td>
        </tr>
      </tbody>
    );
  }
  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} className="p-4 text-center text-gray-500">
            No data found.
          </td>
        </tr>
      </tbody>
    );
  }
  return (
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "border-t bg-gray-50"}>
          {columns.map((col) => (
            <td key={col.key as string} className="p-3 text-sm text-gray-700">
              {col.render
                ? col.render(row[col.key], row)
                : typeof row[col.key] === "string" ||
                    typeof row[col.key] === "number" ||
                    typeof row[col.key] === "boolean" ||
                    typeof row[col.key] === "bigint"
                  ? String(row[col.key])
                  : null}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

function Pagination({
  page,
  totalPages,
  handlePageChange,
  pageRange = 7,
}: {
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  pageRange?: number;
}) {
  let startPage = Math.max(1, page - Math.floor(pageRange / 2));
  let endPage = startPage + pageRange - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pageRange + 1);
  }
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return (
    <div className="flex items-center justify-between border-t bg-gray-50 px-4 py-3">
      <button
        className="flex items-center gap-1 rounded border px-3 py-1 text-sm"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
        </svg>
        Previous
      </button>
      <div className="flex items-center gap-1">
        {startPage > 1 && (
          <>
            <button className="rounded px-3 py-1 text-sm hover:bg-gray-100" onClick={() => handlePageChange(1)}>
              1
            </button>
            {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
          </>
        )}
        {pages.map((p) => (
          <button
            key={p}
            className={`rounded px-3 py-1 text-sm ${page === p ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
            onClick={() => handlePageChange(p)}
          >
            {p}
          </button>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2 text-gray-400">...</span>}
            <button
              className="rounded px-3 py-1 text-sm hover:bg-gray-100"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </button>
            <button
              className="rounded px-2 py-1 text-sm hover:bg-gray-100"
              onClick={() => handlePageChange(endPage + 1)}
              aria-label="Next set of pages"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6l6 6-6 6"
                />
              </svg>
            </button>
          </>
        )}
      </div>
      <button
        className="flex items-center gap-1 rounded border px-3 py-1 text-sm"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}

export function GenericTable<T extends object>(props: Props<T>) {
  const {
    data,
    columns,
    pageSize = 10,
    page = 1,
    totalPages = 1,
    onPageChange,
    loading = false,
    onSort,
    sortKey,
    sortOrder,
    onPageSizeChange,
    rowsPerPageOptions = [5, 10, 15, 20, 25, 50],
    search = "",
    onSearch,
  } = props;

  const [fade, setFade] = useState(false);

  const handlePageChange = (newPage: number) => {
    setFade(true);
    setTimeout(() => {
      setFade(false);
      if (onPageChange) onPageChange(newPage);
    }, 200);
  };

  // Filter data by global search (client-side only)
  const filteredData = search
    ? data.filter((row) =>
        columns.some((col) => {
          const value = row[col.key];
          return value && value.toString().toLowerCase().includes(search.toLowerCase());
        }),
      )
    : data;

  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between rounded-t border-b bg-gray-50 px-4 py-3">
        <input
          className="w-64 rounded border px-3 py-2"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            if (onSearch) onSearch(e.target.value);
            if (onPageChange) onPageChange(1);
          }}
        />
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Showing {filteredData.length} results</span>
          <label className="flex items-center gap-2 text-sm">
            Rows per page:
            <select
              className="rounded border px-2 py-1"
              value={pageSize}
              onChange={(e) => onPageSizeChange && onPageSizeChange(Number(e.target.value))}
            >
              {rowsPerPageOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div
        className={`overflow-auto rounded-b shadow transition-opacity duration-200 ${fade ? "opacity-0" : "opacity-100"}`}
      >
        <table className="min-w-full bg-white">
          <TableHeader columns={columns} sortKey={sortKey} sortOrder={sortOrder} onSort={onSort} />
          <TableRows columns={columns} data={filteredData} loading={loading} />
        </table>
        <Pagination page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
}
