// ------------------------
// mainMoradores.js (corrigido e isolado)
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  let moradoresTbodyListener = null;

  // --- Renderização de telas ---
  async function carregarCadastro(morador = null) {
    content.innerHTML = telasMoradores["Cadastro de moradores"];

    if (morador) {
      const form = content.querySelector(".form-cadastro");
      if (!form) return;

      form.nome.value = morador.name || "";
      form.cpf.value = morador.cpf || "";
      form.telefone.value = morador.phone || "";
      form.bloco.value =
        morador.registered_by?.apartment?.block ||
        morador.apartment_details?.block ||
        "";
      form.apartamento.value =
        morador.registered_by?.apartment?.number ||
        morador.apartment_details?.number ||
        "";
      form.dataset.id = morador.id;
    } else {
      const form = content.querySelector(".form-cadastro");
      if (form) form.removeAttribute("data-id");
    }
  }

  async function carregarHistorico() {
    content.innerHTML = telasMoradores["Histórico de moradores"];
    const tbody = content.querySelector("#tabelaMoradoresBody");
    if (!tbody) return;

    const moradores = await listarMoradores();

    tbody.innerHTML = moradores
      .map(
        (m) => `
        <tr>
          <td>${m.name || "-"}</td>
          <td>${m.registered_by?.apartment?.block || "-"}</td>
          <td>${m.registered_by?.apartment?.number || "-"}</td>
          <td>${m.phone || "-"}</td>
          <td>
            <button class="btn-editar" data-id="${m.id}">Editar</button>
            <button class="btn-excluir" data-id="${m.id}">Excluir</button>
          </td>
        </tr>
      `
      )
      .join("");

    attachMoradoresTableListener();
  }

  // Listener isolado do tbody
  function attachMoradoresTableListener() {
    const tbody = content.querySelector("#tabelaMoradoresBody");
    if (!tbody) return;

    // Remove o antigo, se existir
    if (moradoresTbodyListener) {
      try { tbody.removeEventListener("click", moradoresTbodyListener); } catch {}
      moradoresTbodyListener = null;
    }

    moradoresTbodyListener = async function (e) {
      const btnEditar = e.target.closest(".btn-editar");
      const btnExcluir = e.target.closest(".btn-excluir");

      if (btnEditar && tbody.contains(btnEditar)) {
        e.stopPropagation();
        const id = btnEditar.dataset.id;
        const moradores = await listarMoradores();
        const morador = moradores.find((m) => m.id == id);
        if (morador) carregarCadastro(morador);
        return;
      }

      if (btnExcluir && tbody.contains(btnExcluir)) {
        e.stopPropagation();
        const id = btnExcluir.dataset.id;
        if (confirm("Deseja excluir este morador?")) {
          await deletarMorador(id);
          await carregarHistorico();
        }
        return;
      }
    };

    tbody.addEventListener("click", moradoresTbodyListener);
  }

  // --- Evento de envio de formulário ---
  content.addEventListener("submit", async (e) => {
    if (!e.target.classList.contains("form-cadastro")) return;
    e.preventDefault();

    const form = e.target;
    const dados = {
      nome: form.nome.value.trim(),
      cpf: form.cpf.value.trim(),
      telefone: form.telefone.value.trim(),
      bloco: form.bloco.value.trim(),
      apartamento: form.apartamento.value.trim(),
    };

    try {
      if (form.dataset.id) {
        await atualizarMorador(form.dataset.id, dados);
      } else {
        await criarMorador(dados);
      }
    } catch (err) {
      console.error(err);
    } finally {
      await carregarHistorico();
    }
  });

  // --- Navegação pelo menu ---
  const menu = document.querySelector(".menu-scroll");
  if (menu) {
    menu.addEventListener("click", (e) => {
      if (!e.target.classList.contains("subitem")) return;
      const item = e.target.textContent.trim();

      if (item === "Cadastro de moradores") carregarCadastro();
      if (item === "Histórico de moradores") carregarHistorico();
    });
  }
});
