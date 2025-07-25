import { columns, Transaction } from '@/components/payments/Columns'
import PaymentHero from '@/components/payments/PaymentHero'
import PaymentsTable from '@/components/payments/PaymentsTable'
import React from 'react'

const data: Transaction[] = [
  {
    description: "Serene Saturday: Yoga & Sound Bath",
    date: "2025-07-10",
    amount: "-$80.00",
    status: "Completed",
  },
  {
    description: "Stress Management Session",
    date: "2025-07-05",
    amount: "-$50.00",
    status: "Completed",
  },
  {
    description: "Payout - Event Registrations",
    date: "2025-07-01",
    amount: "+$450.00",
    status: "Processed",
  },
  {
    description: "Venue Rental: The Tranquil Shala",
    date: "2025-06-28",
    amount: "+$240.00",
    status: "Processed",
  },
  {
    description: "Autumn Equinox Retreat Registration",
    date: "2025-06-20",
    amount: "-$80.00",
    status: "Pending",
  },
  {
    description: "Serene Saturday: Yoga & Sound Bath",
    date: "2025-07-10",
    amount: "-$20.00",
    status: "Completed",
  },
  {
    description: "Serene Saturday: Yoga & Sound Bath",
    date: "2025-07-10",
    amount: "-$80.00",
    status: "Completed",
  },
];

function page() {
  return (
    <>
      <PaymentHero />
      <PaymentsTable columns={columns} data={data} />
    </>
  )
}

export default page