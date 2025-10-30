// ------------------------
// mainEntregas.js
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");

  // --- Renderização de telas ---
  async function carregarCadastro(entrega = null) {
    content.innerHTML = telasEntregas["Cadastro de entregas"];

    if (entrega) {
      const form = content.querySelector(".form-cadastro-entrega");
      form.codigo.value = entrega.order_code || "";
      form.bloco.value = entrega.apartment_block || "";
      form.apartamento.value = entrega.apartment_number || "";
      form.dataset.id = entrega.id; // para futura edição
    }
  }

  async function carregarHistorico() {
    content.innerHTML = telasEntregas["Histórico de entregas"];
    const tbody = content.querySelector("#tabelaEntregasBody");

    const entregas = await listarEntregas();

    // DEBUG: mostrar JSON completo no console
    console.log("DEBUG: dados retornados do backend:", entregas);

    tbody.innerHTML = entregas
      .map((e) => {
        // Extrair bloco e número do apartamento de owner.apartamento
        const bloco = e.owner?.apartment?.block ?? "-";
        const apartamento = e.owner?.apartment?.number ?? "-";

        return `
          <tr>
            <td>${e.order_code || "-"}</td>
            <td>${e.status || "-"}</td>
            <td>${bloco}</td>
            <td>${apartamento}</td>
            <td>
              <button class="btn-excluir" data-id="${e.id}">Excluir</button>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  // --- Eventos de formulário ---
  content.addEventListener("submit", async (e) => {
    if (!e.target.classList.contains("form-cadastro-entrega")) return;
    e.preventDefault();

    const form = e.target;
    const file = form.assinatura.files[0];

    const dados = {
      codigo: form.codigo?.value.trim() || "",
      bloco: form.bloco?.value.trim() || "",
      apartamento: form.apartamento?.value.trim() || "",
      assinatura: file || null
    };

    if (form.dataset.id) {
      console.log("Editar entrega ID:", form.dataset.id, dados);
      // Futuramente implementar edição
    } else {
      await criarEntrega(dados);
    }

    carregarHistorico();
  });

  // --- Ações de exclusão ---
  content.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-excluir")) {
      const id = e.target.dataset.id;
      if (confirm("Deseja excluir esta entrega?")) {
        await deletarEntrega(id);
        carregarHistorico();
      }
    }
  });

  // --- Navegação pelo menu ---
  document.querySelector(".menu-scroll").addEventListener("click", (e) => {
    if (!e.target.classList.contains("subitem")) return;

    const item = e.target.textContent.trim();
    if (item === "Cadastro de entregas") carregarCadastro();
    if (item === "Histórico de entregas") carregarHistorico();
  });
});
