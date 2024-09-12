export default class AgendaUtils {
  static horariosDoDia() {
    return {
      manha: this.gerarHorarios([9, 10, 11, 12]),
      tarde: this.gerarHorarios([13, 14, 15, 16, 17, 18, 19]),
      noite: this.gerarHorarios([18, 19, 20, 21, 22]),
    };
  }

  static duracaoTotal(servicos: { qtdeSlots: number }[]) {
    const duracao = servicos.reduce((acc, atual) => {
      return (acc += atual.qtdeSlots * 45);
    }, 0);

    return `${Math.trunc(duracao / 60)}h ${duracao % 60}m`;
  }

  private static gerarHorarios(horas: number[]) {
    let horarioAtual = horas[0];
    let minutos = horarioAtual === 18 ? 15 : 0;

    return horas.reduce((horarios, _, index) => {
      if (index > 0 && horarios.length > 0) {
        minutos += 45;
        if (minutos >= 60) {
          horarioAtual++;
          minutos %= 60;
        }
      }

      const horaFormatada = String(horarioAtual).padStart(2, "0");
      const minutosFormatados = String(minutos).padStart(2, "0");
      horarios.push(`${horaFormatada}:${minutosFormatados}`);

      return horarios;
    }, [] as string[]);
  }

  static validateServiceSelection(selectedServices: number[]): boolean {
    const selectedSet = new Set(selectedServices);

    const comboServices: { [comboId: number]: number[] } = {
      5: [2],
      6: [1, 2],
      7: [1, 2, 3],
    };
    for (const [comboId, serviceIds] of Object.entries(comboServices)) {
      const comboIdNum = parseInt(comboId);

      if (selectedSet.has(comboIdNum)) {
        for (const serviceId of serviceIds) {
          if (selectedSet.has(serviceId)) {
            return false;
          }
        }
      }
    }

    return true;
  }
}
2;
