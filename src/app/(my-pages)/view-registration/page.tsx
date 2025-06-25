import { columns, Registrations } from "@/components/registrations/columns";

import RegistrationsBar from "@/components/registrations/RegistrationsBar";
import RegistrationsTable from "@/components/registrations/RegistrationsTable";

const data: Registrations[] = [
  {
    sn: 1,
    name: "John Doe",
    quantity: 2,
    amount: 50,
    transactionId: "TX123456789",
  },
  {
    sn: 2,
    name: "Jane Smith",
    quantity: 1,
    amount: 30,
    transactionId: "TX987654321",
  },
  {
    sn: 3,
    name: "Alice Johnson",
    quantity: 3,
    amount: 75,
    transactionId: "TX1122334455",
  },
];

export default function page() {
  return (
    <>
      <RegistrationsBar />
      <RegistrationsTable columns={columns} data={data} />
    </>
  );
}
