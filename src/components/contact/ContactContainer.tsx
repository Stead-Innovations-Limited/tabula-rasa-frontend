import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";

function ContactContainer() {
  return (
    <div className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-10'>
        <ContactForm />
        <ContactDetails />
      </div>
    </div>
  );
}

export default ContactContainer;
