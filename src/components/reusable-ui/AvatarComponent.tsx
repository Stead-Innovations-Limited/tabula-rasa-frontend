import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarProps {
  imgUrl: string,
  firstname: string,
  lastname: string,
}

export default function AvatarComponent({
  imgUrl,
  firstname,
  lastname,
}: AvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={imgUrl} alt='@shadcn' />
      <AvatarFallback>{firstname.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}

