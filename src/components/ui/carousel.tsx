"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

import { Time } from "../practicioners/PractitionerCheckoutOverview";
import practitionersService from "@/server-actions/practitionersService";

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role='region'
        aria-roledescription='carousel'
        data-slot='carousel'
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className='overflow-hidden w-full h-full'
      data-slot='carousel-content'
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      role='group'
      aria-roledescription='slide'
      data-slot='carousel-item'
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot='carousel-previous'
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className='sr-only'>Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot='carousel-next'
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className='sr-only'>Next slide</span>
    </Button>
  );
}

// Carousel Dots
const CarouselDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { api } = useCarousel();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updateState, setUpdateState] = React.useState(false);

  const toggleUpdateState = React.useCallback(
    () => setUpdateState((prevState) => !prevState),
    []
  );

  React.useEffect(() => {
    if (api) {
      api.on("select", toggleUpdateState);
      api.on("reInit", toggleUpdateState);

      return () => {
        api.off("select", toggleUpdateState);
        api.off("reInit", toggleUpdateState);
      };
    }
  }, [api, toggleUpdateState]);

  const numberOfSlides = api?.scrollSnapList().length || 0;
  const currentSlide = api?.selectedScrollSnap() || 0;

  if (numberOfSlides > 1) {
    return (
      <div ref={ref} className={`flex justify-center ${props.className}`}>
        {Array.from({ length: numberOfSlides }, (_, i) => (
          <Button
            key={i}
            className={`rounded-full h-4 mx-[2px] p-0 ${
              i === currentSlide
                ? "w-4 bg-olive hover:bg-gray-500"
                : "w-8 bg-[#1515154D]/30 hover:bg-olive/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
          />
        ))}
      </div>
    );
  } else {
    return <></>;
  }
});
CarouselDots.displayName = "CarouselDots";

// This is a navigation component that can be used to navigate through the practitioner checkout steps
const CarouselNavigation = (({ startTime, endTime, date, pracId, amount }: {startTime: Time, endTime: Time, date: Date | undefined, pracId: string, amount: string}) => {

  const { api } = useCarousel();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updateState, setUpdateState] = React.useState(false);

  const toggleUpdateState = React.useCallback(
    () => setUpdateState((prevState) => !prevState),
    []
  );

  React.useEffect(() => {
    if (api) {
      api.on("select", toggleUpdateState);
      api.on("reInit", toggleUpdateState);

      return () => {
        api.off("select", toggleUpdateState);
        api.off("reInit", toggleUpdateState);
      };
    }
  }, [api, toggleUpdateState]);

  // const numberOfSlides = api?.scrollSnapList().length || 0;
  const currentSlide = api?.selectedScrollSnap() || 0;
  const validHours = () => {
    
    if(!startTime.hours || !endTime.hours) return false;

    if(startTime.range === "AM" && endTime.range === "PM") return true;
    else if(startTime.range === endTime.range && startTime.hours < endTime.hours) return true;
    else return false;
  }
  // console.log(startTime, endTime)
  return (
    <div className={`flex justify-center`}>
      <div className='w-full flex justify-center p-5'>
        {currentSlide === 0 ? (
          <Button
            key={currentSlide}
            className={`rounded-full w-[200px] md:w-[400px] p-4 !bg-olive mt-5`}
            // aria-label={`Go to slide ${currentSlide}`}
            onClick={() => {
              api?.scrollTo(currentSlide + 1);
            }}
            disabled={date === undefined}
          >
            Continue
          </Button>
        ) : (
          <div className='w-full grid grid-cols-2 gap-5 p-5'>
            <Button className="!col-span-1 rounded-full bg-olive hover:bg-olive/90" onClick={() => api?.scrollTo(currentSlide - 1)}>
              Back
            </Button>
            <Button className="!col-span-1 rounded-full bg-olive hover:bg-olive/90" onClick={async () => {
              if(currentSlide === 3) await practitionersService(pracId, amount)
              else api?.scrollTo(currentSlide + 1)
              }} 
              disabled={ currentSlide === 2 && !validHours()}
            >
              {currentSlide !== 3 ? "Next" : "Pay"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
});

function ChangeSchedule() {
  const { api } = useCarousel();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updateState, setUpdateState] = React.useState(false);

  const toggleUpdateState = React.useCallback(
    () => setUpdateState((prevState) => !prevState),
    []
  );

  React.useEffect(() => {
    if (api) {
      api.on("select", toggleUpdateState);
      api.on("reInit", toggleUpdateState);

      return () => {
        api.off("select", toggleUpdateState);
        api.off("reInit", toggleUpdateState);
      };
    }
  }, [api, toggleUpdateState]);

  return (
    <Button className="!text-olive !bg-lightolive px-7 !py-0.5 rounded-sm" onClick={() => api?.scrollTo(0)}>
      Change
    </Button>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  CarouselNavigation,
  ChangeSchedule
};
