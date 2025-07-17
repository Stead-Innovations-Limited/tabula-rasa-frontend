import BookingsCard from "./BookingsCard";

function BookingsList() {
  return (
    <div className='space-y-5 md:space-y-8 mt-5 md:mt-8'>
      {Array.from({ length: 5 }, (_, index) => (
        <BookingsCard key={index} />
      ))}
    </div>
  );
}

export default BookingsList;
