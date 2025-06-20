import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PersonalCard() {
  return (
    <Card className="w-full md:w-fit hover:outline-1 -outline-offset-4 hover:outline-olive transition-all duration-300 ease-in-out">
      <CardHeader>
        <CardTitle className="text-lg">Personal Account</CardTitle>
        <CardDescription className="sr-only">This card details what features you benefit from a Personal Account</CardDescription>
      </CardHeader>
      <CardContent>
         <ul className="flex flex-col gap-4 list-disc list-inside text-base">
          <li className="">
            Book wellness experiences
          </li>
          <li className="">
            Manage your personal bookings
          </li>
         </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-olive hover:bg-olive text-white">
          Select
        </Button>
      </CardFooter>
    </Card>
  );
}
