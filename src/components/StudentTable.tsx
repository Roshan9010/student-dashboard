"use client";
import * as React from "react";
import type { Student } from "@/lib/types";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  Row,
  FilterFn,
  FilterMeta,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";

type Props = { students: Student[] };

const fuzzyFilter: FilterFn<Student> = (row: Row<Student>, columnId: string, value: string, addMeta: (meta: FilterMeta) => void) => {
  const itemRank = rankItem(String(row.getValue(columnId) ?? ''), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

export default function StudentTable({ students }: Props) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [limit, setLimit] = React.useState<number>(10);

  const columns = React.useMemo<ColumnDef<Student>[]>(() => [
    { accessorKey: 'student_id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'class', header: 'Class' },
    { accessorKey: 'assessment_score', header: 'Score' },
    { accessorKey: 'engagement_time', header: 'Engagement (min/wk)' },
    { accessorKey: 'comprehension', header: 'Comprehension' },
    { accessorKey: 'attention', header: 'Attention' },
    { accessorKey: 'focus', header: 'Focus' },
    { accessorKey: 'retention', header: 'Retention' },
  ], []);

  const table = useReactTable({
    data: students,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="rounded-lg border shadow-sm">
      <div className="p-3 bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-zinc-900 dark:to-zinc-900/60 flex items-center gap-3 flex-wrap">
        <input
          suppressHydrationWarning
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search students..."
          className="w-full md:w-72 rounded-md border px-3 py-2 bg-white dark:bg-zinc-900"
        />
        <div className="ml-auto flex items-center gap-2 text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">Rows:</span>
          <select
            suppressHydrationWarning
            value={String(limit)}
            onChange={(e) => setLimit(e.target.value === 'all' ? Number.MAX_SAFE_INTEGER : parseInt(e.target.value))}
            className="border rounded-md px-2 py-1 bg-white dark:bg-zinc-900"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b bg-zinc-50/50 dark:bg-zinc-900/30">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-3 py-2 text-left font-medium cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{ asc: ' ▲', desc: ' ▼' }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.slice(0, limit).map(row => (
              <tr key={row.id} className="border-b hover:bg-indigo-50/50 dark:hover:bg-zinc-900/40">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-3 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


