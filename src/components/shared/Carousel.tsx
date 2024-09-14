import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./CarouselThumb";
import Image from "next/image"; // Importar Image de next/image
import Titulo from "./Titulo";

type PropType = {
  slides: string[]; // Cambiar a un array de objetos con la propiedad 'src'
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="mt-10">
      <Titulo
        principal="Nossa Inauguração"
        secundario="Você fez parte do nosso grande dia! Confira os momentos especiais da inauguração!!"
      />
      <div className="embla">
        <div className="embla__viewport" ref={emblaMainRef}>
          <div className="embla__container">
            {slides.map((slide, index) => (
              <div
                className="embla__slide"
                key={index}
                style={{ height: "300px", overflow: "hidden" }}
              >
                <Image
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  fill={true} 
                  objectFit="cover"
                  quality={100}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="embla-thumbs">
          <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
            <div className="embla-thumbs__container">
              {slides.map((slide, index) => (
                <Thumb
                  key={index}
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  index={index}
                  image={slide}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
