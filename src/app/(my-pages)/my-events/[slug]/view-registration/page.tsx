import { columns, Registrations } from "@/components/registrations/columns";

import RegistrationsBar from "@/components/registrations/RegistrationsBar";
import RegistrationsTable from "@/components/registrations/RegistrationsTable";
import getEventRegistrations from "@/server-actions/getEventRegistrations";
import { EventRegistration} from "@/lib/types";


export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: eventId } = await params;
  const registrationData = await getEventRegistrations(eventId) as EventRegistration[] | { error: boolean; errorData?: string; message?: string };
  // If there is an error in fetching the registrations, we throw an error.
  if ("error" in registrationData || !Array.isArray(registrationData)) {
    throw new Error("An error occurred while fetching the registrations.");
  }

  // We get the event title and description
  const eventTitle = registrationData[0].event.name;
  const eventDescription = registrationData[0].event.description.String;
  // We map the registration data to the format required by the table.
  const data: Registrations[] = registrationData[0]?.participants ? registrationData[0].participants.map((registration, index) => ({
    sn: index + 1,
    name: registration.participant_name,
    quantity: registration.quantity,
    amount: parseFloat(registration.amount_paid),
    transactionId: registration.purchase_id,
  })) : [];

  return (
    <>
      <RegistrationsBar />
      <RegistrationsTable columns={columns} data={data} eventTitle={eventTitle} eventDescription={eventDescription} />
    </>
  );
}
