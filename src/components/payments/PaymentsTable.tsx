"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Row,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useDebouncedCallback } from 'use-debounce';
import { CiSearch } from "@/components/icons";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function multiColumnFilter<TData>(row: Row<TData>, columnId: string, filterValue: string) {
  const description =
    row.getValue("description")?.toString().toLowerCase() ?? "";
  const amount = row.getValue("amount")?.toString().toLowerCase() ?? "";
  const status = row.getValue("status")?.toString().toLowerCase() ?? "";

  const search = filterValue.toLowerCase();

  return (
    description.includes(search) ||
    amount.includes(search) ||
    status.includes(search)
  );
}

function PaymentsTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const [noOfPages, setNoOfPages] = useState(0);

  // Use the select state to save state
  const [selectVal, setSelectVal] = useState("all")

  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: multiColumnFilter,
    state: {
      pagination,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  useEffect(() => {
    setNoOfPages(table.getPageCount());
  }, [table]);

  const handleSearch = useDebouncedCallback((searchString: string) => {
    table.setGlobalFilter(searchString)
  }, 100);

  // Use an effect to handle the filtering from select
  useEffect(() => {
    // If the select value is "all", we clear the global filter
    if (selectVal === "all") {
      table.setGlobalFilter("");
    } else {
      table.setGlobalFilter(selectVal);
    }
  }, [selectVal, table])


  return (
    <div className='w-full'>
      <div className='w-full xl:max-w-[1140px] p-5 mx-auto overflow-hidden rounded-md'>
        <div className='font-roboto flex flex-col md:flex-row md:justify-between items-center mb-4 md:mb-6'>
          {/* Table Header + filter and input */}
          <div className='text-olive'>
            <h4 className='font-semibold text-3xl'>Transaction History</h4>
            <p className='font-medium text-2xl'>Recent Activity</p>
          </div>
          <div className='flex gap-5'>
            {/* The Select Input for picking filter and approved state */}
            <div className=''>
              <Select
                value={selectVal}
                onValueChange={(value) => setSelectVal(value)}
                
              >
                <SelectTrigger className={cn("rounded-full !max-w-xs bg-olive text-white")}>
                  <SelectValue placeholder='Filter' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All</SelectItem>
                  <SelectItem value='processed'>Processed</SelectItem>
                  <SelectItem value='pending'>Pending</SelectItem>
                  <SelectItem value='completed'>Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* The Text input for searching across description, status and amount */}
            <div className='relative border rounded-full overflow-clip'>
              <Input
                placeholder='Search'
                value={table.getState().globalFilter ?? ""}
                onChange={(e) => handleSearch(String(e.target.value))}
                className='max-w-sm pl-3 py-2  pr-7'
              />
              <CiSearch className="absolute right-2 top-1/2 translate-y-[-50%] text-lg" />
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className='!bg-olive rounded-lg text-white'
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
                    <TableCell key={cell.id}>
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
        {/* Pagination Buttons */}
        <div className='flex flex-wrap items-center justify-end gap-y-2 space-x-2 py-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className='flex items-center justify-center gap-2'>
            {Array.from({ length: noOfPages }, (_, index) => (
              <Button
                key={index}
                variant={index === pagination.pageIndex ? "default" : "outline"}
                size='sm'
                onClick={() =>
                  setPagination((state) => ({
                    ...state,
                    pageIndex: index,
                  }))
                }
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PaymentsTable;
