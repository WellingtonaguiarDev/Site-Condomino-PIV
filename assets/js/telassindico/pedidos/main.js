// ------------------------
// mainEntregas.js (corrigido)
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  let entregasTbodyListener = null;

  async function carregarCadastro(entrega = null) {
    content.innerHTML = telasEntregas["Cadastro de entregas"];

    if (entrega) {
      const form = content.querySelector(".form-cadastro-entrega");
      if (!form) return;
      form.codigo.value = entrega.order_code || "";
      form.bloco.value = entrega.apartment_block || "";
      form.apartamento.value = entrega.apartment_number || "";
      form.dataset.id = entrega.id;
    } else {
      // garante que form sem id esteja com dataset vazio
      const form = content.querySelector(".form-cadastro-entrega");
      if (form) form.removeAttribute("data-id");
    }
  }

  async function carregarHistorico() {
    content.innerHTML = telasEntregas["Histórico de entregas"];
    const tbody = content.querySelector("#tabelaEntregasBody");
    if (!tbody) return;

    const entregas = await listarEntregas();
    console.log("DEBUG: dados retornados do backend:", entregas);

    tbody.innerHTML = entregas
      .map((e) => {
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

    // (re)associa listener estritamente ao tbody desta tabela
    attachEntregasTableListener();
  }

  // listener local do tbody: evita conflitos com outros módulos
  function attachEntregasTableListener() {
    const tbody = content.querySelector("#tabelaEntregasBody");
    if (!tbody) return;

    // remove listener antigo se existir
    if (entregasTbodyListener) {
      try { tbody.removeEventListener("click", entregasTbodyListener); } catch (err) {}
      entregasTbodyListener = null;
    }

    entregasTbodyListener = async function (e) {
      // pega botão excluir mais próximo
      const btnExcluir = e.target.closest(".btn-excluir");
      if (btnExcluir && tbody.contains(btnExcluir)) {
        e.stopPropagation();
        const id = btnExcluir.dataset.id;
        if (!id) return;
        if (confirm("Deseja excluir esta entrega?")) {
          try {
            await deletarEntrega(id);
          } catch (err) {
            console.error(err);
          } finally {
            await carregarHistorico();
          }
        }
        return;
      }

      // se tiver futuros botões (editar), tratar aqui...
    };

    tbody.addEventListener("click", entregasTbodyListener);
  }

  // --- Submissão do formulário (isolado no content) ---
  content.addEventListener("submit", async (e) => {
    if (!e.target.classList.contains("form-cadastro-entrega")) return;
    e.preventDefault();

    const form = e.target;
    const file = form.assinatura?.files?.[0] || null;

    const dados = {
      codigo: form.codigo?.value.trim() || "",
      bloco: form.bloco?.value.trim() || "",
      apartamento: form.apartamento?.value.trim() || "",
      assinatura: file
    };

    try {
      if (form.dataset.id) {
        // edição não implementada no backend por agora — apenas log
        // se você tiver endpoint de update, chame aqui (PUT)
        console.log("Editar entrega ID:", form.dataset.id, dados);
        // opcional: implementar atualizarEntrega(form.dataset.id, dados)
      } else {
        await criarEntrega(dados);
      }
    } catch (err) {
      console.error(err);
    } finally {
      await carregarHistorico();
    }
  });

  // --- Navegação pelo menu (isolada) ---
  const menu = document.querySelector(".menu-scroll");
  if (menu) {
    menu.addEventListener("click", (e) => {
      if (!e.target.classList.contains("subitem")) return;
      const item = e.target.textContent.trim();
      if (item === "Cadastro de entregas") carregarCadastro();
      if (item === "Histórico de entregas") carregarHistorico();
    });
  }
});
