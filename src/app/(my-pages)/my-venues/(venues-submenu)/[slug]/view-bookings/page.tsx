import SubBookingsContainer from "@/components/bookings/SubBookingsContainer";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return (
    <>
      <SubBookingsContainer venueId={slug} />
    </>
  )
}
