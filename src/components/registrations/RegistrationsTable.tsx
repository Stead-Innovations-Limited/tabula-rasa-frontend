"use client";
import { useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchInput } from "../reusable-ui/Input";

function multiColumnFilter<TData>(
  row: Row<TData>,
  columnIds: string,
  filterValue: string
) {
  const name = row.getValue("name")?.toString().toLowerCase() ?? "";
  const amount = row.getValue("amount")?.toString().toLowerCase() ?? "";
  const transactionId =
    row.getValue("transactionId")?.toString().toLowerCase() ?? "";

  const search = filterValue.toLowerCase();

  return (
    name.includes(search) ||
    amount.includes(search) ||
    transactionId.includes(search)
  );
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
export default function RegistrationsTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: multiColumnFilter,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });
  return (
    <section className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto p-5 lg:py-14 '>
        <div className='w-full flex flex-col gap-4 lg:gap-0 md:flex-row md:justify-between p-5 lg:py-14'>
          <div className='flex gap-1 items-center font-roboto text-olive'>
            <h2 className='text-3xl md:text-4xl font-semibold inline-block'>
              Serene Saturday:
            </h2>
            <p className='text-2xl md:text-3xl md:max-w-80 lg:max-w-160 inline-block'>
              Yoga & Sound Bath Retreat
            </p>
          </div>
          <SearchInput
            placeholder='Search'
            value={table.getState().globalFilter ?? ""}
            onChange={(e) => table.setGlobalFilter(String(e.target.value))}
            className='max-w-sm'
          />
        </div>
        <div className='w-full shadow-lg p-5 md:p-10 rounded-2xl'>
          <Table className='w-full p-5'>
            <TableHeader className='bg-olive hover:bg-olive text-white'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className='hover:bg-olive rounded-lg'
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className='py-3'>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
