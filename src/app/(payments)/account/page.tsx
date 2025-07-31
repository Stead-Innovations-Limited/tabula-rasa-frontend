import { columns, Transaction } from '@/components/payments/Columns'
import PaymentHero from '@/components/payments/PaymentHero'
import PaymentsTable from '@/components/payments/PaymentsTable'
import getAccountTransactions from '@/server-actions/getAccountTransactions';
import getAccountBalance from '@/server-actions/getAccountBalance'
import React from 'react'

export default async function page() {
  const data = await getAccountTransactions() as  Transaction[]
  const accountBal = await getAccountBalance() as string;
  if(!Array.isArray(data)){
    return(
      <p className="">
        Error
      </p>
    )
  }

  return (

    <>
      <PaymentHero accountBalance={accountBal} />
      <PaymentsTable columns={columns} data={data} />
    </>
  )
}
