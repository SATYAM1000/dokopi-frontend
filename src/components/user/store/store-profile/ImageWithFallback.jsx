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
      onError={() => {
        setImgSrc(
          fallbackSrc ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4HtE_O8tvs-TlF27vWMWHjxoCQ7HmFmZHBkZpKt1n4PFIN-aN&usqp=CAU"
        );
      }}
      
    />
  );
};

export default ImageWithFallback;
