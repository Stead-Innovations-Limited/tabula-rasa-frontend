"use client";

import { startTransition, useActionState, useCallback, useEffect } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { TimeInput } from "@heroui/react";
import { parseTime, Time } from "@internationalized/date";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import MyDropzone from "@/components/reusable-ui/MyDropzone";
import { AiOutlineLoading3Quarters } from "@/components/icons";

import { createEventSchema } from "@/lib/clientDefinitions";
import editEventAction from "@/server-actions/editEventAction";

import useToast from "@/hooks/useToast";
import { cn, uploadFiles } from "@/lib/utils";
import { Event, Venue } from "@/lib/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Check, ChevronsUpDown } from "lucide-react";
import useNotificationStatus from "@/hooks/useNotificationStatus";

// This function safely parses a time string, returning a default time if the input is invalid
// This is useful to ensure that the time input is always valid, even if the user does
// not provide a valid time or if the input is null/undefined.
// It uses the parseTime function from @internationalized/date to parse the time string.
function safeParseTime(value: string | null | undefined): Time {
  try {
    if (!value) return parseTime("00:00");
    return parseTime(value);
  } catch {
    return parseTime("00:00");
  }
}

export default function EditEventForm({
  venues,
  event,
}: {
  venues: Venue[];
  event: Event;
}) {
  const router = useRouter();
  console.log(event, "These are the events");
  const updateNotificationStatus = useNotificationStatus(
    (state) => state.updateNotificationStatus
  );
  const [state, action, isPending] = useActionState(editEventAction, undefined);
  
  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      eventFiles: event.image_links.length > 0 ? event.image_links : [],
      eventTitle: event.name,
      eventTheme: event.theme.String,
      eventDescription: event.description.String,
      keyActivities: event.activities[0],
      targetAudience: event.audience.String,
      useOurVenue: event.venue_is_listed ? "yes" : "no",
      venueName: event.venue_is_listed ? "" : event.venue_name.String,
      venueLocation: event.venue_is_listed ? "" : event.venue_location.String,
      location: event.venue_is_listed
        ? venues.find((v) => v.id === event.venue_id!)?.name
        : "",
      startDate: new Date(event.start_date.Time),
      endDate: new Date(event.end_date.Time),
      startTime: event.start_time.Time.split("T")[1].replace("Z", ""),
      endTime: event.end_time.Time.split("T")[1].replace("Z", ""),
      maxParticipantsNo: event.total_particpant.Int32.toString(),
      pricePerParticipant: (event.price / 100).toString(),
    },
  });

  const handleCallback = useCallback(() => {
      router.back();
      updateNotificationStatus(true);
    }, [router, updateNotificationStatus]);
    
  useToast(state, undefined, handleCallback);

  // Here i use the watch function to get the current value of the location and maxParticipantsNo fields
  // This allows me to react to changes in these fields and perform validations or updates accordingly
  const selectedLocationId = form.watch("location");
  const selectedParticipantsRange = form.watch("maxParticipantsNo");
  const useOurVenue = form.watch("useOurVenue");

  // This useEffect hook is used to check if the selected venue's capacity is sufficient for the selected participants range
  // If the selected venue's capacity is less than the maximum number of participants, it shows
  // a warning toast to inform the user
  // It runs whenever the selectedLocationId or selectedParticipantsRange changes
  useEffect(() => {
    // If we are not using any of our listed venues, then there is no need to perform checks
    if ( useOurVenue === "no" || !selectedLocationId || !selectedParticipantsRange) return;

    const selectedVenue = venues.find((v) => v.name === selectedLocationId);
    const maxParticipants = Number(selectedParticipantsRange);

    if (selectedVenue && maxParticipants > selectedVenue.capacity.Int32) {
      toast.warning(
        `Max participants (${maxParticipants}) exceed venue capacity (${selectedVenue.capacity.Int32})`,
        {
          classNames: {
            toast: "!text-orange-500",
            title: "!text-orange-500",
            description: "!text-orange-500",
          },
          duration: 8000,
        }
      );
    }
  }, [selectedLocationId, selectedParticipantsRange, venues, useOurVenue]);

  async function onSubmit(formData: z.infer<typeof createEventSchema>) {
    const selectedVenue = venues.find((v) => v.name === formData.location);
    const maxParticipants = Number(formData.maxParticipantsNo);

    if (useOurVenue === "yes" && selectedVenue && maxParticipants > selectedVenue.capacity.Int32) {
      toast.error(
        `Too many participants for selected venue (max: ${selectedVenue.capacity.Int32})`,
        {
          classNames: {
            toast: "!text-red-500",
            title: "!text-red-500",
            description: "!text-red-500",
          },
          duration: 7000,
        }
      );
      return;
    }
    // Here what i want to do is send the file i got here to get the presignedUrl and generated Url
    const files = formData.eventFiles;
    // If no files are uploaded, we show a toast and return early
    // This is to ensure that the user uploads at least one image for the event
    if (files.length === 0) {
      toast.error("Please upload at least an image of the event", {
        classNames: {
          toast: "!text-red-500",
          title: "!text-red-500",
          description: "!text-red-500",
        },
      });
      return;
    }

    // This function uploads images if they are images to R2 cloudflare and gives us their strings if it was successful or false if it wasn't
    const uploadedUrls = await uploadFiles(files);

    // We remove all instances of failed uploads
    const parsedUploads = uploadedUrls.filter((ele) => ele !== false);
    if (parsedUploads.length < 1) return;

    // Replace the files in formData with URLs
    const payload = {
      ...formData,
      ...(useOurVenue === "yes" && { location: selectedVenue?.id }),
      eventFiles: uploadedUrls,
      eventId: event.id,
    };

    startTransition(() => {
      action(payload);
    });
  }

  return (
    <>
      <section className='w-full'>
        <div className='w-full xl:max-w-[1140px] mx-auto px-5 py-8 md:pt-14 md:pb-20'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
              <div className='grid grid-cols-1 md:grid-cols-6 gap-5'>
                <div className='md:col-span-6'>
                  <FormField
                    control={form.control}
                    name='eventFiles'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-olive !text-base !md:text-lg'>
                          Upload Compelling Images & Videos
                        </FormLabel>

                        <MyDropzone
                          value={field.value}
                          onChange={field.onChange}
                        />

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='md:col-span-4'>
                  <FormField
                    control={form.control}
                    name='eventTitle'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-olive !text-base !md:text-lg'>
                          Event Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Serene Saturday'
                            type='text'
                            {...field}
                            className='py-2 border-1 h-10 md:h-12 !text-base !md:text-lg  border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='md:col-span-2'>
                  <FormField
                    control={form.control}
                    name='eventTheme'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-olive !text-base !md:text-lg'>
                          Event Theme
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter the event theme'
                            type='text'
                            {...field}
                            className='py-2 border-1 h-10 md:h-12 !text-base !md:text-lg  border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Event Description */}
                <div className='md:col-span-6'>
                  <FormField
                    control={form.control}
                    name='eventDescription'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-olive !text-base !md:text-lg'>
                          Event Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Describe your event in detail, including its unique features, ambiance, and any special offerings that make it stand out.'
                            {...field}
                            className='py-2 border-1 h-10 md:h-12 !text-base !md:text-lg  border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Key Activities */}
                <div className='md:col-span-6'>
                  <FormField
                    control={form.control}
                    name='keyActivities'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-olive !text-base !md:text-lg'>
                          Key Activities
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter an event activity'
                            type='text'
                            {...field}
                            className='py-2 border-1 h-10 md:h-12 !text-base !md:text-lg  border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Target Audience */}
                <div className='md:col-span-3'>
                  <FormField
                    control={form.control}
                    name='targetAudience'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-olive !text-base !md:text-lg'>
                          Target Audience
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter your target audience'
                            type='text'
                            {...field}
                            className='py-2 border-1 h-10 md:h-12 !text-base !md:text-lg  border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='md:col-span-6'>
                  <FormField
                    control={form.control}
                    name='useOurVenue'
                    render={({ field }) => (
                      <FormItem className='space-y-3'>
                        <FormLabel>
                          Do you want to use one of our listed venues?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(e) => {
                              if (e === "yes") {
                                // form.setValue("location", "");
                                form.setValue("venueName", "");
                                form.setValue("venueLocation", "");
                              } else {
                                // form.setValue("venueName", "");
                                // form.setValue("venueLocation", "");
                                form.setValue("location", "");
                              }
                              return field.onChange(e);
                            }}
                            defaultValue={field.value}
                            className='flex gap-5'
                          >
                            <FormItem className='flex items-center gap-3'>
                              <FormControl>
                                <RadioGroupItem value='yes' />
                              </FormControl>
                              <FormLabel className='font-normal'>Yes</FormLabel>
                            </FormItem>
                            <FormItem className='flex items-center gap-3'>
                              <FormControl>
                                <RadioGroupItem value='no' />
                              </FormControl>
                              <FormLabel className='font-normal'>No</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {useOurVenue === "no" ? (
                  <>
                    {/* Venue Name */}
                    <div className='md:col-span-3'>
                      <FormField
                        control={form.control}
                        name='venueName'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-olive !text-base !md:text-lg'>
                              What is the name of your venue?
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Enter the venue name'
                                type='text'
                                {...field}
                                className='py-2 border-1 h-10 md:h-12 !text-base !md:text-lg  border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Venue Location */}
                    <div className='md:col-span-3'>
                      <FormField
                        control={form.control}
                        name='venueLocation'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-olive !text-base !md:text-lg'>
                              Venue Location
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Enter the address of the venue location'
                                type='text'
                                {...field}
                                className='py-2 border-1 h-10 md:h-12 !text-base !md:text-lg  border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Location */}
                    <div className='md:col-span-3'>
                      <FormField
                        control={form.control}
                        name='location'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-olive !text-base !md:text-lg'>
                              Location
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant='outline'
                                    role='combobox'
                                    className={cn(
                                      "w-full justify-between !h-10 md:!h-12",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value?.trim()
                                      ? field.value || ""
                                      : "Select venue"}
                                    <ChevronsUpDown className='opacity-50' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className='w-[200px] p-0'>
                                <Command onValueChange={field.onChange}>
                                  <CommandInput
                                    placeholder='Search venue...'
                                    className='h-9'
                                  />
                                  <CommandList>
                                    <CommandEmpty>No Venue found.</CommandEmpty>
                                    <CommandGroup>
                                      {venues.map((venue) => (
                                        <CommandItem
                                          value={venue.name}
                                          key={venue.id}
                                          onSelect={() => {
                                            form.setValue(
                                              "location",
                                              venue.name
                                            );
                                          }}
                                        >
                                          {venue.name}
                                          <Check
                                            className={cn(
                                              "ml-auto",
                                              venue.name === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
                {/* Start Date */}
                <div className='md:col-span-3'>
                  <FormField
                    control={form.control}
                    name='startDate'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full !h-10 md:!h-12 !text-base !md:text-lg border-lightolive focus:outline-none pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a start date</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              captionLayout='dropdown'
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* End Date */}
                <div className='md:col-span-3'>
                  <FormField
                    control={form.control}
                    name='endDate'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full !h-10 md:!h-12 !text-base !md:text-lg border-lightolive focus:outline-none pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick an end date</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              captionLayout='dropdown'
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='md:col-span-3'>
                  {/* Start Time */}
                  <FormField
                    control={form.control}
                    name='startTime'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start time</FormLabel>
                        <TimeInput
                          aria-label='Start Time'
                          granularity='second'
                          value={safeParseTime(field.value)}
                          onChange={(val) => {
                            if (!val) return field.onChange("");
                            const h = String(val.hour).padStart(2, "0");
                            const m = String(val.minute).padStart(2, "0");
                            const s = "00"; // Always append seconds
                            field.onChange(`${h}:${m}:${s}`);
                          }}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='md:col-span-3'>
                  {/* End Time */}
                  <FormField
                    control={form.control}
                    name='endTime'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End time</FormLabel>
                        <TimeInput
                          aria-label='End Time'
                          granularity='second'
                          value={safeParseTime(field.value)}
                          onChange={(val) => {
                            if (!val) return field.onChange("");
                            const h = String(val.hour).padStart(2, "0");
                            const m = String(val.minute).padStart(2, "0");
                            const s = "00"; // Always append seconds
                            field.onChange(`${h}:${m}:${s}`);
                          }}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Max Participants */}
                <div className='md:col-span-3'>
                  <FormField
                    control={form.control}
                    name='maxParticipantsNo'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-olive !text-base !md:text-lg'>
                          Max Number of Participants
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter the maximum number of participants you want at your event'
                            type='text'
                            {...field}
                            className='py-2 border-1 h-10 md:h-12 !text-base !md:text-lg  border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Price Per Participant */}
                <div className='md:col-span-3'>
                  <FormField
                    control={form.control}
                    name='pricePerParticipant'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-olive !text-base !md:text-lg'>
                          Price Per Participant
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='$50'
                            type='text'
                            {...field}
                            className='py-2 border-1 h-10 md:h-12 !text-base !md:text-lg  border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='md:col-span-4 md:col-start-2 w-full flex items-center justify-center'>
                  <Button
                    type='submit'
                    className='w-full bg-olive hover:bg-olive/80 text-white disabled:bg-olive/80 py-6'
                  >
                    {isPending ? (
                      <>
                        Loading{" "}
                        <AiOutlineLoading3Quarters className='animate-spin size-4' />
                      </>
                    ) : (
                      <>Save</>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
}
