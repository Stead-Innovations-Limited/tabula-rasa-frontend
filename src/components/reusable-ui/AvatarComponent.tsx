import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarProps {
  imgUrl: string | undefined;
  firstname: string;
  lastname: string;
}

export default function AvatarComponent({
  imgUrl,
  firstname,
  lastname,
}: AvatarProps) {
   
  const name = firstname.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase()
  return (
    <Avatar
      className='cursor-pointer size-6 md:size-8'
    >
      <AvatarImage src={imgUrl} alt={`Profile picture for ${name}`} />
      <AvatarFallback>
        {name}
      </AvatarFallback>
    </Avatar>
  );
}
