import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventsContainerSkeleton() {
  return (
    <section className='w-full mb-8'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-6 p-5 lg:px-5 xl:py-0'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <Skeleton className="h-7 w-32 md:w-40" />
          <Skeleton className="h-6 w-24 md:w-32" />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8'>
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="py-0 overflow-clip !gap-0">
              <CardHeader className="w-full aspect-square relative p-0">
                <Skeleton className="absolute inset-0 w-full h-full object-cover" />
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center rounded-xl -mt-5 z-2 bg-white py-4 px-5 gap-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-5 w-3/5" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
