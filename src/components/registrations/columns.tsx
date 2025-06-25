"use client"
 
import { ColumnDef } from "@tanstack/react-table";

export type Registrations = {
  sn: number;
  name: string;
  quantity: number;
  amount: number;
  transactionId: string;
}

const columns: ColumnDef<Registrations>[] = [
  {
    accessorKey: "sn",
    header: "S/N",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
  },
]


export {columns};