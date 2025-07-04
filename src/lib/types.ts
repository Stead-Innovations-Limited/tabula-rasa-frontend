export interface Event {
  id: string;
  venue_id: string;
  image_links: string[];
  name: string;
  theme: {
    String: string;
    Valid: boolean;
  };
  description: {
    String: string;
    Valid: boolean;
  };
  audience: {
    String: string;
    Valid: boolean;
  };
  activities: string[];
  created_by: string;
  start_time: {
    Time: string;
    Valid: boolean;
  };
  end_time: {
    Time: string;
    Valid: boolean;
  };
  start_date: {
    Time: string;
    Valid: boolean;
  };
  end_date: {
    Time: string;
    Valid: boolean;
  };
  total_particpant: {
    Int32: number;
    Valid: boolean;
  };
  status: "pending" | "approved" | "declined" | string;
  created_at: string;
}


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
  working_schedule: NullableRawSchedule;
  rental_days: NullableString;
  booking_price: NullableInt64;
  owned_by: string;
  created_at: string;
}

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

interface NullableRawSchedule {
  RawMessage: {
    [day: string]: {
      is_open: boolean;
      opens_at: string;
      closes_at: string;
    };
  };
  Valid: boolean;
}


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
  working_schedule: NullableRawSchedule;
  rate: NullableInt32;
  created_at: string;
}

interface NullableString {
  String: string;
  Valid: boolean;
}

interface NullableInt32 {
  Int32: number;
  Valid: boolean;
}
