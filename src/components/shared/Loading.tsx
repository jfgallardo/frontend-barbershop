import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full">
      <Image
        src="/loading.svg"
        alt="Cargando"
        width={500}
        height={500}
        className="animate-pulse"
      />
    </div>
  );
}
