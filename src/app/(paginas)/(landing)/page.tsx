"use client";

import NossosClientes from "@/components/cliente/NossosClientes";
import TituloSlogan from "@/components/landing/TituloSlogan";
import NossaLoja from "@/components/loja/NossaLoja";
import NossosProfissionais from "@/components/profissional/NossosProfissionais";
import NossosServicos from "@/components/servico/NossosServicos";
import Advertisement from "@/components/shared/Advertisement";
import EmblaCarousel from "@/components/shared/Carousel";
import ContainerComBackground from "@/components/shared/ContainerComBackground";
import TattoStudio from "@/components/tatuagem/TattoStudio";
import { EmblaOptionsType } from "embla-carousel";

export default function Landing() {
  const OPTIONS: EmblaOptionsType = {};
  const SLIDES = [
    "/apertura/1.jpg",
    "/apertura/2.jpg",
    "/apertura/4.jpg",
    "/apertura/5.jpg",
    "/apertura/6.jpg",
    "/apertura/7.jpg",
    "/apertura/8.jpeg",
    "/apertura/9.jpeg",
    "/apertura/10.jpeg",
    "/apertura/11.jpeg",
    "/apertura/12.jpeg",
    "/apertura/13.jpeg",
    "/apertura/14.jpeg",
    "/apertura/15.jpeg",
    "/apertura/16.jpeg",
    "/apertura/17.jpeg",
    "/apertura/18.jpeg",
    "/apertura/19.jpeg",
    "/apertura/20.jpeg",
    "/apertura/21.jpeg",
    "/apertura/22.jpeg",
    "/apertura/23.jpeg",
    "/apertura/24.jpeg",
    "/apertura/25.jpeg",
    "/apertura/26.jpeg",
    "/apertura/27.jpeg",
    "/apertura/28.jpeg",
    "/apertura/29.jpeg",
    "/apertura/30.jpeg",
    "/apertura/31.jpeg",
    "/apertura/32.jpeg",
    "/apertura/33.jpeg",
    "/apertura/34.jpeg",
    "/apertura/35.jpeg",
    "/apertura/36.jpeg",
  ];

  return (
    <div>
      <TituloSlogan />
      {/* <Advertisement /> */}

      <ContainerComBackground imagem="/banners/clientes.webp">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </ContainerComBackground>

      <ContainerComBackground imagem="/banners/servicos.webp">
        <NossosServicos />
      </ContainerComBackground>

      <ContainerComBackground imagem="/banners/profissionais.webp">
        <NossosProfissionais />
      </ContainerComBackground>
      <ContainerComBackground imagem="/banners/servicos.webp">
        <NossaLoja />
      </ContainerComBackground>

      <ContainerComBackground imagem="/tatuagens/tatuagens-8.jpeg">
        <TattoStudio />
      </ContainerComBackground>

      <ContainerComBackground imagem="/banners/clientes.webp">
        <NossosClientes />
      </ContainerComBackground>
    </div>
  );
}
