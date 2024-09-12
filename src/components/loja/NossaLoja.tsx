import { produtos } from "@/data";
import Titulo from "../shared/Titulo";
import { LojaItem } from "./LojaItem";

export default function NossaLoja() {
  return (
    <div>
      <Titulo
        principal="Nossa Loja"
        secundario="Os melhores produtos para seu estilo e cuidado, tudo em um só lugar. Aproveite!"
      />
      <div className="flex flex-col items-center md:flex-row md:justify-center gap-5 mt-5">
        {produtos.map((produto) => (
          <LojaItem
            key={produto.id}
            imagemURL={produto.imagemURL}
          />
        ))}
      </div>
    </div>
  );
}
