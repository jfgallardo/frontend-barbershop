"use client";

import NossosClientes from "@/components/cliente/NossosClientes";
import TituloSlogan from "@/components/landing/TituloSlogan";
import NossaLoja from "@/components/loja/NossaLoja";
import NossosProfissionais from "@/components/profissional/NossosProfissionais";
import NossosServicos from "@/components/servico/NossosServicos";
import Advertisement from "@/components/shared/Advertisement";
import ContainerComBackground from "@/components/shared/ContainerComBackground";
import TattoStudio from "@/components/tatuagem/TattoStudio";

export default function Landing() {
  return (
    <div>
      <TituloSlogan />
      <Advertisement />

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
