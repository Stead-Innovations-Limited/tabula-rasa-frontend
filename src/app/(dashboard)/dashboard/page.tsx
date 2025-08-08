export const dynamic = "force-dynamic";

import DashboardBanner from "@/components/dashboard/DashboardBanner";
import getEvents from "@/server-actions/getEvents";
import { Event, User, Venue } from "@/lib/types";
import getVenues from "@/server-actions/getVenues";
import getPractitioners from "@/server-actions/getPractitioners";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import EventsContainerWrapper from "@/components/dashboard/EventsContainerWrapper";
import VenuesContainerWrapper from "@/components/dashboard/VenuesContainerWrapper";
import PracticionersContainerWrapper from "@/components/dashboard/PractitionersContainerWrapper";

export default async function page() {
  const events = (await getEvents()) as
    | Event[]
    | { error: boolean; errorData?: string; message?: string };
  const venuesData = (await getVenues()) as
    | Venue[]
    | { error: boolean; errorData?: string; message?: string };
  const userProfiles = (await getPractitioners()) as
    | User[]
    | { error: boolean; errorData?: string; message?: string };
    
  const session = await getServerSession(authOptions);

  if (
    !Array.isArray(events) ||
    !Array.isArray(venuesData) ||
    !Array.isArray(userProfiles)
  ) {
    throw new Error("Failed to fetch events or venues or practitioners.")
  }
  const eventsWithVenues = events.map((event) => ({
    ...event,
    location: event.venue_is_listed ? venuesData.filter((venue) => venue.id === event.venue_id)[0].location.String : `${event.venue_name.String}, ${event.venue_location.String}`,
  }));

  const sessionId = session?.user?.id || "";

  const filteredUsers = userProfiles.filter((ele) => ele.id !== sessionId);
  return (
    <>
      <DashboardBanner />
      <EventsContainerWrapper eventsWithVenues={eventsWithVenues} />
      <VenuesContainerWrapper venues={venuesData} />
      <PracticionersContainerWrapper filteredUsers={filteredUsers} />
    </>
  );
}
