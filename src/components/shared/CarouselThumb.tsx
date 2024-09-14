import React from "react";
import Image from "next/image";

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  image: string;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, image } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <div className="embla-thumbs__slide__number">
        <Image
          className="hover:cursor-pointer"
          src={image}
          alt={`Imagen ${index + 1}`}
          width={500}
          height={300}
          onClick={onClick}
        />
      </div>
    </div>
  );
};
