import { Event, User, Venue } from "./types";
type EventWithVenue = Event & {
  location: string;
};

function filterEvents(events: EventWithVenue[], query: string): EventWithVenue[] {
  if (!query.trim()) return events;

  const normalizedQuery = query.trim().toLowerCase();

  return events.filter(event => {
    const {
      name,
      theme,
      description,
      audience,
      activities,
    } = event;

    return (
      name.toLowerCase().includes(normalizedQuery) ||
      (theme.Valid && theme.String.toLowerCase().includes(normalizedQuery)) ||
      (description.Valid && description.String.toLowerCase().includes(normalizedQuery)) ||
      (audience.Valid && audience.String.toLowerCase().includes(normalizedQuery)) ||
      activities.some(activity => activity.toLowerCase().includes(normalizedQuery))
    );
  });
}

function filterBusinessProfiles(data: User[], search: string) {
  const query = search.toLowerCase().trim();

  return data.filter((item) => {
    const {
      bio,
      phone_no,
      country,
      address,
      experience,
      field,
      business_name,
      rate,
    } = item;

    return (
      (bio?.Valid && bio.String.toLowerCase().includes(query)) ||
      (phone_no?.Valid && phone_no.String.toLowerCase().includes(query)) ||
      (country?.Valid && country.String.toLowerCase().includes(query)) ||
      (address?.Valid && address.String.toLowerCase().includes(query)) ||
      (experience?.Valid && experience.Int32.toString().includes(query)) ||
      (field?.Valid && field.String.toLowerCase().includes(query)) ||
      (business_name?.Valid && business_name.String.toLowerCase().includes(query)) ||
      (rate?.Valid && rate.Int32.toString().includes(query))
    );
  });
}

function filterVenues(data: Venue[], search: string) {
  const query = search.toLowerCase().trim();

  return data.filter((item) => {
    const {
      name,
      type,
      location,
      description,
      capacity,
      dimension,
      facilities
    } = item;

    return (
      (name && name.toLowerCase().includes(query)) ||
      (location?.Valid && location.String.toLowerCase().includes(query)) ||
      (description?.Valid && description.String.toLowerCase().includes(query)) ||
      (capacity?.Valid && capacity.Int32.toString().includes(query)) ||
      (dimension?.Valid && dimension.String.toLowerCase().includes(query)) ||
      (type?.Valid && type.String.toLowerCase().includes(query)) ||
      (facilities.length && facilities.join(", ").toLowerCase().includes(query))
    );
  });
}

export { filterEvents, filterBusinessProfiles, filterVenues };