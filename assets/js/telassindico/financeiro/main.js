// ==========================================================
// mainFinanceiro.js
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  let lancamentosTbodyListener = null;

  // ======== Carregar Cadastro ========
  async function carregarCadastro(lancamento = null) {
    content.innerHTML = telasFinanceiro["Cadastro de lançamentos"];
    const form = content.querySelector(".form-cadastro-lancamento");
    if (!form) return;

    if (lancamento) {
      form.descricao.value = lancamento.description || "";
      form.valor.value = lancamento.value || "";
      form.dataset.id = lancamento.id;
    } else {
      form.reset();
      form.removeAttribute("data-id");
    }
  }

  // ======== Carregar Histórico ========
  async function carregarHistorico() {
    content.innerHTML = telasFinanceiro["Histórico de lançamentos"];
    const tbody = content.querySelector("#tabelaLancamentosBody");
    const loading = content.querySelector("#loadingHistoricoFinanceiro");
    loading.style.display = "block";

    const lancamentos = await listarLancamentos();

    tbody.innerHTML = lancamentos.length
      ? lancamentos.map(l => `
          <tr>
            <td>${l.description || "-"}</td>
            <td>${l.value?.toFixed(2) || "-"}</td>
            <td>${l.document ? `<a href="${l.document}" target="_blank">Arquivo</a>` : "-"}</td>
            <td>
              <button class="btn-editar-lancamento" data-id="${l.id}">Editar</button>
              <button class="btn-excluir-lancamento" data-id="${l.id}">Excluir</button>
            </td>
          </tr>
        `).join("")
      : `<tr><td colspan="4">Nenhum lançamento encontrado.</td></tr>`;

    attachLancamentosTableListener();
    loading.style.display = "none";
  }

  // ======== Eventos Tabela ========
  function attachLancamentosTableListener() {
    const tbody = content.querySelector("#tabelaLancamentosBody");
    if (!tbody) return;

    if (lancamentosTbodyListener) {
      try { tbody.removeEventListener("click", lancamentosTbodyListener); } catch {}
      lancamentosTbodyListener = null;
    }

    lancamentosTbodyListener = async function(e) {
      const btnEditar = e.target.closest(".btn-editar-lancamento");
      const btnExcluir = e.target.closest(".btn-excluir-lancamento");

      if (btnEditar) {
        e.stopPropagation();
        const id = btnEditar.dataset.id;
        const lancamentos = await listarLancamentos();
        const lancamento = lancamentos.find(l => l.id == id);
        if (lancamento) carregarCadastro(lancamento);
        return;
      }

      if (btnExcluir) {
        e.stopPropagation();
        const id = btnExcluir.dataset.id;
        if (confirm("Deseja excluir este lançamento?")) {
          await deletarLancamento(id);
          await carregarHistorico();
        }
      }
    };

    tbody.addEventListener("click", lancamentosTbodyListener);
  }

  // ======== Envio Formulário ========
  content.addEventListener("submit", async (e) => {
    if (!e.target.classList.contains("form-cadastro-lancamento")) return;
    e.preventDefault();

    const form = e.target;
    const arquivo = form.documento.files[0] || null;

    const formData = new FormData();
    formData.append("description", form.descricao.value.trim());
    formData.append("value", form.valor.value.trim());
    if (arquivo) formData.append("document", arquivo);
    const condominioCode = JSON.parse(localStorage.getItem("condominioSelecionado"))?.code_condominium;
    formData.append("condominium_code", condominioCode);

    try {
      if (form.dataset.id) {
        await atualizarLancamento(form.dataset.id, formData);
      } else {
        await criarLancamento(formData);
      }

      await carregarHistorico();
    } catch (err) {
      console.error("Erro ao salvar lançamento:", err);
      alert("Não foi possível salvar o lançamento. Verifique os dados e tente novamente.");
    }
  });

  // ======== Navegação Menu ========
  const menu = document.querySelector("#menuFinanceiro");
  if (menu) {
    menu.addEventListener("click", (e) => {
      if (!e.target.classList.contains("subitem")) return;
      const item = e.target.textContent.trim();

      if (item === "Cadastro de lançamentos") carregarCadastro();
      if (item === "Histórico de lançamentos") carregarHistorico();
    });
  }
});
