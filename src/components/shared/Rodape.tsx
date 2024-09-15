import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandYoutube,
} from "@tabler/icons-react";
import Logo from "./Logo";

export default function Rodape() {
  function open(socialNetworks: number) {
    switch (socialNetworks) {
      case 1:
        window.open(
          "https://www.instagram.com/barbershop_samuelfrancisco?igsh=dzN2MXJhc25sbXFt",
          "_blank"
        );
        break;
      case 2:
        const facebookUrl =
          "https://www.facebook.com/profile.php?id=100040604258180&mibextid=ZbWKwL";
        window.open(facebookUrl, "_blank");
        break;
      default:
        const whatsappUrl = "https://wa.me/5562996132360";
        window.open(whatsappUrl, "_blank");
    }
  }

  return (
    <footer className="flex items-center bg-black">
      <div className="container flex flex-col gap-7 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-5">
          <Logo />

          <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="text-2xl text-zinc-300 font-bold mb-2.5">
              Contato
            </span>
            <a
              href="mailto:samuelfrancisco55321@gmail.com"
              className="text-sm text-zinc-400 hover:underline"
            >
              samuelfrancisco55321@gmail.com
            </a>
            <div
              className="flex items-center gap-2 text-sm text-zinc-400 hover:cursor-pointer"
              onClick={() => open(3)}
            >
              <IconBrandWhatsapp size={20} className="text-green-500" />
              <span>Whatsapp</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex gap-2 text-zinc-400">
            <IconBrandInstagram
              size={28}
              stroke={1}
              className="hover:cursor-pointer"
              onClick={() => open(1)}
            />
            <IconBrandFacebook
              size={28}
              stroke={1}
              className="hover:cursor-pointer"
              onClick={() => open(2)}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-1.5 text-zinc-400 text-sm">
            <div className="flex gap-1.5">
              <span>{new Date().getFullYear()}</span>
            </div>
            <span className="hidden md:inline-block">-</span>
            <span>Direitos reservados - BARBER SHOP SAMUEL FRANCISCO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
