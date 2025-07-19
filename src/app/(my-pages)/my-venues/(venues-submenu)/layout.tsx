import SubBookingsBar from "@/components/bookings/SubBookingsBar";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ venueId: string }>;
}) {
  const { venueId } = await params
  return (
    <>
      <SubBookingsBar venueId={venueId} />
      {children}
    </>
  );
}