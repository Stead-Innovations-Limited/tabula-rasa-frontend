import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function RetreatCards() {
  return (
    <Card className="pt-0 overflow-clip border-none ">
      <CardContent className='relative aspect-[296/327.61] md:aspect-[412/456]'>
        <Image
          src='/morning-exercise.jpg'
          alt='A lady performing yoga'
          fill={true}
          className="object-cover object-center"
        />
      </CardContent>
      <CardHeader className="font-nunito">
        <CardTitle className="text-2xl">Autumn Reflection Retreat</CardTitle>
        <CardDescription className="text-base">
          Join the Autumn Reflection Retreat, a nourishing wellness escape
          designed for women. Embrace the season of change to pause, reflect,
          and release what no longer serves you, finding sanctuary to quiet your
          mind and gain clarity.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="ml-auto bg-olive hover:bg-olive text-white font-roboto text-xl px-12 py-4">
            View
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RetreatCards;
