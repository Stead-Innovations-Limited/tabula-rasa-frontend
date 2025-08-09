// ========== SHARED TYPES ==========

interface NullableString {
  String: string;
  Valid: boolean;
}

interface NullableInt32 {
  Int32: number;
  Valid: boolean;
}

interface NullableInt64 {
  Int64: number;
  Valid: boolean;
}

interface NullableBool {
  Bool: boolean;
  Valid: boolean;
}

interface NullableRawMessage<T> {
  RawMessage: T | null;
  Valid: boolean;
}

export interface WorkingSchedule {
  [day: string]: {
    is_open: boolean;
    opens_at: string;
    closes_at: string;
  };
}

export interface ParticipantPurchases {
  purchase_id: string;
  participant_name: string;
  quantity: number;
  amount_paid: string;
  purchase_date: string; // could be Date if you plan to parse it
}

// ========== EVENT INTERFACE ==========

export interface Event {
  id: string;
  venue_is_listed: boolean;
  venue_name: NullableString;
  venue_location: NullableString;
  venue_id: string | null;
  image_links: string[];
  name: string;
  theme: NullableString;
  description: NullableString;
  audience: NullableString;
  activities: string[];
  created_by: string;
  start_time: { Time: string; Valid: boolean };
  end_time: { Time: string; Valid: boolean };
  start_date: { Time: string; Valid: boolean };
  end_date: { Time: string; Valid: boolean };
  total_particpant: NullableInt32;
  status: "pending" | "confirmed" | "declined" | string;
  created_at: string;
  price: number;
}

export interface EventRegistration {
  event: Event;
  total_participants: number;
  registered_participants: number;
  participants: ParticipantPurchases[] | null;
}

// ========== VENUE INTERFACE ==========

export interface Venue {
  id: string;
  name: string;
  type: NullableString;
  description: NullableString;
  location: NullableString;
  dimension: NullableString;
  capacity: NullableInt32;
  facilities: string[];
  image_links: string[];
  has_accomodation: NullableBool;
  room_type: NullableString;
  no_of_rooms: NullableInt32;
  sleeps: NullableString;
  bed_type: NullableString;
  rent: NullableInt64;
  is_available: NullableBool;
  working_schedule: NullableRawMessage<WorkingSchedule>;
  rental_days: NullableString;
  booking_price: NullableInt64;
  owned_by: string;
  created_at: string;
}

// ========== USER INTERFACE ==========

export interface User {
  id: string;
  bio: NullableString;
  image_link: NullableString;
  phone_no: NullableString;
  country: NullableString;
  address: NullableString;
  experience: NullableInt32;
  field: NullableString;
  business_name: NullableString;
  roles: "Personal Account" | "Business Account";
  working_schedule: NullableRawMessage<WorkingSchedule>;
  rate: NullableInt32;
  created_at: string;
}

// ========== NOTIFICATION INTERFACE ==========

export interface Notification {
  id: string;
  user_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// ========== PRACTITIONERS BOOKINGS INTERFACE ==========
export interface PractitionersBookings {
  id: string;
  service_id: string;
  booked_for: string;
  booked_by: string;
  created_at: string;
}

export interface ServiceBooking       {
          id: string,
          user_id: string,
          start_time: string,
          end_time: string,
          date: string,
          price: number,
          created_by: string,
          status: "pending" | "declined" | "confirmed",
          created_at: string
          location?: string
          field?: string
      }