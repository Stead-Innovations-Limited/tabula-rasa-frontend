"use client";
import { useState } from "react";
import Image from "next/image";

function PractitionerImageFallback({imgUrl, imgAlt}: {imgUrl: string, imgAlt: string}) {
  const fallbackImgUrl = "/avatar.jpg"
  const [imgSrc, setImgSrc] = useState(imgUrl);

  return (
    <Image src={imgSrc} alt={imgAlt} fill={true} className='absolute object-cover object-center' onError={() => setImgSrc(fallbackImgUrl)}/>
  )
}

export default PractitionerImageFallback