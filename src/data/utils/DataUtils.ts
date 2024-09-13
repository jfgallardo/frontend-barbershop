export default class DataUtils {
  static hoje() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return hoje;
  }

  // new Date(), '09:45'
  static aplicarHorario(data: Date, horario: string): Date {
    const novaData = new Date(data);
    const partes = horario.split(":");
    novaData.setHours(parseInt(partes[0]!), parseInt(partes[1]!));
    return novaData;
  }

  static formatarData(data: Date): string {
    return data.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  static formatarDataEHora(data: Date): string {
    const day = data.getUTCDate().toString().padStart(2, "0");
    const month = (data.getUTCMonth() + 1).toString().padStart(2, "0"); // Los meses van de 0 a 11
    const year = data.getUTCFullYear();
    const hours = data.getUTCHours().toString().padStart(2, "0");
    const minutes = data.getUTCMinutes().toString().padStart(2, "0");
    const seconds = data.getUTCSeconds().toString().padStart(2, "0");

    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  }
}
