"use client";

import { startTransition, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

import MyDropzone from "@/components/reusable-ui/MyDropzone";
import { AiOutlineLoading3Quarters } from "@/components/icons";

import { listVenueSchema } from "@/lib/clientDefinitions";
import { Venue } from "@/lib/types";
import editVenueAction from "@/server-actions/editVenueAction";
import useNotificationStatus from "@/hooks/useNotificationStatus";
import { titleCase, uploadFiles } from "@/lib/utils";

export default function EditVenueForm({ venueData }: { venueData: Venue }) {
  const router = useRouter();
  const updateNotificationStatus = useNotificationStatus((state) => state.updateNotificationStatus);
  const [state, action, isPending] = useActionState(editVenueAction, undefined);

  useEffect(() => {
    if (state?.error) {
      toast.error(titleCase(state.message), {
        classNames: {
          toast: "!text-red-500",
          title: "!text-red-500",
          description: "!text-red-500",
        },
      });
    }

    if (state?.success) {
      toast.success(titleCase(state.message), {
        classNames: {
          toast: "!text-green-700",
          title: "!text-green-700",
          description: "!text-green-700",
        },
      });
      updateNotificationStatus(true);
      router.back();
    }
  }, [state, router, updateNotificationStatus]);

  const form = useForm<z.infer<typeof listVenueSchema>>({
    resolver: zodResolver(listVenueSchema),
    defaultValues: {
      venueFiles: [] as File[],
      venueName: venueData.name,
      venueType: venueData.type.String,
      venueDescription: venueData.description.String,
      location: venueData.location.String,
      dimensions: venueData.dimension.String,
      maxCapacity: venueData.capacity.Int32.toString(),
      facilities: venueData.facilities[0],
      onSiteAccomodation: venueData.has_accomodation.Bool ? "yes" : "no",
      roomType: venueData.room_type.String,
      numberOfRooms: venueData.no_of_rooms.Int32.toString(),
      sleeps: venueData.sleeps.String,
      bedConfiguration: venueData.bed_type.String,
      roomAmenities: "",
      pricePerHour: venueData.rent.Int64.toString(),
    },
  });
  const onSiteAccomodation = form.watch("onSiteAccomodation");

  async function onSubmit(formData: z.infer<typeof listVenueSchema>) {
    // Here what i want to do is send the file i got here to get the presignedUrl and generated Url
    const files = formData.venueFiles;
    if (files.length === 0) {
      toast.error("Please upload at least an image of the venue", {
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
      venueFiles: parsedUploads,
      venueId: venueData.id,
    };
    // Then i make the request normally to my server action with my data
    startTransition(() => {
      action(payload);
    });
  }

  return (
    <section className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto px-5 py-8 md:pt-14 md:pb-20'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
            <div className='grid grid-cols-1 md:grid-cols-6 gap-5'>
              <div className='md:col-span-6'>
                <FormField
                  control={form.control}
                  name='venueFiles'
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
                  name='venueName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-olive !text-base !md:text-lg'>
                        Venue Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Serene Water Retreat'
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
                  name='venueType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-olive !text-base !md:text-lg'>
                        Areas of Expertise
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full !h-10 md:!h-12 !text-base !md:text-lg border-lightolive focus:outline-none'>
                            <SelectValue placeholder='Select a venue type to display' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Yoga Studio'>
                            Yoga Studio
                          </SelectItem>
                          <SelectItem value='Wellness Center'>
                            Wellness Center
                          </SelectItem>
                          <SelectItem value='Retreat Space'>
                            Retreat Space
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='md:col-span-6'>
                <FormField
                  control={form.control}
                  name='venueDescription'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-olive !text-base !md:text-lg'>
                        Venue Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Describe your venue in detail, including its unique features, ambiance, and any special offerings that make it stand out.'
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
                  name='location'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-olive !text-base !md:text-lg'>
                        Location
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Serene Water Retreat'
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
              <div className='md:col-span-3'>
                <FormField
                  control={form.control}
                  name='dimensions'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-olive !text-base !md:text-lg'>
                        Dimensions
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g. 1000 sq ft'
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
              <div className='md:col-span-3'>
                <FormField
                  control={form.control}
                  name='maxCapacity'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-olive !text-base !md:text-lg'>
                        Maximum Capacity
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g. 50 people'
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
                  name='facilities'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-olive !text-base !md:text-lg'>
                        Facilities
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='WiFi, Projector, Screen, Microphones,Speakers, Whiteboards, Flipcharts, etc.'
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
                  name='onSiteAccomodation'
                  render={({ field }) => (
                    <FormItem className='space-y-3'>
                      <FormLabel>Do You Offer On-Site Accommodation?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
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
              {onSiteAccomodation === "yes" && (
                <>
                  <div className='md:col-span-3'>
                    <FormField
                      control={form.control}
                      name='roomType'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-olive !text-base !md:text-lg'>
                            Room Type
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Serene Water Retreat'
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
                  <div className='md:col-span-3'>
                    <FormField
                      control={form.control}
                      name='numberOfRooms'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-olive !text-base !md:text-lg'>
                            Number of Rooms available
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='text'
                              placeholder='e.g. 3 rooms'
                              {...field}
                              className='py-2 border-1 h-10 md:h-12 !text-base !md:text-lg  border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='md:col-span-3'>
                    <FormField
                      control={form.control}
                      name='sleeps'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-olive !text-base !md:text-lg'>
                            Sleeps
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='text'
                              placeholder='e.g. 3 sleepers'
                              {...field}
                              className='py-2 border-1 h-10 md:h-12 !text-base !md:text-lg  border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='md:col-span-3'>
                    <FormField
                      control={form.control}
                      name='bedConfiguration'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-olive !text-base !md:text-lg'>
                            Bed Configuration
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='text'
                              placeholder='e.g. 2 single beds, 1 double bed'
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
                      name='roomAmenities'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-olive !text-base !md:text-lg'>
                            Room Amenities
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='text'
                              placeholder='e.g. Air conditioning, Heating, Wi-Fi, etc.'
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
              )}
              <div className='md:col-span-3'>
                <FormField
                  control={form.control}
                  name='pricePerHour'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-olive !text-base !md:text-lg'>
                        Price Per Hour
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          placeholder='e.g. $100 per hour'
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
  );
}
