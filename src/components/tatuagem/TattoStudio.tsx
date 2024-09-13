import { tatuagens } from "@/data";
import { LayoutGrid } from "../ui/layout-grid";
import Titulo from "@/components/shared/Titulo";

export default function TattoStudio() {
  const classes = [
    "md:col-span-1 md:row-span-2",
    "col-span-1",
    "col-span-1",
    "col-span-1",
    "col-span-1",
    "md:col-span-2 md:row-span-2",
    "md:col-span-1 md:row-span-2",
  ];
  const cards = tatuagens.map((tatuagen, i) => {
    return {
      id: tatuagen.id,
      content: "",
      className: classes[i],
      thumbnail: tatuagen.imagemURL,
    };
  });

  return (
    <div className="container flex flex-col items-center gap-16">
      <Titulo
        principal="Tattoo Studio"
        secundario="Em breve, nosso especialista em tatuagem estará disponível para criar artes personalizadas e únicas. Fique de olho nas novidades!"
      />
      <div className="h-[1350px] w-full">
        <LayoutGrid cards={cards} />
      </div>
    </div>
  );
}
