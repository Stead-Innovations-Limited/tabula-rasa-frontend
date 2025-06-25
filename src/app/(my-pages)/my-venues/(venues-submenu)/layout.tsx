import SubBookingsBar from "@/components/bookings/SubBookingsBar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SubBookingsBar/>
      {children}
    </>
  );
}