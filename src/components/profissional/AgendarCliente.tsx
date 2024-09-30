import useUsuario from "@/data/hooks/useUsuario";
import { DatePickerComponent } from "../shared/DatePicker";
import DialogComponent from "../shared/Dialog";
import SelectComponent from "../shared/Select";
import useAPI from "@/data/hooks/useAPI";
import { useCallback, useEffect, useState } from "react";
import { AgendaUtils, DataUtils, Profissional, Servico, Usuario } from "@/data";
import useAgendamento from "@/data/hooks/useAgendamento";
import Loading from "../shared/Loading";
import { notifySuccess, notifyWarning } from "../shared/Notify";

export interface ItemSelectProps {
  value: string;
  label: string;
}

export default function AgendarCliente() {
  const { usuario } = useUsuario();
  const { httpGet } = useAPI();
  const [usuarios, setUsuarios] = useState([]);
  const [horarios, setHorarios] = useState<ItemSelectProps[] | null>();
  const [usuarioSelected, setUsuarioSelected] = useState<string | null>("");
  const [horarioSelected, setHorarioSelected] = useState<string | null>("");
  const [servicoSelected, setServicoSelected] = useState<string | null>("");
  const [dateSelected, setDateSelected] = useState<Date | null>();
  const [servicosLista, setServicosLista] = useState<
    ItemSelectProps[] | null
  >();
  const [flagServicos, setFlagServicos] = useState<Servico[] | null>();
  const [flagUsuarios, setFlagUsuarios] = useState<Usuario[] | null>();
  const [profissionai, setProfissionai] = useState<Profissional | null>();
  const [loadingSave, setLoadingSave] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    horariosOcupados,
    selecionarProfissional,
    selecionarData,
    selecionarServicos,
    agendar,
    servicos,
  } = useAgendamento();
  const { manha, tarde, noite } = AgendaUtils.horariosDoDia();

  const carregarProfissionai = useCallback(async () => {
    const response = await httpGet(`profissionai/${usuario?.id}`);
    setProfissionai(response[0]);
  }, [httpGet, usuario?.id]);

  const carregarServicos = useCallback(async () => {
    const idProfissional = usuario?.id;
    const data = await httpGet(`servico/por-profesional/${idProfissional}`);
    setFlagServicos(data);
    const servicos = data.map((item: Servico) => ({
      value: item.id,
      label: item.nome,
    }));
    setServicosLista(servicos);
  }, [httpGet, usuario?.id]);

  const getUsers = useCallback(async () => {
    try {
      const data = await httpGet("usuario");
      setFlagUsuarios(data);
      const usuarios = data
        .map((item: Usuario) => ({
          value: item.id,
          label: item.nome,
        }))
        .sort((a: ItemSelectProps, b: ItemSelectProps) =>
          a.label.localeCompare(b.label)
        );

      setUsuarios(usuarios);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  }, [httpGet]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    carregarProfissionai();
  }, [carregarProfissionai]);

  useEffect(() => {
    carregarServicos();
  }, [carregarServicos]);

  const handleSelectHorario = (value: string | null) => {
    setHorarioSelected(value);
    selecionarData(DataUtils.aplicarHorario(dateSelected!, value!));
  };

  const handleSelectCliente = (value: string | null) => {
    setUsuarioSelected(value);
  };

  const handleSelectServiços = (value: string | null) => {
    const serv: Servico | undefined = flagServicos?.find(
      (item) => +item.id === +value!
    );
    setServicoSelected(value);
    selecionarServicos([serv!]);
  };

  const handleSelectDate = (value: Date | null) => {
    setDateSelected(value);
    selecionarProfissional(profissionai!);
    selecionarData(value!);
  };

  async function finalizarAgendamento() {
    if (
      !usuarioSelected ||
      !servicos.length ||
      !dateSelected ||
      !horarioSelected
    ) {
      notifyWarning("Dados ausentes");
      return;
    }
    setLoadingSave(true);
    const user: Usuario | undefined = flagUsuarios!.find(
      (item) => +item.id! === +usuarioSelected!
    );
    await agendar(user);
    setLoadingSave(false);
    notifySuccess("Usuário agendado corretamente.");
    setOpen(false);
    clear();
  }

  function clear() {
    setUsuarioSelected(null);
    setHorarioSelected(null);
    setDateSelected(null);
    setServicoSelected(null);
  }

  useEffect(() => {
    const horariosBD = [...manha, ...tarde, ...noite];
    const horariosSinRepetir = horariosBD.filter(
      (hora) => !horariosOcupados.includes(hora)
    );

    const isSabado = dateSelected?.getDay() === 6;
    const horarios = horariosSinRepetir
      .map((item: string) => ({
        value: item,
        label: item,
      }))
      .filter((h: ItemSelectProps) => {
        if (h.value > "17:00" && isSabado) {
          return;
        }
        return h;
      });

    setHorarios(horarios);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [horariosOcupados]);

  function footer() {
    return loadingSave ? (
      <Loading text="Agendando..." />
    ) : (
      <button
        onClick={finalizarAgendamento}
        className="bg-blue-500 hover:bg-blue-700 px-3 py-2"
      >
        Agendar
      </button>
    );
  }
  return (
    <DialogComponent
      button="Agendar cliente"
      title="Agendar cliente"
      footerContent={footer()}
      open={open}
      onOpenChange={setOpen}
    >
      <div className="flex flex-col items-center space-y-5">
        <SelectComponent
          placeholder="Clientes"
          onSelect={handleSelectCliente}
          items={usuarios}
        />
        <SelectComponent
          placeholder="Serviços"
          onSelect={handleSelectServiços}
          items={servicosLista!}
        />
        <DatePickerComponent onSelect={handleSelectDate} />
        <SelectComponent
          placeholder="Horarios"
          onSelect={handleSelectHorario}
          items={horarios!}
        />
      </div>
    </DialogComponent>
  );
}
