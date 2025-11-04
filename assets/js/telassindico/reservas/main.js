// ------------------------
// mainReservas.js
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");

  // --- Renderização de telas ---
  async function carregarCadastro(reserva = null) {
    content.innerHTML = telasReservas["Cadastro de reservas"];

    if (reserva) {
      const form = content.querySelector(".form-cadastro-reserva");
      form.space.value = reserva.space || "";
      form.data_reserva.value = reserva.start_time
        ? new Date(reserva.start_time).toISOString().split("T")[0]
        : "";
      form.hora_inicio.value = reserva.start_time
        ? new Date(reserva.start_time).toISOString().substring(11, 16)
        : "";
      form.hora_fim.value = reserva.end_time
        ? new Date(reserva.end_time).toISOString().substring(11, 16)
        : "";

      form.apartment_block.value = reserva.apartment_block || "-";
      form.apartment_code.value = reserva.apartment_code || "-";

      form.dataset.id = reserva.id;
    }
  }

  async function carregarHistorico() {
    content.innerHTML = telasReservas["Histórico de reservas"];
    const tbody = content.querySelector("#tabelaReservasBody");
    const reservas = await listarReservas();

    tbody.innerHTML = reservas
      .map((r) => {
        const espaco = r.space || "-";
        const dataInicio = new Date(r.start_time).toLocaleString("pt-BR");
        const dataFim = new Date(r.end_time).toLocaleString("pt-BR");

        const bloco = r.resident?.apartment?.block || "-";
        const apartamento = r.resident?.apartment?.number || "-";

        return `
          <tr>
            <td>${espaco}</td>
            <td>${bloco}</td>
            <td>${apartamento}</td>
            <td>${dataInicio}</td>
            <td>${dataFim}</td>
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
    if (!e.target.classList.contains("form-cadastro-reserva")) return;
    e.preventDefault();

    const form = e.target;
    const dados = {
      space: form.space.value.trim(),
      apartment_block: form.apartment_block.value.trim(),
      apartment_code: form.apartment_code.value.trim(),
      data: form.data_reserva.value,
      horaInicio: form.hora_inicio.value,
      horaFim: form.hora_fim.value,
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

  // --- Navegação pelo menu (isolada) ---
  const menuReservas = document.querySelector("#menuReservas");
  if (menuReservas) {
    menuReservas.addEventListener("click", (e) => {
      if (!e.target.classList.contains("subitem")) return;

      const item = e.target.textContent.trim();
      if (item === "Cadastro de reservas") carregarCadastro();
      if (item === "Histórico de reservas") carregarHistorico();
    });
  }
});
