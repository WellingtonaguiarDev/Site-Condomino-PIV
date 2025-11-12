// ==========================================================
// mainReservas.js
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  let reservasTbodyListener = null;

  // ======== Tela de Cadastro ========
  async function carregarCadastro(reserva = null) {
    content.innerHTML = telasReservas["Cadastro de reservas"];
    const form = content.querySelector(".form-cadastro-reserva");
    if (!form) return;

    if (reserva) {
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
    } else {
      form.reset();
      form.removeAttribute("data-id");
    }
  }

  // ======== Tela de Histórico ========
  async function carregarHistorico() {
    content.innerHTML = telasReservas["Histórico de reservas"];
    const tbody = content.querySelector("#tabelaReservasBody");
    if (!tbody) return;

    const reservas = await listarReservas();

    tbody.innerHTML = reservas.map((r) => {
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
            <button class="btn-editar-reserva" data-id="${r.id}">Editar</button>
            <button class="btn-excluir-reserva" data-id="${r.id}">Excluir</button>
          </td>
        </tr>
      `;
    }).join("");

    attachReservasTableListener();
  }

  // ======== Eventos da Tabela ========
  function attachReservasTableListener() {
    const tbody = content.querySelector("#tabelaReservasBody");
    if (!tbody) return;

    if (reservasTbodyListener) {
      try { tbody.removeEventListener("click", reservasTbodyListener); } catch {}
      reservasTbodyListener = null;
    }

    reservasTbodyListener = async function (e) {
      const btnEditar = e.target.closest(".btn-editar-reserva");
      const btnExcluir = e.target.closest(".btn-excluir-reserva");

      if (btnEditar) {
        e.stopPropagation();
        const id = btnEditar.dataset.id;
        const reservas = await listarReservas();
        const reserva = reservas.find((r) => r.id == id);
        if (reserva) carregarCadastro(reserva);
        return;
      }

      if (btnExcluir) {
        e.stopPropagation();
        const id = btnExcluir.dataset.id;
        if (confirm("Deseja excluir esta reserva?")) {
          try {
            await deletarReserva(id);
            await carregarHistorico();
          } catch (err) {
            console.error(err);
            alert("Erro ao excluir reserva. Verifique e tente novamente.");
          }
        }
        return;
      }
    };

    tbody.addEventListener("click", reservasTbodyListener);
  }

  // ======== Evento de Envio do Formulário ========
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

    try {
      if (form.dataset.id) {
        await atualizarReserva(form.dataset.id, dados);
        alert("Reserva atualizada com sucesso!");
      } else {
        await criarReserva(dados);
        alert("Reserva cadastrada com sucesso!");
      }

      // 🔹 só muda para histórico se não houver erro
      await carregarHistorico();

    } catch (err) {
      console.error("Erro ao salvar reserva:", err);
      alert("Não foi possível salvar a reserva. Verifique e tente novamente.");
      // histórico NÃO é carregado
    }
  });

  // ======== Navegação do Menu ========
  const menu = document.querySelector("#menuReservas");
  if (menu) {
    menu.addEventListener("click", (e) => {
      if (!e.target.classList.contains("subitem")) return;
      const item = e.target.textContent.trim();

      if (item === "Cadastro de reservas") carregarCadastro();
      if (item === "Histórico de reservas") carregarHistorico();
    });
  }
});
