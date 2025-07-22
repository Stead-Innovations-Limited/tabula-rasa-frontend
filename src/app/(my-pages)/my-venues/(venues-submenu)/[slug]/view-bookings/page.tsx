import SubBookingsBar from "@/components/bookings/SubBookingsBar";
import SubBookingsContainer from "@/components/bookings/SubBookingsContainer";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return (
    <>
      <SubBookingsBar venueId={slug} />
      <SubBookingsContainer venueId={slug} />
    </>
  )
}
