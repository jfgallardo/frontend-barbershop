import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Advertisement() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: "url(/banners/salao.png)" }}
    >
      <div className="md:flex md:items-center md:justify-between ">
        <div className="pl-10 ml-10">
          <div
            className="flex flex-col"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1500"
            data-aos-offset="300"
          >
            <span className="text-[50px] md:text-[82.3px] SFMono-Regular font-bold">
              Barbershop
            </span>
          </div>

          <div className="flex flex-col">
            <span
              className="text-[45px] md:text-[103px] text-[#FF6607] font-serif font-bold"
              data-aos="fade-right"
              data-aos-duration="1500"
              data-aos-offset="300"
            >
              Grande Inauguração
            </span>
            <span
              className="text-[20px] md:text-[60px] font-serif pb-5"
              data-aos="zoom-in"
              data-aos-duration="1500"
            >
              14 de Setembro
            </span>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <Image
            src="/advertisement/samuel.png"
            width={500}
            height={500}
            alt="Barbearia"
            className="object-cover"
            data-aos="zoom-in-left"
            data-aos-duration="1500"
            data-aos-offset="300"
          />
        </div>
      </div>
    </div>
  );
}
