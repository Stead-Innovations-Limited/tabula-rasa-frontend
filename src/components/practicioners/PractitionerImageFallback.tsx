"use client";
import { useState } from "react";
import Image from "next/image";

function PractitionerImageFallback({imgUrl, imgAlt, className}: {imgUrl: string, imgAlt: string, className?: string}) {
  const fallbackImgUrl = "/avatar.jpg"
  const [imgSrc, setImgSrc] = useState(imgUrl.trim() && !imgUrl.includes("example.com") ? imgUrl : fallbackImgUrl);

  return (
    <Image src={imgSrc} alt={imgAlt} fill={true} className={`absolute object-cover object-center ${className}`} onError={() => setImgSrc(fallbackImgUrl)}/>
  )
}

export default PractitionerImageFallback