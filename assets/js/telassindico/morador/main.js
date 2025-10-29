// ------------------------
// main.js (versão final corrigida)
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");

  // --- Renderização de telas ---
  async function carregarCadastro(morador = null) {
    content.innerHTML = telasMoradores["Cadastro de moradores"];

    if (morador) {
      const form = content.querySelector(".form-cadastro");
      form.nome.value = morador.name || "";
      form.cpf.value = morador.cpf || "";
      form.telefone.value = morador.phone || "";

      // Pega bloco e número do local correto
      form.bloco.value =
        morador.registered_by?.apartment?.block ||
        morador.apartment_details?.block ||
        "";
      form.apartamento.value =
        morador.registered_by?.apartment?.number ||
        morador.apartment_details?.number ||
        "";

      form.dataset.id = morador.id;
    }
  }

  async function carregarHistorico() {
    content.innerHTML = telasMoradores["Histórico de moradores"];
    const tbody = content.querySelector("#tabelaMoradoresBody");
    const moradores = await listarMoradores();

    // Monta tabela com os campos corretos
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
  }

  // --- Eventos globais de formulário e botões ---
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

    if (form.dataset.id) {
      await atualizarMorador(form.dataset.id, dados);
    } else {
      await criarMorador(dados);
    }

    carregarHistorico();
  });

  // --- Ações de editar/excluir ---
  content.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-editar")) {
      const id = e.target.dataset.id;
      const moradores = await listarMoradores();
      const morador = moradores.find((m) => m.id == id);
      if (morador) carregarCadastro(morador);
    }

    if (e.target.classList.contains("btn-excluir")) {
      const id = e.target.dataset.id;
      if (confirm("Deseja excluir este morador?")) {
        await deletarMorador(id);
        carregarHistorico();
      }
    }
  });

  // --- Navegação pelo menu ---
  document.querySelector(".menu-scroll").addEventListener("click", (e) => {
    if (!e.target.classList.contains("subitem")) return;

    const item = e.target.textContent.trim();

    if (item === "Cadastro de moradores") carregarCadastro();
    if (item === "Histórico de moradores") carregarHistorico();
  });
});
