"use client"

import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TransactionStatus = "Completed" | "Processed" | "Pending";

export interface Transaction {
  description: string;
  date: string;
  amount: string;
  status: TransactionStatus;
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (prop) => (
      <p
        className={cn(
          "inline-flex justify-center items-center gap-1 w-full bg-gray-300 text-center p-1 rounded-sm",
        )}
      >
        <span className={cn(
          "inline-block text-center size-1 rounded-full",
          prop.row.original.status == "Completed"
            ? "bg-red-500"
            : prop.row.original.status == "Processed"
            ? "bg-green-500"
            : "bg-yellow-500"
        )}></span>
        <span className="inline-block ml-1">{(prop.getValue() as string) || "Unknown Status"}</span>
      </p>
    ),
  },
]