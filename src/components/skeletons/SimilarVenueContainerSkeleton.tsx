import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SimilarVenueContainerSkeleton() {
  return (
    <section className='w-full my-8'>
      <div className='w-full xl:max-w-[1140px] mx-auto flex flex-col gap-6 p-5 lg:px-5 xl:py-0'>
        <div className='flex justify-between items-center font-roboto text-olive'>
          <Skeleton className="h-7 w-40 md:w-52" /> {/* Heading */}
        </div>
        <div className='flex gap-5 overflow-x-auto scrollbar-hide'>
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="min-w-[250px] flex-shrink-0 py-0 overflow-clip !gap-0">
              <CardHeader className="w-full aspect-square relative p-0">
                <Skeleton className="absolute inset-0 w-full h-full object-cover" />
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center rounded-xl -mt-5 z-2 bg-white py-4 px-5 gap-2">
                <Skeleton className="h-6 w-3/4" /> {/* Venue Name */}
                <div className="flex gap-6 w-full justify-center">
                  <Skeleton className="h-5 w-1/4" /> {/* Price */}
                  <Skeleton className="h-5 w-1/4" /> {/* Attendance */}
                </div>
                <Skeleton className="h-5 w-4/5" /> {/* Address */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
