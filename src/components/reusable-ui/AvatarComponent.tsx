import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarProps {
  imgUrl: string,
  firstname: string,
  lastname: string,
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AvatarComponent({
  imgUrl,
  firstname,
  lastname,
  setMenu
}: AvatarProps) {
  return (
    <Avatar onClick={() => setMenu((prev) => !prev)} className='cursor-pointer'>
      <AvatarImage src={imgUrl} alt='@shadcn' />
      <AvatarFallback>{firstname.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}

