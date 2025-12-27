import Image from "next/image";
import React, { FC } from "react";

const MyPhotosPage: FC = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-1">
        <Image
          src="/images/img-1.jpg"
          width={500}
          height={500}
          unoptimized
          alt="photo-1"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default MyPhotosPage;
