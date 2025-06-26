"use client";
import { startTransition, useActionState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "@/components/icons";
import useToast from "@/hooks/useToast";

import { editEventSchema } from "@/lib/definitions";
import editEventAction from "@/server-actions/editEventAction";
import { cn } from "@/lib/utils";

export default function EditEventForm() {
  const [state, action, isPending] = useActionState(editEventAction, undefined);

  const form = useForm<z.infer<typeof editEventSchema>>({
    resolver: zodResolver(editEventSchema),
    defaultValues: {
      eventTitle: "",
      eventTheme: "Retreat",
      eventDescription: "",
      keyActivities: "Yoga",
      targetAudience: "All",
      location: "",
      startDate: undefined,
      endDate: undefined,
      maxParticipantsNo: "100-200",
      pricePerParticipant: "",
    },
  });

  useToast(state);

  function onSubmit(formData: z.infer<typeof editEventSchema>) {
    form.reset();

    startTransition(() => {
      action(formData);
    });
  }
  return (
    <section className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto px-5 py-8 md:pt-14 md:pb-20'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
            <div className='grid grid-cols-1 md:grid-cols-6 gap-5'>
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full !h-10 md:!h-12 !text-base !md:text-lg border-lightolive focus:outline-none'>
                            <SelectValue placeholder='Select an event theme' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Retreat'>Retreat</SelectItem>
                          <SelectItem value='Wellness'>Wellness</SelectItem>
                          <SelectItem value='Mindfulness'>
                            Mindfulness
                          </SelectItem>
                        </SelectContent>
                      </Select>
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
              {/* Key Activities */}
              <div className='md:col-span-3'>
                <FormField
                  control={form.control}
                  name='keyActivities'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-olive !text-base !md:text-lg'>
                        Key Activities
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full !h-10 md:!h-12 !text-base !md:text-lg border-lightolive focus:outline-none'>
                            <SelectValue placeholder='Select an event activity' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Yoga'>Yoga</SelectItem>
                          <SelectItem value='Meditation'>Meditation</SelectItem>
                          <SelectItem value='Nutrition'>Nutrition</SelectItem>
                          <SelectItem value='Wellness Coaching'>
                            Wellness Coaching
                          </SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full !h-10 md:!h-12 !text-base !md:text-lg border-lightolive focus:outline-none'>
                            <SelectValue placeholder='Select target audience' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='All'>All</SelectItem>
                          <SelectItem value='Adults'>Adults</SelectItem>
                          <SelectItem value='Families'>Families</SelectItem>
                          <SelectItem value='Seniors'>Seniors</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Location */}
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
                          placeholder='123 Wellness St, Serenity City'
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full !h-10 md:!h-12 !text-base !md:text-lg border-lightolive focus:outline-none'>
                            <SelectValue placeholder='Select max number of participants' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='10-50'>10-50</SelectItem>
                          <SelectItem value='50-100'>50-100</SelectItem>
                          <SelectItem value='100-200'>100-200</SelectItem>
                          <SelectItem value='200-500'>200-500</SelectItem>
                          <SelectItem value='500-1000'>500-1000</SelectItem>
                          <SelectItem value='1000-2000'>1000-2000</SelectItem>
                          <SelectItem value='2000+'>2000+</SelectItem>
                        </SelectContent>
                      </Select>
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
  );
}
