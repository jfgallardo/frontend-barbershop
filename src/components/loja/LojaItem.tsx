"use client";

export interface LojaItemProps {
  imagemURL: string;
}

export function LojaItem(props: LojaItemProps) {
  return (
    <div className="max-w-xs w-full group/card">
      <div
        className="cursor-pointer overflow-hidden relative card h-80 rounded-md shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-end items-start p-2 bg-cover"
        style={{
          backgroundImage: props.imagemURL ? `url(${props.imagemURL})` : "none",
        }}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>

        <div className="text text-center content bg-black bg-opacity-80 p-1 rounded-full w-14 h-14 flex items-center justify-center">
          <h1 className="font-bold text-lg font-serif text-gray-50 relative z-10">R$25</h1>
        </div>
      </div>
    </div>
  );
}
