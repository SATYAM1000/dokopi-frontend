import React, { useState } from "react";
import Image from "next/image";

const ImageWithFallback = (props) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      priority
      placeholder="blur"
      blurDataURL="/test/blur.jpeg"
      onError={() => {
        setImgSrc(
          fallbackSrc ||
            "https://placehold.co/600x400/000000/FFFFFF.png?text=No+Image"
        );
      }}
    />
  );
};

export default ImageWithFallback;
