import CheckoutBar from "@/components/navs/CheckoutBar"
import PractitionerCheckoutOverview from "@/components/practicioners/PractitionerCheckoutOverview";
import { User } from "@/lib/types";
import getPractitionersBookings from "@/server-actions/getPractitionersBookings";
import getUserById from "@/server-actions/getUserById";

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  // This page is for the checkout process of practitioners.
  const { slug: practitionerId } = await params;
  // Here we typically fetch the practitioner's data using the practitionerId.
  const userDetails = await getUserById(practitionerId) as User;
  const bookings = await getPractitionersBookings(practitionerId) as string[];

  return (
    <>
      <CheckoutBar />
      <PractitionerCheckoutOverview userDetails={userDetails} bookings={bookings} />
    </>
  )
}
