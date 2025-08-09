export const dynamic = "force-dynamic";
import { EventRegistration } from "@/lib/types";
import EventCheckoutBar from "@/components/events/EventCheckoutBar";
import EventCheckoutOverview from "@/components/events/EventCheckoutOverview";
import getEventRegistrations from "@/server-actions/getEventRegistrations";

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: eventId } = await params;
  const registrationData = (await getEventRegistrations(eventId)) as
      | EventRegistration[]
      | { error: boolean; errorData?: string; message?: string };
    // If there is an error in fetching the registrations, we throw an error.
    if ("error" in registrationData || !Array.isArray(registrationData)) {
      throw new Error("An error occurred while fetching the registrations.");
    }
  
    const event = registrationData[0].event;
    const totalParticipants = registrationData[0].total_participants;
    const registeredParticipants = registrationData[0].registered_participants;
  
  return (
    <>
      <EventCheckoutBar />
      <EventCheckoutOverview eventData={event} ticketsLeft={totalParticipants - registeredParticipants} />
    </>
  )
}

