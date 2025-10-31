// ------------------------
// mainReservas.js
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");

  // --- Renderização de telas ---
  async function carregarCadastro(reserva = null) {
    content.innerHTML = telasReservas["Cadastro de reservas"];

    if (reserva) {
      const form = content.querySelector(".form-cadastro");
      form.local.value = reserva.local_name || "";
      form.data.value = reserva.start_time
        ? new Date(reserva.start_time).toISOString().split("T")[0]
        : "";
      form.horaInicio.value = reserva.start_time
        ? new Date(reserva.start_time).toISOString().substring(11, 16)
        : "";
      form.horaFim.value = reserva.end_time
        ? new Date(reserva.end_time).toISOString().substring(11, 16)
        : "";

      const bloco = reserva.owner?.apartment?.block || "-";
      const apartamento = reserva.owner?.apartment?.number || "-";
      form.bloco.value = bloco;
      form.apartamento.value = apartamento;

      form.dataset.id = reserva.id;
    }
  }

  async function carregarHistorico() {
    content.innerHTML = telasReservas["Histórico de reservas"];
    const tbody = content.querySelector("#tabelaReservasBody");
    const reservas = await listarReservas();

    // 🔍 DEBUG: mostrar as informações retornadas pelo backend
    console.log("======================================");
    console.log("DEBUG - Reservas retornadas do backend:");
    console.log(reservas);
    console.log("======================================");

    // Debug individual de cada reserva (pra ver estrutura detalhada)
    reservas.forEach((r, i) => {
      console.log(`Reserva [${i + 1}] -> ID: ${r.id}`);
      console.log("Local:", r.local_name);
      console.log("Início:", r.start_time);
      console.log("Fim:", r.end_time);
      console.log("Owner:", r.owner);
      console.log("Apartamento:", r.owner?.apartment);
      console.log("--------------------------------------");
    });

    tbody.innerHTML = reservas
      .map((r) => {
        const local = r.local_name || "-";
        const dataInicio = new Date(r.start_time).toLocaleString("pt-BR");
        const dataFim = new Date(r.end_time).toLocaleString("pt-BR");

        const bloco = r.owner?.apartment?.block || "-";
        const apartamento = r.owner?.apartment?.number || "-";

        return `
          <tr>
            <td>${local}</td>
            <td>${dataInicio}</td>
            <td>${dataFim}</td>
            <td>${bloco}</td>
            <td>${apartamento}</td>
            <td>
              <button class="btn-editar" data-id="${r.id}">Editar</button>
              <button class="btn-excluir" data-id="${r.id}">Excluir</button>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  // --- Eventos de formulário ---
  content.addEventListener("submit", async (e) => {
    if (!e.target.classList.contains("form-cadastro")) return;
    e.preventDefault();

    const form = e.target;
    const dados = {
      local: form.local.value.trim(),
      data: form.data.value,
      horaInicio: form.horaInicio.value,
      horaFim: form.horaFim.value,
    };

    if (form.dataset.id) {
      await atualizarReserva(form.dataset.id, dados);
    } else {
      await criarReserva(dados);
    }

    carregarHistorico();
  });

  // --- Ações de edição e exclusão ---
  content.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-editar")) {
      const id = e.target.dataset.id;
      const reservas = await listarReservas();
      const reserva = reservas.find((r) => r.id == id);
      if (reserva) carregarCadastro(reserva);
    }

    if (e.target.classList.contains("btn-excluir")) {
      const id = e.target.dataset.id;
      if (confirm("Deseja excluir esta reserva?")) {
        await deletarReserva(id);
        carregarHistorico();
      }
    }
  });

  // --- Navegação pelo menu ---
  document.querySelector("#menuReservas").addEventListener("click", (e) => {
    if (!e.target.classList.contains("subitem")) return;

    const item = e.target.textContent.trim();
    if (item === "Reserva de espaços") carregarCadastro();
    if (item === "Agenda de uso") carregarHistorico();
  });
});
